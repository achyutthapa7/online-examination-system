import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaInfoCircle,
  FaPlus,
  FaTrashAlt,
  FaListAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useEffect } from "react";

const SidebarItem = ({ icon: Icon, label, link, isExpanded }) => (
  <Link
    to={link}
    className="flex items-center px-4 py-3 hover:bg-blue-700 focus:bg-blue-700 transition text-gray-200 w-full"
    data-tip={label}
    data-place="right"
  >
    <Icon className="text-xl" />
    {isExpanded && <span className="ml-4 text-sm font-medium">{label}</span>}
  </Link>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("login_token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  if (role === "Student") {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-xl">
        Unauthorized Access
      </div>
    );
  }
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("login_token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      window.location.reload();
      window.location.href = "/login";
    }
  };
  return (
    <div className="flex h-screen bg-gray-100 justify-between">
      {/* Sidebar */}
      <aside
        className={`bg-blue-800 text-white ${
          isSidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 ease-in-out `}
      >
        {/* Sidebar Header */}
        <div
          className={`flex items-center p-4 ${
            isSidebarOpen ? "justify-between" : "justify-center"
          }`}
        >
          {isSidebarOpen && (
            <h2 className="text-2xl font-bold cursor-pointer">Dashboard</h2>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white text-2xl focus:outline-none"
            data-tip={isSidebarOpen ? "Collapse" : "Expand"} // Tooltip for sidebar toggle
          >
            <FaBars />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-4 space-y-2">
          <SidebarItem
            icon={FaPlus}
            label="Create Exam"
            link="create-exam"
            isExpanded={isSidebarOpen}
          />

          <SidebarItem
            icon={FaPlus}
            label="View Exam"
            link="view-exams"
            isExpanded={isSidebarOpen}
          />
          <SidebarItem
            icon={FaTrashAlt}
            label="Delete Exam"
            link="/delete-exam"
            isExpanded={isSidebarOpen}
          />
          <SidebarItem
            icon={FaListAlt}
            label="Exam Submissions"
            link="/submissions"
            isExpanded={isSidebarOpen}
          />
          <SidebarItem
            icon={FaListAlt}
            label="Saved Exam"
            link="saved-exams"
            isExpanded={isSidebarOpen}
          />
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className="w-full py-2 rounded-md hover:bg-red-700 transition flex items-center justify-center bg-red-600 text-white"
            data-tip="Logout" // Tooltip for logout button
          >
            <FaSignOutAlt className="text-xl" />
            {isSidebarOpen && <span className="ml-2">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold text-blue-800 mb-6">
          Welcome to the Dashboard
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Select an option from the sidebar to get started.
        </p>

        {/* Content Outlet */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <Outlet />
        </div>
      </main>

      {/* Tooltip Initialization */}
      <ReactTooltip effect="solid" place="right" />
    </div>
  );
};

export default Dashboard;
