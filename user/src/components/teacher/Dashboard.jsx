import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaPlus, FaListAlt, FaSignOutAlt } from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useQuery } from "@tanstack/react-query";

const fetchUserData = async () => {
  const response = await fetch("http://localhost:4000/api/teacher/me", {
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
    className="flex items-center w-full px-4 py-3 text-gray-200 transition hover:bg-blue-600 focus:bg-blue-600"
    data-tooltip-id={label}
  >
    <Icon className="text-xl" />
    {isExpanded && <span className="ml-4 text-sm font-medium">{label}</span>}
    <ReactTooltip id={label} place="right" effect="solid" />
  </Link>
);

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("login_token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (role !== "Teacher") {
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
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-blue-700 text-white ${
          isSidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 ease-in-out flex flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          {isSidebarOpen && (
            <Link to={"/dashboard/teacher"}>
              <h2 className="text-2xl font-bold cursor-pointer">
                Teacher Panel
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
            icon={FaPlus}
            label="Create Exam"
            link="create-exam"
            isExpanded={isSidebarOpen}
          />
          <SidebarItem
            icon={FaListAlt}
            label="View Exam"
            link="view-exams"
            isExpanded={isSidebarOpen}
          />
          <SidebarItem
            icon={FaListAlt}
            label="Exam Submissions"
            link="submissions"
            isExpanded={isSidebarOpen}
          />
          <SidebarItem
            icon={FaListAlt}
            label="Saved Exam"
            link="saved-exams"
            isExpanded={isSidebarOpen}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="mb-6 text-3xl font-semibold text-blue-700">
          Welcome to the Teacher Dashboard
        </h1>
        <p className="mb-6 text-lg text-gray-700">
          Manage your exams and submissions from the sidebar.
        </p>

        {/* Content Outlet */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
