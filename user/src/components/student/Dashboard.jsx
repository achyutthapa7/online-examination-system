import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";

const SidebarItem = ({ icon: Icon, label, link, isExpanded }) => (
  <Link
    to={link}
    className="flex items-center w-full px-4 py-3 text-gray-200 transition hover:bg-green-600 focus:bg-green-600"
    data-tip={label}
    data-place="right"
  >
    <Icon className="text-xl" />
    {isExpanded && <span className="ml-4 text-sm font-medium">{label}</span>}
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

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("login_token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-green-700 text-white ${
          isSidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 ease-in-out`}
      >
        <div
          className={`flex items-center p-4 ${
            isSidebarOpen ? "justify-between" : "justify-center"
          }`}
        >
          {isSidebarOpen && (
            <Link to={"/dashboard/student"}>
              {" "}
              <h2 className="text-2xl font-bold cursor-pointer">
                Student Panel
              </h2>
            </Link>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl text-white focus:outline-none"
            data-tip={isSidebarOpen ? "Collapse" : "Expand"}
          >
            <FaBars />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-4 space-y-2">
          <SidebarItem
            icon={FaInfoCircle}
            label="My Exams"
            link="take-exam"
            isExpanded={isSidebarOpen}
          />
          <SidebarItem
            icon={FaInfoCircle}
            label="Results"
            link="results"
            isExpanded={isSidebarOpen}
          />
          <SidebarItem
            icon={FaInfoCircle}
            label="Courses"
            link="courses"
            isExpanded={isSidebarOpen}
          />
          <SidebarItem
            icon={FaInfoCircle}
            label="Completed Exams"
            link="completed-exam"
            isExpanded={isSidebarOpen}
          />
          <SidebarItem
            icon={FaInfoCircle}
            label="Past Exams"
            link="past-exams"
            isExpanded={isSidebarOpen}
          />
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full py-2 text-white transition bg-red-600 rounded-md hover:bg-red-700"
            data-tip="Logout"
          >
            <FaSignOutAlt className="text-xl" />
            {isSidebarOpen && <span className="ml-2">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="mb-6 text-3xl font-semibold text-green-700">
          Welcome to the Student Dashboard
        </h1>
        <p className="mb-6 text-lg text-gray-700">
          Access your exams and view your results from the sidebar.
        </p>

        {/* Content Outlet */}
        <div className="p-6 bg-white rounded-lg shadow-lg ">
          <Outlet />
        </div>
      </main>

      {/* Tooltip Initialization */}
      <ReactTooltip effect="solid" place="right" />
    </div>
  );
};

export default StudentDashboard;
