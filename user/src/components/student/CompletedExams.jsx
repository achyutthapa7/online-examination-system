import { useEffect, useState } from "react";

const CompletedExams = () => {
  const [completedExams, setCompletedExams] = useState([]);

  useEffect(() => {
    const fetchCompletedExams = async () => {
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
        console.error("Failed to fetch completed exams:", error);
      }
    };

    fetchCompletedExams();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
        ✅ Completed Exams
      </h2>

      {completedExams.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No completed exams found.
        </p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Scrollable Container */}
          <div className="max-h-[400px] overflow-y-auto p-4">
            <ul className="space-y-4">
              {completedExams.map((examData) => (
                <li
                  key={examData._id}
                  className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-700">
                    {examData.exam.title}
                  </h3>
                  <p className="text-gray-600">
                    📖 Subject:{" "}
                    <span className="font-medium">{examData.exam.subject}</span>
                  </p>
                  <p className="text-gray-600">
                    📆 Year:{" "}
                    <span className="font-medium">{examData.exam.year}</span>,
                    Semester:{" "}
                    <span className="font-medium">
                      {examData.exam.semester}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    🎯 Score:{" "}
                    <span className="font-bold text-blue-600">
                      {examData.score}
                    </span>
                  </p>

                  {/* Displaying Questions */}
                  {examData.exam.questions.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-md font-semibold text-gray-700">
                        📝 Questions:
                      </h4>
                      <ul className="space-y-3 mt-2">
                        {examData.exam.questions.map((question) => (
                          <li
                            key={question._id}
                            className="p-3 border border-gray-300 rounded-md bg-gray-50"
                          >
                            <p className="font-medium text-gray-700">
                              {question.questionText}
                            </p>
                            <ul className="list-disc ml-6 mt-2 text-gray-600">
                              {question.options.map((option, index) => (
                                <li key={index} className="mt-1">
                                  {index + 1}. {option}
                                </li>
                              ))}
                            </ul>
                            <p className="mt-2 font-semibold text-green-600">
                              ✅ Correct Answer:{" "}
                              {question.options[question.correctAnswer - 1]}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletedExams;
