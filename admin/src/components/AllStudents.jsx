// import { useEffect, useState } from "react";
// import { deleteUser, getAllStudents, verifyStudent } from "../utils/api";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AllStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const fetchStudents = async () => {
//       const res = await getAllStudents();
//       setStudents(res.data);
//       setFilteredStudents(res.data);
//     };
//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     if (searchQuery) {
//       const filtered = students.filter(
//         (student) =>
//           student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           student.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           student.year.toString().includes(searchQuery) ||
//           student.semester.toString().includes(searchQuery)
//       );
//       setFilteredStudents(filtered);
//     } else {
//       setFilteredStudents(students);
//     }
//   }, [searchQuery, students]);

//   const handleVerify = async (studentId) => {
//     const res = await verifyStudent(studentId);
//     if (res.status === 200 || res.status === 201)
//       toast.success("User is verified", {
//         position: "top-right",
//         autoClose: 250,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     window.location.reload();
//   };

//   const handleDelete = async (studentId) => {
//     const res = await deleteUser(studentId);
//     if (res.status === 200 || res.status === 201) {
//       toast.success(res.data.message, {
//         position: "top-right",
//         autoClose: 250,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       window.location.reload();
//     }
//   };

//   return (
//     <div className="p-8">
//       <h1 className="mb-6 text-3xl font-bold">All Students</h1>

//       <div className="mb-4">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search students..."
//           className="px-4 py-2 border rounded w-full"
//         />
//       </div>

//       {filteredStudents.length === 0 ? (
//         <p className="text-xl text-gray-600">No students available</p>
//       ) : (
//         <div className="overflow-x-auto bg-white rounded-lg shadow-md">
//           <table className="min-w-full table-auto">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-3 text-sm font-semibold text-left text-gray-600 ">
//                   Full Name
//                 </th>
//                 <th className="px-4 py-3 text-sm font-semibold text-left text-gray-600">
//                   Username
//                 </th>
//                 <th className="px-4 py-3 text-sm font-semibold text-left text-gray-600">
//                   Year
//                 </th>
//                 <th className="px-4 py-3 text-sm font-semibold text-left text-gray-600">
//                   Semester
//                 </th>
//                 <th className="px-4 py-3 text-sm font-semibold text-left text-gray-600">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredStudents.map((student) => (
//                 <tr key={student._id} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-3 text-sm text-gray-800">
//                     <span className="cursor-pointer">{student.fullName}</span>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-800">
//                     {student.userName}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-800">
//                     {student.year}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-800">
//                     {student.semester}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-800">
//                     {student.isVerified ? (
//                       <button
//                         className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
//                         onClick={() => {
//                           if (window.confirm("Do you want to delete the user?"))
//                             handleDelete(student._id);
//                         }}
//                       >
//                         Delete
//                       </button>
//                     ) : (
//                       <div className="flex w-fit gap-4">
//                         <button
//                           className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//                           onClick={() => handleVerify(student._id)}
//                         >
//                           Verify
//                         </button>
//                         <button
//                           className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
//                           onClick={() => {
//                             if (
//                               window.confirm("Do you want to delete the user?")
//                             )
//                               handleDelete(student._id);
//                           }}
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllStudents;

import { useEffect, useState } from "react";
import { deleteUser, getAllStudents, verifyStudent } from "../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingVerify, setLoadingVerify] = useState(""); // Loading state for verify button
  const [loadingDelete, setLoadingDelete] = useState(""); // Loading state for delete button

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await getAllStudents();
      setStudents(res.data);
      setFilteredStudents(res.data);
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = students.filter(
        (student) =>
          student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.year.toString().includes(searchQuery) ||
          student.semester.toString().includes(searchQuery)
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [searchQuery, students]);

  const handleVerify = async (studentId) => {
    setLoadingVerify(studentId); // Set loading for the specific student
    const res = await verifyStudent(studentId);
    if (res.status === 200 || res.status === 201)
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
    setLoadingVerify(""); // Reset loading state
    window.location.reload();
  };

  const handleDelete = async (studentId) => {
    setLoadingDelete(studentId); // Set loading for the specific student
    const res = await deleteUser(studentId);
    if (res.status === 200 || res.status === 201) {
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
      setLoadingDelete(""); // Reset loading state
      window.location.reload();
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl">All Students</h1>

      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search students..."
          className="w-full px-4 py-2 text-sm border rounded sm:text-base"
        />
      </div>

      {filteredStudents.length === 0 ? (
        <p className="text-lg text-gray-600 sm:text-xl">
          No students available
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-xs font-semibold text-left text-gray-600 sm:px-4 sm:py-3 sm:text-sm">
                  Full Name
                </th>
                <th className="px-3 py-2 text-xs font-semibold text-left text-gray-600 sm:px-4 sm:py-3 sm:text-sm">
                  Username
                </th>
                <th className="px-3 py-2 text-xs font-semibold text-left text-gray-600 sm:px-4 sm:py-3 sm:text-sm">
                  Year
                </th>
                <th className="px-3 py-2 text-xs font-semibold text-left text-gray-600 sm:px-4 sm:py-3 sm:text-sm">
                  Semester
                </th>
                <th className="px-3 py-2 text-xs font-semibold text-left text-gray-600 sm:px-4 sm:py-3 sm:text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-xs text-gray-800 whitespace-nowrap sm:px-4 sm:py-3 sm:text-sm">
                    <span className="cursor-pointer">{student.fullName}</span>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-800 whitespace-nowrap sm:px-4 sm:py-3 sm:text-sm">
                    {student.userName}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-800 whitespace-nowrap sm:px-4 sm:py-3 sm:text-sm">
                    {student.year}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-800 whitespace-nowrap sm:px-4 sm:py-3 sm:text-sm">
                    {student.semester}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-800 whitespace-nowrap sm:px-4 sm:py-3 sm:text-sm">
                    {student.isVerified ? (
                      <button
                        className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600 sm:px-3 sm:py-1.5 sm:text-sm"
                        onClick={() => {
                          if (window.confirm("Do you want to delete the user?"))
                            handleDelete(student._id);
                        }}
                      >
                        {loadingDelete === student._id ? (
                          <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                        ) : (
                          "Delete"
                        )}
                      </button>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 sm:px-3 sm:py-1.5 sm:text-sm"
                          onClick={() => handleVerify(student._id)}
                        >
                          {loadingVerify === student._id ? (
                            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                          ) : (
                            "Verify"
                          )}
                        </button>
                        <button
                          className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600 sm:px-3 sm:py-1.5 sm:text-sm"
                          onClick={() => {
                            if (
                              window.confirm("Do you want to delete the user?")
                            )
                              handleDelete(student._id);
                          }}
                        >
                          {loadingDelete === student._id ? (
                            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                          ) : (
                            "Reject"
                          )}
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
