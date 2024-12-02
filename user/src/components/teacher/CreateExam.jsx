import React, { useState, useEffect } from "react";
import { getTeacherDetails } from "../../utils/api";
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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
          Assigned Subjects
        </h1>
        {assignedSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assignedSubjects.map((subj, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`${subj.subject}`, { state: subj })}
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {subj.subject}
                </h2>
                <p className="text-gray-600">Semester: {subj.semester}</p>
                <p className="text-gray-600">Year: {subj.year}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            You are not assigned to any subjects yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateExam;
