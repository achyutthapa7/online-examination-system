import React, { useEffect, useState } from "react";
import { deleteExam, getExamsForTeacher } from "../../utils/api";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ViewExams = () => {
  const [exams, setExams] = useState([]);
  const [isExamDeleting, setIsExamDeleting] = useState(false);
  // State to manage which sections are expanded
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [expandedSubmissions, setExpandedSubmissions] = useState({});

  useEffect(() => {
    const getCreateExams = async () => {
      const res = await getExamsForTeacher();
      setExams(res.data); // Storing the response in state
    };
    getCreateExams();
  }, []);

  // Toggle visibility of the questions
  const toggleQuestions = (examId) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [examId]: !prev[examId],
    }));
  };

  // Toggle visibility of the submissions
  const toggleSubmissions = (examId) => {
    setExpandedSubmissions((prev) => ({
      ...prev,
      [examId]: !prev[examId],
    }));
  };
  const handleDeleteExam = async (examId) => {
    setIsExamDeleting(true);
    const res = await deleteExam(examId);
    if (res.status === 200 || res.status === 201) {
      toast.success("Exam deleted successfully", {
        position: "top-right",
        autoClose: 250,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setExams(exams.filter((e) => e._id !== examId));
    }
    setIsExamDeleting(false);
  };
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">View Exams</h1>
      {exams.length === 0 ? (
        <p>No exams available</p>
      ) : (
        exams.map((exam) => (
          <div
            key={exam._id}
            className="bg-white p-6 rounded-lg shadow-lg mb-6 transition-all duration-300  "
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              {exam.title} - {exam.subject}
            </h2>
            <p className="text-gray-600">
              Year: {exam.year} | Semester: {exam.semester}
            </p>
            <p className="text-gray-600">
              Time Limit: {exam.timeLimit} minutes
            </p>

            {/* Toggle Questions Section */}
            <div className="mt-6 ">
              <button
                onClick={() => toggleQuestions(exam._id)}
                className="flex items-center text-xl font-semibold text-blue-500 hover:text-blue-700"
              >
                {expandedQuestions[exam._id] ? (
                  <FaChevronUp className="mr-2" />
                ) : (
                  <FaChevronDown className="mr-2" />
                )}
                {expandedQuestions[exam._id]
                  ? "Hide Questions"
                  : "Show Questions"}
              </button>
              <div
                className={` overflow-scroll  transition-all duration-300  mt-4 ${
                  expandedQuestions[exam._id] ? "max-h-screen " : "max-h-0"
                }`}
              >
                {expandedQuestions[exam._id] && (
                  <div className="bg-gray-100 p-6 rounded-lg shadow-md ">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                      Questions
                    </h3>
                    {exam.questions.map((question) => (
                      <div
                        key={question._id}
                        className="bg-white p-5 rounded-lg shadow-sm mb-4 transition-all duration-200 hover:shadow-lg hover:bg-gray-50"
                      >
                        <p className="font-medium text-gray-800">
                          {question.questionText}
                        </p>
                        <ul className="list-disc pl-6 mt-2 text-gray-700">
                          {question.options.map((option, index) => (
                            <li key={index} className="text-gray-700">
                              {option}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2 font-medium text-green-600">
                          <strong>Correct Answer:</strong>{" "}
                          {question.options[question.correctAnswer - 1]}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Toggle Submissions Section */}
            <div className="mt-6">
              <button
                onClick={() => toggleSubmissions(exam._id)}
                className="flex items-center text-xl font-semibold text-blue-500 hover:text-blue-700"
              >
                {expandedSubmissions[exam._id] ? (
                  <FaChevronUp className="mr-2" />
                ) : (
                  <FaChevronDown className="mr-2" />
                )}
                {expandedSubmissions[exam._id]
                  ? "Hide Submissions"
                  : "Show Submissions"}
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden mt-4 ${
                  expandedSubmissions[exam._id] ? "max-h-screen" : "max-h-0"
                }`}
              >
                {expandedSubmissions[exam._id] && (
                  <div className="bg-green-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                      Submissions
                    </h3>
                    {exam.submissions.length === 0 ? (
                      <p>No submissions yet</p>
                    ) : (
                      exam.submissions.map((submission) => (
                        <div
                          key={submission._id}
                          className="bg-white p-5 rounded-lg shadow-sm mb-4 transition-all duration-200 hover:shadow-lg hover:bg-gray-50"
                        >
                          <h4 className="text-lg font-medium text-gray-800">
                            Name : {submission.student.fullName}
                          </h4>
                          <p className="text-gray-700">
                            Score: {submission.student.completedExams[0].score}
                          </p>
                          {/* <ul className="list-disc pl-6">
                            {submission.answers.map((answer, index) => (
                              <li key={index} className="text-gray-800">
                                {answer}
                              </li>
                            ))}
                          </ul> */}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Delete Exam Button */}
            <button
              disabled={isExamDeleting}
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this exam?")
                ) {
                  handleDeleteExam(exam._id);
                }
              }}
              className="mt-6 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              {isExamDeleting ? "Deleting...." : "Delete Exam"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewExams;
