import React, { useState, useEffect } from "react";
import { getExamQuestion, submitExams } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const ExamPage = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [questionOnPage, setQuestionOnPage] = useState({});
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
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
      const exam = response.data.exam;
      setExamDetails({
        title: exam.title,
        timeLimit: exam.timeLimit * 60,
        questions: exam.questions,
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

  useEffect(() => {
    if (examDetails.questions.length > 0) {
      const shuffled = [...examDetails.questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 25);
      setShuffledQuestions(shuffled);
    }
  }, [examDetails.questions]);

  useEffect(() => {
    if (shuffledQuestions.length > 0) {
      setQuestionOnPage(shuffledQuestions[index]);
    }
  }, [index, shuffledQuestions]);

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
    if (!submitted) {
      try {
        const answers = shuffledQuestions.map(
          (question, index) => selectedAnswers[index] || null
        );

        const response = await submitExams(answers, examId);

        const score = calculateScore();
        setCorrectAnswers(score);
        setTimeLeft(null);
        setSubmitted(true);
      } catch (error) {
        console.error("Error submitting exam:", error);
        alert("Failed to submit exam");
      }
    }
  };

  const handleNextQuestion = () => {
    if (index < shuffledQuestions.length - 1) {
      setIndex((prev) => prev + 1);
      setIsButtonEnabled(false);
    }
  };

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
              <h2 className="pb-4 flex justify-between  w-full  text-2xl font-semibold text-gray-800 border-b">
                <span> {examDetails.title}</span>

                <span>{index + 1 + " out of " + shuffledQuestions.length}</span>
              </h2>
              {/*
               <div className="space-y-6">
                {shuffledQuestions.map((question, index) => (
                  <div key={question.id} className="p-6 rounded-lg bg-gray-50">
                    <div className="flex gap-12  items-center">
                      <span className="mb-4 text-lg font-medium text-gray-900">
                        {question.questionText}
                      </span>
                      {!submitted &&
                        !selectedAnswers[index] &&
                        timeLeft !== 0 && (
                          <span className="mb-3  text-sm font-medium text-red-500">
                            Please select an answer for this question
                          </span>
                        )}
                    </div>
                    <p className="mb-4 text-gray-700">{question.question}</p>
                    <div className="space-y-3">
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
              */}

              <div className="space-y-6">
                {shuffledQuestions.slice(index, index + 1).map((question) => (
                  <div key={question.id} className="p-6 rounded-lg bg-gray-50">
                    <div className="flex w-full   items-center">
                      <span className="text-lg  font-medium mr-2  text-gray-900">
                        {question.questionText}
                      </span>

                      {!submitted && timeLeft !== 0 && (
                        <sup className=" text-[12px] font-medium text-red-500">
                          * Please select an answer for this question
                        </sup>
                      )}
                    </div>
                    <p className="mb-4 text-gray-700">{question.question}</p>
                    <div className="space-y-3">
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center">
                          <input
                            type="radio"
                            id={`q${index}-opt${optIndex}`}
                            name={`question-${index}`}
                            value={option}
                            checked={selectedAnswers[index] === option}
                            disabled={submitted || timeLeft === 0}
                            onChange={(e) => {
                              setIsButtonEnabled(true);
                              const selectedAnswer = e.target.value;

                              const answers = [...selectedAnswers];
                              console.log(answers);
                              answers[index] = selectedAnswer;

                              console.log(answers, "Answer");
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
                            {question.questionText}
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
            {index === shuffledQuestions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!isButtonEnabled || submitted}
                className={`
                  px-6 py-3 rounded-md text-white font-medium
                  ${
                    !submitted
                      ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      : "bg-gray-400 cursor-not-allowed"
                  }
                `}
              >
                {submitted ? "Exam Submitted" : "Submit Exam"}
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                disabled={!isButtonEnabled}
                className={`
                  px-6 py-3 rounded-md text-white font-medium
                  ${
                    isButtonEnabled
                      ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      : "bg-gray-400 cursor-not-allowed"
                  }
                `}
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
