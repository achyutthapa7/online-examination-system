// import React, { useState, useEffect } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import {
//   FaBars,
//   FaBook,
//   FaCheckCircle,
//   FaFileAlt,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { Tooltip as ReactTooltip } from "react-tooltip";
// import { useQuery } from "@tanstack/react-query";
// import { handleLogout } from "../Nav";
// import { API_URL } from "../../utils/api";

// const fetchUserData = async () => {
//   const response = await fetch(`${API_URL}/student/me`, {
//     method: "GET",
//     credentials: "include",
//   });

//   if (!response.ok) {
//     throw new Error("User not found or deleted");
//   }

//   return response.json();
// };

// const SidebarItem = ({ icon: Icon, label, link, isExpanded }) => (
//   <Link
//     to={link}
//     className="flex items-center w-full px-4 py-3 text-gray-200 transition hover:bg-green-600 focus:bg-green-600"
//     data-tooltip-id={label}
//   >
//     <Icon className="text-xl" />
//     {isExpanded && <span className="ml-4 text-sm font-medium">{label}</span>}
//     <ReactTooltip id={label} place="right" effect="solid" />
//   </Link>
// );

// const StudentDashboard = () => {
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("login_token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//     } else if (role !== "Student") {
//       navigate("/unauthorized");
//     }
//   }, [token, role, navigate]);

//   const { data, error, isLoading, refetch } = useQuery({
//     queryKey: ["userData"],
//     queryFn: fetchUserData,
//     retry: false,
//     // staleTime: 0, // Immediately consider the data stale
//     // cacheTime: 1000 * 60 * 5,
//     // refetch: true,
//   });
//   console.log(error);
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <h1 className="text-2xl font-semibold text-gray-600">Loading...</h1>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//         <h1 className="text-2xl font-semibold text-red-600">
//           You cannot access this page.
//         </h1>
//         <p className="text-gray-700 mt-2">
//           Your account may have been deleted or there was an error fetching your
//           data.
//         </p>
//         <button
//           onClick={() => refetch()}
//           className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
//         >
//           Try Again
//         </button>
//         <button
//           onClick={handleLogout}
//           className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//         >
//           Logout
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside
//         className={`bg-green-700 text-white ${
//           isSidebarOpen ? "w-64" : "w-16"
//         } transition-all duration-300 ease-in-out flex flex-col`}
//       >
//         <div className="flex items-center justify-between p-4">
//           {isSidebarOpen && (
//             <Link to={"/dashboard/student"}>
//               <h2 className="text-2xl font-bold cursor-pointer">
//                 Student Panel
//               </h2>
//             </Link>
//           )}
//           <button
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             className="text-2xl text-white focus:outline-none"
//             data-tooltip-id="sidebar-toggle"
//           >
//             <FaBars />
//           </button>
//           <ReactTooltip id="sidebar-toggle" content="Toggle Sidebar" />
//         </div>

//         {/* Sidebar Navigation */}
//         <nav className="mt-4 space-y-2 flex-1">
//           <SidebarItem
//             icon={FaFileAlt}
//             label="My Exams"
//             link="take-exam"
//             isExpanded={isSidebarOpen}
//           />
//           <SidebarItem
//             icon={FaCheckCircle}
//             label="Results"
//             link="results"
//             isExpanded={isSidebarOpen}
//           />
//           <SidebarItem
//             icon={FaBook}
//             label="Courses"
//             link="courses"
//             isExpanded={isSidebarOpen}
//           />
//           <SidebarItem
//             icon={FaCheckCircle}
//             label="Completed Exams"
//             link="completed-exam"
//             isExpanded={isSidebarOpen}
//           />
//         </nav>

//         <div className="p-4">
//           <ReactTooltip id="logout" content="Logout" />
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         <h1 className="mb-6 text-3xl font-semibold text-green-700">
//           Welcome to the Student Dashboard
//         </h1>
//         <p className="mb-6 text-lg text-gray-700">
//           Access your exams and view your results from the sidebar.
//         </p>

//         {/* Content Outlet */}
//         <div className="p-6 bg-white rounded-lg shadow-lg">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default StudentDashboard;

import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBook,
  FaCheckCircle,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useQuery } from "@tanstack/react-query";
import { handleLogout } from "../Nav";
import { API_URL } from "../../utils/api";

const fetchUserData = async () => {
  const response = await fetch(`${API_URL}/student/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("User not found or deleted");
  }

  return response.json();
};

const SidebarItem = ({ icon: Icon, label, link, isExpanded }) => (
  <Link
    to={link}
    className="flex items-center w-full px-4 py-3 text-gray-200 transition hover:bg-green-600 focus:bg-green-600"
    data-tooltip-id={label}
  >
    <Icon className="text-xl" />
    {isExpanded && <span className="ml-4 text-sm font-medium">{label}</span>}
    <ReactTooltip id={label} place="right" effect="solid" />
  </Link>
);

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("login_token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (role !== "Student") {
      navigate("/unauthorized");
    }
  }, [token, role, navigate]);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-600">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold text-red-600">
          You cannot access this page.
        </h1>
        <p className="text-gray-700 mt-2">
          Your account may have been deleted or there was an error fetching your
          data.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
        >
          Try Again
        </button>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Added fixed and h-full classes */}
      <aside
        className={`bg-green-700 text-white ${
          isSidebarOpen ? "w-64" : "w-16"
        } fixed h-full transition-all duration-300 ease-in-out flex flex-col z-10`}
      >
        <div className="flex items-center justify-between p-4">
          {isSidebarOpen && (
            <Link to={"/dashboard/student"}>
              <h2 className="text-2xl font-bold cursor-pointer">
                Student Panel
              </h2>
            </Link>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl text-white focus:outline-none"
            data-tooltip-id="sidebar-toggle"
          >
            <FaBars />
          </button>
          <ReactTooltip id="sidebar-toggle" content="Toggle Sidebar" />
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-4 space-y-2 flex-1">
          <SidebarItem
            icon={FaFileAlt}
            label="My Exams"
            link="take-exam"
            isExpanded={isSidebarOpen}
          />
          <SidebarItem
            icon={FaCheckCircle}
            label="Results"
            link="results"
            isExpanded={isSidebarOpen}
          />
          <SidebarItem
            icon={FaBook}
            label="Courses"
            link="courses"
            isExpanded={isSidebarOpen}
          />
          <SidebarItem
            icon={FaCheckCircle}
            label="Completed Exams"
            link="completed-exam"
            isExpanded={isSidebarOpen}
          />
        </nav>

        <div className="p-4">
          <ReactTooltip id="logout" content="Logout" />
        </div>
      </aside>

      {/* Main Content - Added margin-left to account for sidebar width */}
      <main
        className={`flex-1 p-8 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        } transition-all duration-300 ease-in-out`}
      >
        <h1 className="mb-6 text-3xl font-semibold text-green-700">
          Welcome to the Student Dashboard
        </h1>
        <p className="mb-6 text-lg text-gray-700">
          Access your exams and view your results from the sidebar.
        </p>

        {/* Content Outlet */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
