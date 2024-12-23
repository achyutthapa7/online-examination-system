import React, { useEffect, useState } from "react";
import { login } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/isAuthenticated";
const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated()) navigate("/admin/dashboard");
  }, [navigate]);
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await login(userName, password);
      if (res.statusText) {
        setIsLoading(false);
        alert(res.data.message);
        localStorage.setItem("token", JSON.stringify(res.data.token));

        navigate("/admin/dashboard");
      } else {
        alert("Internal server error");
        setIsLoading(false);
      }
    } catch (error) {
      if (error.status === 400) {
        alert("Missing required fields");
      }
      if (error.status === 401) {
        alert("Invalid Credentials");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="userName"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none border-gray-300"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)} // Set username state
            />
          </div>
          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none border-gray-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Set password state
            />
          </div>
          {/* Submit Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
