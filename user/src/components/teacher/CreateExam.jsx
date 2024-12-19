import React, { useState, useEffect } from "react";
import { createExam, getTeacherDetails } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const CreateExam = () => {
  const navigate = useNavigate();
  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const res = await getTeacherDetails();
        setAssignedSubjects(res.data.user.assignedSubjects || []);
      } catch (err) {
        setError("Failed to fetch assigned subjects.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeacherDetails();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }
  const handleExamCreation = async (subj) => {
    try {
      const res = await createExam(subj.subject);

      if (res.statusText) {
        navigate(subj.subject, { state: res.data.exam._id });
      } else {
        alert("Failed to create exam for this subject.");
      }
    } catch (error) {
      console.error("Error starting exam:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-10">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        Assigned Subjects
      </h1>
      {assignedSubjects.length > 0 ? (
        <div className="grid w-full h-full grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {assignedSubjects.map((subj, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-between px-8 py-4 rounded-lg shadow-md bg-white min-h-[160px] transition hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {subj.subject}
              </h2>
              <p className="text-gray-600">Semester: {subj.semester}</p>
              <p className="text-gray-600">Year: {subj.year}</p>
              <button
                className="px-4 py-2 w-1/2 mt-4 text-white transition bg-green-600 rounded hover:bg-green-700"
                onClick={() => {
                  handleExamCreation(subj);
                }}
              >
                Create Exam
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">
          You are not assigned to any subjects yet.
        </p>
      )}
    </div>
  );
};

export default CreateExam;
