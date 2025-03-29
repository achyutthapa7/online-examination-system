import React, { useEffect, useState } from "react";
import { getStudentExams, nextExams } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const TakeExam = () => {
  const [exams, setExams] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const navigate = useNavigate();

  const currentTime = new Date().getTime();

  const { data, isLoading, error } = useQuery({
    queryKey: ["studentExams"],
    queryFn: getStudentExams,
    refetchInterval: 1000,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    onSuccess: (data) => {
      const filteredExams = (data.data.exams || []).filter((exam) => {
        const startTime = new Date(exam.startTime).getTime();
        const endTime = new Date(exam.endTime).getTime();
        return currentTime >= startTime && currentTime <= endTime; // Ongoing exams only
      });
      setExams(filteredExams);
    },
  });

  const {
    data: upcomingData,
    isLoading: isUpcomingLoading,
    error: upcomingError,
  } = useQuery({
    queryKey: ["upcomingExams"],
    queryFn: nextExams,
    refetchInterval: 2000,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    onSuccess: (data) => {
      setUpcomingExams(data.data.exams || []);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="mb-6 text-4xl font-bold text-green-700">
        Available Exams
      </h1>

      {exams.length === 0 ? (
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

      <h1 className="mb-6 text-4xl font-bold text-blue-700">Upcoming Exams</h1>

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
