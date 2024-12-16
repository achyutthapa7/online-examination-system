import React, { useEffect, useState } from "react";
import { getStudentExams, nextExams } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const TakeExam = () => {
  const [exams, setExams] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getExams = async () => {
    try {
      const response = await getStudentExams();
      console.log(response);
      setExams(Array.isArray(response.data.exams) ? response.data.exams : []);
    } catch (error) {
      // console.error("Failed to fetch exams:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUpcomingExams = async () => {
    try {
      const response = await nextExams();
      setUpcomingExams(
        Array.isArray(response.data.exams) ? response.data.exams : []
      );
    } catch (error) {
      // console.error("Failed to fetch upcoming exams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExams();
    getUpcomingExams();
    // const interval = setInterval(() => {
    //   getExams();
    //   getUpcomingExams();
    // }, 100);

    // return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="">Available Exams</h1>

      {loading ? (
        <div className="text-center text-gray-600">Loading exams...</div>
      ) : exams.length === 0 ? (
        <div className="text-center text-gray-600">No available exams.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-md"
            >
              <h2 className="mb-2 text-2xl font-semibold text-green-700">
                {exam.title}
              </h2>
              <p className="text-gray-600">
                <strong>Subject:</strong> {exam.subject}
              </p>
              <p className="text-gray-600">
                <strong>Year:</strong> {exam.year} | <strong>Semester:</strong>{" "}
                {exam.semester}
              </p>
              <p className="text-gray-600">
                <strong>Time Limit:</strong> {exam.timeLimit} minutes
              </p>
              <button
                className="px-4 py-2 mt-4 text-white transition bg-green-600 rounded hover:bg-green-700"
                onClick={() => navigate(exam._id, { state: exam })}
              >
                Start Exam
              </button>
            </div>
          ))}
        </div>
      )}

      <h1 className="mb-6 text-4xl font-bold text-blue-700">Upcomin Exams</h1>

      {upcomingExams.length === 0 ? (
        <div className="text-center text-gray-600">No upcoming exams.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingExams.map((exam) => (
            <div
              key={exam._id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-md"
            >
              <h2 className="mb-2 text-2xl font-semibold text-blue-700">
                {exam.title}
              </h2>
              <p className="text-gray-600">
                <strong>Subject:</strong> {exam.subject}
              </p>
              <p className="text-gray-600">
                <strong>Year:</strong> {exam.year} | <strong>Semester:</strong>{" "}
                {exam.semester}
              </p>
              <p className="text-gray-600">
                <strong>Exam Date:</strong> {exam.examDate}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TakeExam;
