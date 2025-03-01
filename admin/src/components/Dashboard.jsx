import { useEffect, useState } from "react";
import { isAuthenticated } from "../utils/isAuthenticated";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaKey,
  FaPlus,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";

// eslint-disable-next-line react/prop-types
const SidebarItem = ({ icon: Icon, label, onClick, isExpanded }) => (
  <button
    className="relative flex items-center w-full px-4 py-3 text-gray-300 transition hover:bg-gray-700 focus:bg-gray-700"
    onClick={onClick}
    data-tip={label}
    data-place="right"
  >
    <Icon className="text-xl" />
    {isExpanded && <span className="ml-4 text-sm font-medium">{label}</span>}
  </button>
);

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 800);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/admin/login");
    }
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 800) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`bg-gray-800 text-white ${
          isSidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 ease-in-out`}
      >
        <div
          className={`flex items-center p-4 ${
            isSidebarOpen ? "justify-between" : "justify-center"
          }`}
        >
          {isSidebarOpen && (
            <h2
              onClick={() => navigate("/admin/dashboard")}
              className="text-2xl font-bold transition-opacity duration-300 cursor-pointer"
            >
              Admin
            </h2>
          )}
          {window.innerWidth > 800 && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-2xl text-white focus:outline-none"
              data-tip={isSidebarOpen ? "Collapse" : "Expand"}
            >
              <FaBars />
            </button>
          )}
        </div>

        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <SidebarItem
                icon={FaChalkboardTeacher}
                label="Teachers"
                onClick={() => navigate("/admin/teachers")}
                isExpanded={isSidebarOpen}
              />
            </li>
            <li>
              <SidebarItem
                icon={FaUserGraduate}
                label="Students"
                onClick={() => navigate("/admin/students")}
                isExpanded={isSidebarOpen}
              />
            </li>
            <li>
              <SidebarItem
                icon={FaKey}
                label="Update Password"
                onClick={() => navigate("/admin/update-user-password")}
                isExpanded={isSidebarOpen}
              />
            </li>
            <li>
              <SidebarItem
                icon={FaPlus}
                label="Add Teacher"
                onClick={() => navigate("/admin/add-teacher")}
                isExpanded={isSidebarOpen}
              />
            </li>
            <li>
              <SidebarItem
                icon={FaClipboardList}
                label="View Exams"
                onClick={() => navigate("/admin/view-exams")}
                isExpanded={isSidebarOpen}
              />
            </li>
          </ul>
        </nav>

        <div className="p-4">
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                handleLogout();
              }
            }}
            className={`w-full py-2 rounded-md hover:bg-red-700 transition flex items-center justify-center ${
              isSidebarOpen ? "bg-red-600 text-white" : "bg-red-600"
            }`}
            data-tip="Logout"
          >
            {isSidebarOpen ? (
              <span className="text-white">Logout</span>
            ) : (
              <FaSignOutAlt className="text-xl text-white" />
            )}
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>

      <ReactTooltip effect="solid" place="right" />
    </div>
  );
};

export default DashboardLayout;
