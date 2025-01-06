import React, { useEffect, useState } from "react";

import {
  getExamForStudent,
  submitIndividualAnswer,
  submitExam,
} from "../../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ExamPage = () => {
  const { examId } = useParams();
  const [timeLeft, setTimeLeft] = useState(null);
  const [examTitle, setExamTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [qId, setQId] = useState(null);
  const [examEndTime, setExamEndTime] = useState(null);
  const navigate = useNavigate();
  const [submittedQuestion, setSubmittedQuestion] = useState([]);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await getExamForStudent(examId);
        if (res.statusText && res.data.timeLimit) {
          setQId(res.data.questions[0]._id);
          setQuestions(res.data.questions);
          setExamTitle(res.data.title);

          const startTime = new Date(res.data.startTime);
          console.log(startTime, "h");
          const endTime = new Date(
            startTime.getTime() + res.data.timeLimit * 60000
          ); // Add time limit (in minutes)
          setExamEndTime(endTime);
          console.log(endTime, "e");
          setTimeLeft(Math.floor((endTime - Date.now()) / 1000)); // Set initial remaining time
        }
      } catch (error) {
        console.error("Failed to fetch exam data:", error);
      }
    };

    const fetchAnswers = async () => {
      const res = await fetch(
        `http://localhost:4000/api/student/getAllAnswersForRespectedExam/${examId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      // setSubmittedQuestionId(data.answers.question);
      data.answers.map((answer) => {
        setSubmittedQuestion([...submittedQuestion, answer]);
      });
    };
    fetchAnswers();
    fetchExam();
  }, [examId]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = Math.max(
        Math.floor((examEndTime - currentTime) / 1000),
        0
      );
      setTimeLeft(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, examEndTime]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleOptionChange = (optionIndex) => {
    setSelectedOption(optionIndex + 1);
  };

  const handleNext = async () => {
    try {
      const res = await submitIndividualAnswer(qId, examId, selectedOption);
      if (res.status === 201 || res.statusText === "OK") {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
          setCurrentQuestionIndex(nextIndex);
          setQId(questions[nextIndex]._id);
          setSelectedOption(null);
        }
      } else {
        console.error("Failed to submit answer:", res.statusText);
      }
    } catch (error) {
      console.error("Error submitting answer:", error.message);
    }
  };

  const handleSubmitExam = async () => {
    try {
      const currentTime = Date.now();

      if (currentTime > examEndTime) {
        alert("Time is over");
        return;
      }

      const res = await submitIndividualAnswer(qId, examId, selectedOption);
      if (res.status === 201 || res.statusText === "OK") {
        const response = await submitExam(examId);
        if (response.status === 200 || response.statusText === "OK") {
          console.log("Exam submitted successfully!");
          alert("exam is submitted");
          console.log(res.data); //here you get result data i guess
          window.location.href = "/dashboard/student";
        } else {
          console.error("Failed to submit exam:", res.statusText);
        }
      } else {
        alert("some error occurred");
      }
    } catch (error) {
      console.error("Error submitting exam:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center">
      <div className="w-full max-w-4xl mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
          Exam: {examTitle}
        </h1>
        {timeLeft !== null && timeLeft > 0 ? (
          <div
            className={`text-2xl font-bold text-center ${
              timeLeft < 30 ? "text-red-600 animate-pulse" : "text-blue-700"
            }`}
          >
            Time Left: {formatTime(timeLeft)}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading timer...</p>
        )}
        {timeLeft === 0 && (
          <p className="mt-4 text-center text-red-600 font-medium">
            Time's up!
          </p>
        )}
        {timeLeft <= 0 &&
          (alert("Time's Up!"), navigate("/dashboard/student/take-exam"))}
      </div>

      <div className="w-full max-w-4xl mt-6 p-6 bg-white rounded-lg shadow-md">
        {questions.length > 0 ? (
          <>
            <div>
              <p className="text-lg font-semibold text-gray-700 mb-4">
                Question {currentQuestionIndex + 1} of {questions.length}:
              </p>
              <p className="text-gray-800 text-lg mb-6">
                {questions[currentQuestionIndex].questionText}
              </p>
              <div className="space-y-3">
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <label
                      key={index}
                      className="block bg-gray-50 border rounded-lg px-4 py-2 hover:bg-blue-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestionIndex}`}
                        value={index + 1}
                        onChange={() => handleOptionChange(index)}
                        className="mr-3"
                        checked={selectedOption === index + 1}
                      />
                      {option}
                    </label>
                  )
                )}
              </div>
            </div>
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                className={`mt-6 w-full py-3 text-lg font-semibold rounded ${
                  selectedOption
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={handleNext}
                disabled={!selectedOption}
              >
                Next
              </button>
            ) : (
              <button
                className={`mt-6 w-full py-3 text-lg font-semibold rounded ${
                  selectedOption
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={handleSubmitExam}
                disabled={!selectedOption}
              >
                Submit Exam
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-500">Loading questions...</p>
        )}
      </div>
    </div>
  );
};

export default ExamPage;
