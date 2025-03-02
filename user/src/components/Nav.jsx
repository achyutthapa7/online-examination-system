import React from "react";
import { Link } from "react-router-dom";

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

const Nav = () => {
  const login_token = localStorage.getItem("login_token");
  const userName = localStorage.getItem("username") || "User";
  const role = localStorage.getItem("role");

  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          EduPortal
        </Link>
        <div className="space-x-4 flex items-center">
          {login_token ? (
            <>
              <Link
                to={`/dashboard${role === "Teacher" ? "/teacher" : "/student"}`}
              >
                <div
                  className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
                  title={userName}
                >
                  {getInitial(userName)}
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className=" justify-center w-full py-2 px-4 text-white transition bg-red-600 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-blue-500 font-semibold hover:text-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
export { handleLogout };
