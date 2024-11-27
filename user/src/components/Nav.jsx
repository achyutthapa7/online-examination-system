import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          EduPortal
        </Link>
        <div className="space-x-4">
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
        </div>
      </div>
    </nav>
  );
};

export default Nav;
