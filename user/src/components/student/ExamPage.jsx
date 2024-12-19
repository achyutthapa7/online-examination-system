import React, { useState, useEffect } from "react";
import { getExamQuestion, submitExams } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const ExamPage = () => {
  const navigate = useNavigate();
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [examDetails, setExamDetails] = useState({
    title: "",
    timeLimit: 0,
    questions: [],
  });
  const [timeLeft, setTimeLeft] = useState(examDetails.timeLimit || 7200);
  const examId = window.location.pathname.split("/").pop();

  const fetchExam = async () => {
    try {
      const response = await getExamQuestion(examId);
      const exam = response.data;
      console.log(exam[0].title, exam[0].timeLimit * 60, exam[0].questions);
      console.log(exam);
      setExamDetails({
        title: exam[0].title,
        timeLimit: exam[0].timeLimit * 60,
        questions: exam[0].questions,
      });

      setTimeLeft(exam.timeLimit * 60);
    } catch (error) {
      console.error("Error fetching exam:", error);
      alert("Failed to load exam details");
    }
  };

  useEffect(() => {
    fetchExam();
  }, []);

  // Shuffle questions once when component mounts
  useEffect(() => {
    if (examDetails.questions.length > 0) {
      const shuffled = [...examDetails.questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 25);
      setShuffledQuestions(shuffled);
    }
  }, [examDetails.questions]);

  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime < 1) {
          clearInterval(timer);
          setIsButtonEnabled(false);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const calculateScore = () => {
    let score = 0;
    shuffledQuestions.forEach((question, index) => {
      if (
        selectedAnswers[index] === question.options[question.correctAnswer - 1]
      ) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = async () => {
    if (!submitted && isButtonEnabled) {
      try {
        // Prepare answers array matching backend expectation
        const answers = shuffledQuestions.map(
          (question, index) => selectedAnswers[index] || null
        );

        const response = await submitExams(answers, examId);

        const score = calculateScore();
        setCorrectAnswers(score);
        setTimeLeft(null);
        setSubmitted(true);
        setIsButtonEnabled(false);

        // Optional: Show server-side score if needed
        if (response.data.score !== undefined) {
          console.log("Server-side score:", response.data.score);
        }
      } catch (error) {
        console.error("Error submitting exam:", error);
        alert("Failed to submit exam");
      }
    }
  };

  // Rest of the component remains the same as in the previous implementation
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="px-6 py-8">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-900">
            Exam Page
          </h1>

          {timeLeft !== null && (
            <div
              className={`p-4 mb-6 bg-blue-100 rounded-lg ${
                timeLeft < 120 && timeLeft != 0
                  ? "fixed top-0 left-0 right-0 z-50"
                  : ""
              }`}
            >
              <div
                className={`text-xl font-semibold text-center text-blue-800 transition-all duration-1000 ${
                  timeLeft < 120 && timeLeft !== 0
                    ? "animate-pulse scale-[1.5]"
                    : ""
                }`}
                style={{
                  animation:
                    timeLeft < 60 && timeLeft !== 0
                      ? "heartbeat 1.5s ease-in-out infinite"
                      : "none",
                }}
              >
                <style>
                  {`
                    @keyframes heartbeat {
                      0% { transform: scale(1); }
                      50% { transform: scale(1.5); }
                      100% { transform: scale(1); }
                    }
                  `}
                </style>
                Time Remaining: {formatTime(timeLeft)}
              </div>
            </div>
          )}

          {examDetails && (
            <div className="space-y-8">
              <h2 className="pb-4 text-2xl font-semibold text-gray-800 border-b">
                {examDetails.title}
              </h2>

              <div className="space-y-6">
                {shuffledQuestions.map((question, index) => (
                  <div key={question.id} className="p-6 rounded-lg bg-gray-50">
                    <h3 className="mb-4 text-lg font-medium text-gray-900">
                      Question {index + 1}
                    </h3>
                    <p className="mb-4 text-gray-700">{question.question}</p>
                    <div className="space-y-3">
                      {!submitted &&
                        !selectedAnswers[index] &&
                        timeLeft !== 0 && (
                          <div className="mb-2 text-sm text-red-500">
                            Please select an answer for this question
                          </div>
                        )}

                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center">
                          <input
                            type="radio"
                            id={`q${index}-opt${optIndex}`}
                            name={`question-${index}`}
                            value={option}
                            disabled={submitted || timeLeft === 0}
                            checked={selectedAnswers[index] === option}
                            onChange={(e) => {
                              const selectedAnswer = e.target.value;
                              const answers = [...selectedAnswers];
                              answers[index] = selectedAnswer;
                              setSelectedAnswers(answers);
                            }}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <label
                            htmlFor={`q${index}-opt${optIndex}`}
                            className={`block ml-3 ${
                              submitted || timeLeft === 0
                                ? "text-gray-500"
                                : "text-gray-700"
                            }`}
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {submitted && (
            <div className="mt-8 space-y-8">
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="mb-4 text-xl font-semibold text-gray-800">
                  Exam Results
                </h3>
                <div className="flex items-center justify-between p-4 mb-4 rounded-lg bg-blue-50">
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      Total Score
                    </p>
                    <p className="text-3xl font-bold text-blue-600">
                      {correctAnswers}/{shuffledQuestions.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      Percentage
                    </p>
                    <p className="text-3xl font-bold text-blue-600">
                      {Math.round(
                        (correctAnswers / shuffledQuestions.length) * 100
                      )}
                      %
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {shuffledQuestions.map((question, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="mb-2 font-medium text-gray-900">
                            Question {index + 1}
                          </h4>
                          <p className="mb-2 text-gray-700">
                            {question.question}
                          </p>
                          <p className="text-sm text-gray-600">
                            Your answer:{" "}
                            {selectedAnswers[index] || "Not answered"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Correct answer:{" "}
                            {question.options[question.correctAnswer - 1]}
                          </p>
                        </div>
                        <div
                          className={`flex items-center ${
                            selectedAnswers[index] ===
                            question.options[question.correctAnswer - 1]
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {selectedAnswers[index] ===
                          question.options[question.correctAnswer - 1] ? (
                            <span className="text-2xl">✓</span>
                          ) : (
                            <span className="text-2xl">✗</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              disabled={
                !isButtonEnabled ||
                submitted ||
                selectedAnswers.length !== shuffledQuestions.length
              }
              className={`
                px-6 py-3 rounded-md text-white font-medium
                ${
                  isButtonEnabled &&
                  !submitted &&
                  selectedAnswers.length === shuffledQuestions.length
                    ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    : "bg-gray-400 cursor-not-allowed"
                }
              `}
            >
              {submitted ? "Exam Submitted" : "Submit Exam"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
