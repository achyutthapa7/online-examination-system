import React, { useEffect, useState } from "react";
import { deleteUser, getAllStudents, verifyStudent } from "../utils/api"; // Assume this fetches student data

const AllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await getAllStudents();
      setStudents(res.data);
    };
    fetchStudents();
  }, [students]);
  const handleVerify = async (studentId) => {
    const res = await verifyStudent(studentId);
    if (res.statusText) alert("User is verified");
  };
  const handleDelete = async (studentId) => {
    const res = await deleteUser(studentId);
    if (res.statusText) {
      alert(res.data.message);
    }
  };
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Students</h1>

      {students.length === 0 ? (
        <p className="text-xl text-gray-600">No students available</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Full Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Year
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Semester
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {student.fullName}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {student.emailAddress}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {student.year}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {student.semester}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {student.isVerified ? (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => {
                          handleDelete(student._id);
                        }}
                      >
                        Delete
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => handleVerify(student._id)}
                      >
                        Verify
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllStudents;
