import React, { useEffect, useState } from "react";
import { API_URL } from "../../utils/api";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Results = () => {
  const [completedExams, setCompletedExams] = useState([]);
  const [expandedExam, setExpandedExam] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const passingPercentage = 40;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`${API_URL}/student/showCompletedExams`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setCompletedExams(data.completedExams);
      } catch (error) {
        console.error("Failed to fetch results:", error);
      }
    };

    fetchResults();
  }, []);

  const toggleExam = (examId) => {
    setExpandedExam(expandedExam === examId ? null : examId);
  };

  const toggleQuestions = (examId) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [examId]: !prev[examId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            🏆 Your Exam Results
          </h1>
          <p className="mt-2 text-gray-600">
            Review your performance across all completed exams
          </p>
        </div>

        {completedExams?.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-500 text-lg">
              No exam results available yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {completedExams.map((examData) => {
              const totalQuestions = examData.exam?.questions?.length;
              const percentage =
                totalQuestions > 0
                  ? ((examData.score / totalQuestions) * 100).toFixed(2)
                  : 0;
              const isPassed = percentage >= passingPercentage;

              return (
                <div
                  key={examData._id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  {/* Desktop View (unchanged) */}
                  <div className="hidden sm:block">
                    <div
                      className={`p-5 ${
                        isPassed ? "bg-green-50" : "bg-red-50"
                      } border-b`}
                    >
                      <div className="flex flex-row items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {examData.exam?.title}
                          </h3>
                          <p className="text-gray-600">
                            {examData.exam?.subject} • Year {examData.exam?.year}{" "}
                            • Semester {examData?.exam?.semester}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Score</p>
                            <p className="text-xl font-bold text-blue-600">
                              {examData.score}/{totalQuestions}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Percentage</p>
                            <p className="text-xl font-bold text-purple-600">
                              {percentage}%
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Status</p>
                            <p
                              className={`text-xl font-bold ${
                                isPassed ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {isPassed ? "Passed" : "Failed"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {totalQuestions > 0 && (
                      <div className="p-5">
                        <h4 className="text-md font-semibold text-gray-700 mb-4 flex items-center">
                          <span className="bg-gray-100 p-1 rounded-full mr-2">
                            📝
                          </span>
                          Exam Questions Review
                        </h4>

                        <div className="space-y-4">
                          {examData.exam.questions?.map((question, qIndex) => {
                            const isCorrect = examData.correctAnswers?.includes(
                              question._id
                            );

                            return (
                              <div
                                key={question._id}
                                className="border border-gray-200 rounded-lg p-4"
                              >
                                <div className="flex items-start">
                                  <span
                                    className={`inline-flex items-center justify-center h-6 w-6 rounded-full mr-3 mt-1 flex-shrink-0 ${
                                      isCorrect
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {qIndex + 1}
                                  </span>
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-800">
                                      {question.questionText}
                                    </p>

                                    <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {question.options.map((option, index) => (
                                        <li
                                          key={index}
                                          className={`p-2 rounded-md text-sm ${
                                            index + 1 === question.correctAnswer
                                              ? "bg-green-50 text-green-800 font-medium border border-green-200"
                                              : examData.selectedAnswers?.[
                                                  qIndex
                                                ] ===
                                                  index + 1 && !isCorrect
                                              ? "bg-red-50 text-red-800 border border-red-200"
                                              : "bg-gray-50 text-gray-700"
                                          }`}
                                        >
                                          <span className="font-medium mr-1">
                                            {String.fromCharCode(65 + index)}.
                                          </span>
                                          {option}
                                          {index + 1 ===
                                            question.correctAnswer && (
                                            <span className="ml-2 text-green-600">
                                              ✓
                                            </span>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mobile View (collapsible) */}
                  <div className="sm:hidden">
                    <div
                      className={`p-4 ${
                        isPassed ? "bg-green-50" : "bg-red-50"
                      } flex justify-between items-center cursor-pointer`}
                      onClick={() => toggleExam(examData._id)}
                    >
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {examData.exam?.title}
                        </h3>
                        <div className="flex space-x-3 mt-1">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              isPassed
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {isPassed ? "Passed" : "Failed"}
                          </span>
                          <span className="text-sm text-gray-600">
                            {percentage}%
                          </span>
                        </div>
                      </div>
                      {expandedExam === examData._id ? (
                        <FiChevronUp className="text-gray-500" />
                      ) : (
                        <FiChevronDown className="text-gray-500" />
                      )}
                    </div>

                    {expandedExam === examData._id && (
                      <div className="p-4 border-t">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Subject</p>
                            <p className="font-medium">
                              {examData.exam?.subject}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">
                              Year/Semester
                            </p>
                            <p className="font-medium">
                              {examData?.exam?.year}/{examData?.exam?.semester}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Score</p>
                            <p className="font-medium text-blue-600">
                              {examData?.score}/{totalQuestions}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Percentage</p>
                            <p className="font-medium text-purple-600">
                              {percentage}%
                            </p>
                          </div>
                        </div>

                        {totalQuestions > 0 && (
                          <div>
                            <div
                              className="flex items-center justify-between py-2 border-t border-b border-gray-200 mt-2 cursor-pointer"
                              onClick={() => toggleQuestions(examData._id)}
                            >
                              <h4 className="font-medium text-gray-700">
                                View Questions ({totalQuestions})
                              </h4>
                              {expandedQuestions[examData._id] ? (
                                <FiChevronUp className="text-gray-500" />
                              ) : (
                                <FiChevronDown className="text-gray-500" />
                              )}
                            </div>

                            {expandedQuestions[examData._id] && (
                              <div className="mt-3 space-y-3">
                                {examData?.exam?.questions?.map(
                                  (question, qIndex) => {
                                    const isCorrect =
                                      examData.correctAnswers?.includes(
                                        question._id
                                      );

                                    return (
                                      <div
                                        key={question._id}
                                        className="border border-gray-200 rounded-lg p-3"
                                      >
                                        <div className="flex items-start">
                                          <span
                                            className={`inline-flex items-center justify-center h-5 w-5 rounded-full mr-2 mt-1 text-xs flex-shrink-0 ${
                                              isCorrect
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                                          >
                                            {qIndex + 1}
                                          </span>
                                          <div className="flex-1">
                                            <p className="font-medium text-gray-800 text-sm">
                                              {question.questionText}
                                            </p>

                                            <ul className="mt-2 space-y-1">
                                              {question.options.map(
                                                (option, index) => (
                                                  <li
                                                    key={index}
                                                    className={`p-1.5 rounded text-xs ${
                                                      index + 1 ===
                                                      question.correctAnswer
                                                        ? "bg-green-50 text-green-800 font-medium"
                                                        : examData
                                                            .selectedAnswers?.[
                                                            qIndex
                                                          ] ===
                                                            index + 1 &&
                                                          !isCorrect
                                                        ? "bg-red-50 text-red-800"
                                                        : "bg-gray-50 text-gray-700"
                                                    }`}
                                                  >
                                                    <span className="font-medium mr-1">
                                                      {String.fromCharCode(
                                                        65 + index
                                                      )}
                                                      .
                                                    </span>
                                                    {option}
                                                    {index + 1 ===
                                                      question.correctAnswer && (
                                                      <span className="ml-1 text-green-600 text-xs">
                                                        ✓
                                                      </span>
                                                    )}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
