import React, { useEffect, useState } from "react";
import {
  deleteUser,
  getAllTeachers,
  assignSubjectToTeacher,
} from "../utils/api";
import { subjectsData } from "../utils/subjects";

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [subjectData, setSubjectData] = useState({
    year: "",
    semester: "",
    subject: "",
  });
  const [availableSemesters, setAvailableSemesters] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);

  useEffect(() => {
    const getTeacher = async () => {
      try {
        const res = await getAllTeachers();
        setTeachers(res.data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };
    getTeacher();
  }, [teachers]);

  const handleDelete = async (teacherId) => {
    try {
      const res = await deleteUser(teacherId);
      if (res.status === 200) {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Error deleting teacher:", err);
      alert("Failed to delete teacher.");
    }
  };

  const getSemestersForYear = (year) => {
    const semesters = {
      1: [1, 2],
      2: [3, 4],
      3: [5, 6],
      4: [7, 8],
    };
    return semesters[year] || [];
  };

  const getSubjectsForYearAndSemester = (year, semester) => {
    return subjectsData.filter(
      (subject) =>
        subject.year === parseInt(year) &&
        subject.semester === parseInt(semester)
    );
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSubjectData((prevData) => ({
      ...prevData,
      year,
      semester: "",
      subject: "",
    }));
    const semesters = getSemestersForYear(year);
    setAvailableSemesters(semesters);
    setAvailableSubjects([]);
  };

  const handleSemesterChange = (e) => {
    const semester = e.target.value;
    setSubjectData((prevData) => ({ ...prevData, semester, subject: "" }));
    const subjects = getSubjectsForYearAndSemester(subjectData.year, semester);
    setAvailableSubjects(subjects);
  };

  const handleSubjectChange = (e) => {
    const { value } = e.target;
    setSubjectData((prevData) => ({ ...prevData, subject: value }));
  };

  const handleAssignSubject = async () => {
    if (!subjectData.year || !subjectData.semester || !subjectData.subject) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await assignSubjectToTeacher(
        selectedTeacher._id,
        parseInt(subjectData.year),
        parseInt(subjectData.semester),
        subjectData.subject
      );
      if (res.status === 200) {
        alert("Subject assigned successfully!");
        setSubjectData({ year: "", semester: "", subject: "" });
        setSelectedTeacher(null);
        setIsLoading(false);
      } else if (res.status === 401) {
        alert("subject is already assigned!");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error assigning subject:", err);
      alert("Failed to assign subject.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Teachers</h1>

      {teachers.length === 0 ? (
        <p className="text-xl text-gray-600">No teachers available</p>
      ) : (
        teachers.map((teacher) => (
          <div
            key={teacher._id}
            className="flex flex-col md:flex-row items-start mb-8 bg-white p-4 rounded-lg shadow-md"
          >
            {/* Teacher Info */}
            <div className="flex-1 mb-4 md:mb-0">
              <div className="text-lg font-semibold text-gray-800">
                {teacher.fullName}
              </div>
              <div className="text-sm text-gray-600">
                Username: {teacher.userName}
              </div>
              <div className="text-sm text-gray-600">Role: {teacher.role}</div>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDelete(teacher._id)}
              >
                Delete
              </button>
              <button
                className="mt-4 ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => setSelectedTeacher(teacher)}
              >
                Assign Subject
              </button>
            </div>

            {/* Assigned Subjects */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Assigned Subjects
              </h3>
              {teacher.assignedSubjects &&
              teacher.assignedSubjects.length > 0 ? (
                <ul className="list-disc list-inside">
                  {teacher.assignedSubjects.map((sub) => (
                    <li key={sub._id} className="text-sm text-gray-600">
                      <span className="font-medium">{sub.subject}</span> (Year:{" "}
                      {sub.year}, Semester: {sub.semester})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No subjects assigned.</p>
              )}
            </div>
          </div>
        ))
      )}

      {/* Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Assign Subject</h2>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Year</label>
              <select
                className="w-full border px-4 py-2 rounded"
                value={subjectData.year}
                onChange={handleYearChange}
              >
                <option value="">Select Year</option>
                {[1, 2, 3, 4].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2">Semester</label>
              <select
                className="w-full border px-4 py-2 rounded"
                value={subjectData.semester}
                onChange={handleSemesterChange}
                disabled={!subjectData.year}
              >
                <option value="">Select Semester</option>
                {availableSemesters.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2">Subject</label>
              <select
                className="w-full border px-4 py-2 rounded"
                value={subjectData.subject}
                onChange={handleSubjectChange}
                disabled={!subjectData.semester}
              >
                <option value="">Select Subject</option>
                {availableSubjects.map((sub) => (
                  <option key={sub.subject} value={sub.subject}>
                    {sub.subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 mr-2"
                onClick={() => setSelectedTeacher(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleAssignSubject}
              >
                {isLoading ? "Loading" : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTeachers;
