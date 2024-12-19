import React, { useEffect, useState } from "react";
import { getSavedExam } from "../../utils/api";
import { Outlet, useNavigate } from "react-router-dom"; // Import the useNavigate hook

const SavedExams = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const savedExam = async () => {
      const res = await getSavedExam();
      // Log the response to check data structure
      setExams(res.data); // Set the data in the state
    };
    savedExam();
  }, []);

  const handleContinue = (exam) => {
    navigate("/dashboard/teacher/saved-exams/continue", {
      state: exam.examId._id,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Saved Exams</h2>
      {exams.length === 0 ? (
        <p className="text-xl text-center text-gray-600">
          No saved exams found.
        </p>
      ) : (
        exams.map((exam) => (
          <div
            key={exam._id}
            className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-all  hover:shadow-xl"
          >
            <h3 className="text-2xl font-semibold text-gray-800">
              {exam.examId.title}
            </h3>
            <p className="text-lg text-gray-600 mt-2">
              <strong>Subject:</strong> {exam.examId.subject}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Year:</strong> {exam.examId.year}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Semester:</strong> {exam.examId.semester}
            </p>
            <p className="text-lg text-gray-600 mt-4">
              <strong>Saved On:</strong>{" "}
              {new Date(exam.createdAt).toLocaleString()}
            </p>
            <button
              onClick={() => handleContinue(exam)} // Pass the exam ID to the handler
              className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
            >
              Continue Creating
            </button>
            <Outlet />
          </div>
        ))
      )}
    </div>
  );
};

export default SavedExams;
