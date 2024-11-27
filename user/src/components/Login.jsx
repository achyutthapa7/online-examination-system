import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkVerificationStatus } from "../utils/checkVerificationStatus";
import { login } from "../utils/api";

const Login = () => {
  const registeredUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const data = useLocation();
  console.log(data);
  useEffect(() => {
    const checkVerification = async () => {
      try {
        const res = await checkVerificationStatus(registeredUser._id);
        if (res.ok) {
          const data = await res.json();
          if (data && data.user.role === "Student" && !data.user.isVerified) {
            navigate("/verifying");
          }
        } else {
          console.error("Failed to check verification status");
        }
      } catch (error) {
        console.error("Error checking verification status:", error);
      }
    };
    checkVerification();
  }, [registeredUser, navigate]);

  const [credentials, setCredentials] = useState({
    userName: data.state?.userName || "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, password } = credentials;
    try {
      if (!userName || !password) {
        alert("Both fields are required.");
        return;
      }
      const res = await login(userName, password, registeredUser?.role);

      if (res.statusText) {
        alert("login successfull");
        localStorage.removeItem("registration_token");
        const { student, teacher } = res.data;
        if (student?.role === "Student") {
          window.location.href = "/student-dashboard";
        } else if (teacher?.role === "Teacher") {
          window.location.href = "/teacher-dashboard";
        } else {
          alert("Invalid role");
          return;
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* userName */}
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              userName
            </label>
            <input
              disabled={data.state ? true : false}
              type="text"
              id="userName"
              name="userName"
              value={credentials.userName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your userName"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-red-600 text-sm font-semibold">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold"
          >
            Login
          </button>
        </form>

        {/* Additional Options */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
