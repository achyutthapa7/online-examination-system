import React, { useEffect, useState } from "react";
import { registration } from "../utils/api";
import { useNavigate } from "react-router-dom";
const Registration = () => {
  const registration_token = localStorage.getItem("registration_token");

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    password: "",
    year: "",
    semester: "",
  });
  const [loading, setLoading] = useState(true);
  const [availableSemesters, setAvailableSemesters] = useState([]);
  useEffect(() => {
    if (registration_token) {
      window.location.href = "/verifying";
    } else {
      setLoading(false);
    }
  }, [registration_token]);

  const getSemestersForYear = (year) => {
    const semesters = {
      1: [1, 2],
      2: [3, 4],
      3: [5, 6],
      4: [7, 8],
    };
    return semesters[year] || [];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update year and dynamically adjust semesters
    if (name === "year") {
      const selectedYear = parseInt(value);
      const semesters = getSemestersForYear(selectedYear);
      setAvailableSemesters(semesters);
      setFormData({ ...formData, year: value, semester: "" }); // Reset semester when year changes
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.userName || !formData.password) {
      alert("Please fill required fields.");
      return;
    }
    if (!formData.year || !formData.semester) {
      alert("Please select a valid year and semester.");
      return;
    }
    try {
      const res = await registration(
        formData.fullName,
        formData.userName,
        formData.password,
        parseInt(formData.year),
        parseInt(formData.semester)
      );
      if (res.statusText) {
        alert("User registered successfully!");
        setFormData({
          fullName: "",
          userName: "",
          password: "",
          year: "",
          semester: "",
        });

        localStorage.setItem("registration_token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.student));
        window.location.href = "/verifying";
      } else if (res.status === 409) {
        alert("Username already exists");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred while registering user.");
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700">Redirecting...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Registration
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter full name"
            />
          </div>

          {/* User Name */}
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              User Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter username"
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
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
            />
          </div>

          {/* Year */}
          <div className="mb-4">
            <label
              htmlFor="year"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Year
            </label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Year</option>
              {[1, 2, 3, 4].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Semester */}
          <div className="mb-4">
            <label
              htmlFor="semester"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Semester
            </label>
            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={!availableSemesters.length}
            >
              <option value="">Select Semester</option>
              {availableSemesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;