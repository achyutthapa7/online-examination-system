import React, { useEffect, useState } from "react";
import { deleteUser, getAllStudents, verifyStudent } from "../utils/api"; // Assume this fetches student data
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await getAllStudents();
      setStudents(res.data);
    };
    fetchStudents();
  }, []);
  const handleVerify = async (studentId) => {
    const res = await verifyStudent(studentId);
    if (res.statusText)
      toast.success("User is verified", {
        position: "top-right",
        autoClose: 250,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    window.location.reload();
  };
  const handleDelete = async (studentId) => {
    const res = await deleteUser(studentId);
    if (res.statusText) {
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 250,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    window.location.reload();
  };
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">All Students</h1> 
      {students.length === 0 ? (
        <p className="text-xl text-gray-600">No students available</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-left text-gray-600 ">
                  Full Name
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-left text-gray-600">
                  Username
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-left text-gray-600">
                  Year
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-left text-gray-600">
                  Semester
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-left text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm   text-gray-800">
                    <span className="cursor-pointer">{student.fullName}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {student.userName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {student.year}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {student.semester}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {student.isVerified ? (
                      <button
                        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                        onClick={() => {
                          if (window.confirm("Do you want to delete the user?"))
                            handleDelete(student._id);
                        }}
                      >
                        Delete
                      </button>
                    ) : (
                      <div className="flex  w-fit gap-4">
                        <button
                          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                          onClick={() => handleVerify(student._id)}
                        >
                          Verify
                        </button>
                        <button
                          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                          onClick={() => {
                            if (
                              window.confirm("Do you want to delete the user?")
                            )
                              handleDelete(student._id);
                          }}
                        >
                          Reject
                        </button>
                      </div>
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
