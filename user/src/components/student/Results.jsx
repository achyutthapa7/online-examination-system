import React, { useEffect, useState } from "react";

const Results = () => {
  const [completedExams, setCompletedExams] = useState([]);
  const passingPercentage = 40;
  console.log(completedExams);
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(
          "http://localhost:4000/api/student/showCompletedExams",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        setCompletedExams(data.completedExams);
      } catch (error) {
        console.error("Failed to fetch results:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
        🏆 Exam Results
      </h2>

      {completedExams?.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No results found.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="max-h-[400px] overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-200 text-gray-700 sticky top-0 z-10">
                <tr>
                  <th className="p-3 text-left">Exam</th>
                  <th className="p-3 text-left">Subject</th>
                  <th className="p-3 text-left">Year/Semester</th>
                  <th className="p-3 text-left">Score</th>
                  <th className="p-3 text-left">Percentage</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {completedExams.map((examData) => {
                  const totalQuestions = examData.exam.questions?.length;
                  const percentage =
                    totalQuestions > 0
                      ? ((examData.score / totalQuestions) * 100).toFixed(2)
                      : 0;
                  const isPassed = percentage >= passingPercentage;

                  return (
                    <React.Fragment key={examData._id}>
                      <tr className="border-b">
                        <td className="p-3 font-semibold">
                          {examData.exam.title}
                        </td>
                        <td className="p-3">{examData.exam.subject}</td>
                        <td className="p-3">
                          {examData.exam.year} / {examData.exam.semester}
                        </td>
                        <td className="p-3 text-blue-600 font-bold text-lg">
                          {examData.score} / {totalQuestions}
                        </td>
                        <td className="p-3 text-purple-600 font-bold text-lg">
                          {percentage}%
                        </td>
                        <td
                          className={`p-3 font-bold text-lg ${
                            isPassed ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {isPassed ? "✅ Pass" : "❌ Fail"}
                        </td>
                      </tr>

                      {/* Display Questions for Each Exam */}
                      {totalQuestions > 0 && (
                        <tr className="bg-gray-100">
                          <td colSpan="6" className="p-4">
                            <h4 className="text-md font-bold text-gray-700 mb-2">
                              📝 Questions:
                            </h4>
                            <ul className="space-y-2">
                              {examData.exam.questions.map((question) => (
                                <li
                                  key={question._id}
                                  className="p-3 border border-gray-300 rounded-md bg-white shadow-sm"
                                >
                                  <p className="font-medium text-gray-800">
                                    {question.questionText}
                                  </p>
                                  <ul className="list-decimal ml-5 mt-2 text-gray-700">
                                    {question.options.map((option, index) => (
                                      <li
                                        key={index}
                                        className={`mt-1 ${
                                          index + 1 === question.correctAnswer
                                            ? "text-green-600 font-semibold"
                                            : ""
                                        }`}
                                      >
                                        {index + 1}. {option}
                                      </li>
                                    ))}
                                  </ul>
                                  <p className="mt-2 font-semibold text-green-600">
                                    ✅ Correct Answer:{" "}
                                    {
                                      question.options[
                                        question.correctAnswer - 1
                                      ]
                                    }
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
