import React, { useEffect, useState } from "react";
import {
  getAllStudents,
  getAllTeachers,
  updateUserPassword,
} from "../utils/api";

const UpdateUserPassword = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  // Fetch all teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await getAllTeachers();
        setTeachers(res.data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };
    fetchTeachers();
  }, []);

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getAllStudents();
        setStudents(res.data);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    setNewPassword(e.target.value);
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      setError("Password is required.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      // Handle password update logic (API call)
      await updateUserPassword(selectedUser._id, newPassword);
      alert("Password updated successfully!");
      setSelectedUser(null);
      setNewPassword("");
    } catch (err) {
      console.error("Error updating password:", err);
      alert("Failed to update password.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Update User Password
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Teachers Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Teachers</h2>
          {teachers.length === 0 ? (
            <p className="text-gray-500">No teachers available.</p>
          ) : (
            teachers.map((teacher) => (
              <div
                key={teacher._id}
                className="flex justify-between items-center border-b pb-2 mb-2"
              >
                <div>
                  <p className="text-gray-800 font-medium">
                    {teacher.fullName}
                  </p>
                  <p className="text-gray-600 text-sm">{teacher.userName}</p>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => setSelectedUser(teacher)}
                >
                  Update Password
                </button>
              </div>
            ))
          )}
        </div>

        {/* Students Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Students</h2>
          {students.length === 0 ? (
            <p className="text-gray-500">No students available.</p>
          ) : (
            students.map((student) => (
              <div
                key={student._id}
                className="flex justify-between items-center border-b pb-2 mb-2"
              >
                <div>
                  <p className="text-gray-800 font-medium">
                    {student.fullName}
                  </p>
                  <p className="text-gray-600 text-sm">{student.userName}</p>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => setSelectedUser(student)}
                >
                  Update Password
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for Updating Password */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Update Password
            </h2>
            <p className="text-gray-700 mb-4">
              Updating password for{" "}
              <span className="font-medium">{selectedUser.fullName}</span>
            </p>
            <form onSubmit={handleSubmit}>
              {/* New Password Field */}
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter new password"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 text-red-600 text-sm font-semibold">
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 mr-2"
                  onClick={() => setSelectedUser(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateUserPassword;
