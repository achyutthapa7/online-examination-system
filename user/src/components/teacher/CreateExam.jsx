import React, { useState, useEffect } from "react";
import { createExam, getTeacherDetails } from "../../utils/api";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateExam = () => {
  const navigate = useNavigate();
  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExamCreating, setIsExamCreating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const res = await getTeacherDetails();

        setAssignedSubjects(res.data.user.assignedSubjects || []);
      } catch (err) {
        console.log(err);
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
    setIsExamCreating(true);
    try {
      const res = await createExam(subj.subject);
      if (res.status === 201) {
        navigate(subj.subject, { state: res.data.exam._id });
      } else {
        toast.error("Failed to create exam for this subject.", {
          position: "top-right",
          autoClose: 250,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsExamCreating(false);
      }
    } catch (error) {
      console.error("Error starting exam:", error);
    } finally {
      setIsExamCreating(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:py-8 sm:px-6 md:py-10 md:px-8 lg:px-10">
      <h1 className="text-xl font-bold text-gray-700 mb-4 sm:text-2xl sm:mb-6">
        Assigned Subjects
      </h1>

      {assignedSubjects.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-4 mb-8 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {assignedSubjects.map((subj, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-between p-5 rounded-lg shadow-md bg-white min-h-[140px] transition hover:shadow-lg sm:p-6 sm:min-h-[160px]"
            >
              <div className="w-full">
                <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
                  {subj.subject}
                </h2>
                <p className="text-sm text-gray-600 sm:text-base">
                  Semester: {subj.semester}
                </p>
                <p className="text-sm text-gray-600 sm:text-base">
                  Year: {subj.year}
                </p>
              </div>
              <button
                disabled={isExamCreating}
                className="px-3 py-1.5 w-full mt-3 text-sm text-white transition bg-green-600 rounded hover:bg-green-700 sm:px-4 sm:py-2 sm:text-base sm:mt-4"
                onClick={() => {
                  handleExamCreation(subj);
                }}
              >
                {isExamCreating ? "Creating..." : "Create Exam"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center text-sm sm:text-base">
          You are not assigned to any subjects yet.
        </p>
      )}
    </div>
  );
};

export default CreateExam;
