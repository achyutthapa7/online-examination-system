import React, { useEffect, useState } from "react";
import { registration } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableSemesters, setAvailableSemesters] = useState([]);

  useEffect(() => {
    if (registration_token) {
      navigate("/verifying");
    } else {
      setLoading(false);
    }
  }, [registration_token, navigate]);

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

    if (name === "year") {
      const selectedYear = parseInt(value);
      setAvailableSemesters(getSemestersForYear(selectedYear));
      setFormData({ ...formData, year: value, semester: "" }); // Reset semester
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.userName || !formData.password) {
      toast.warn("Please fill in all required fields.");
      return;
    }
    if (!formData.year || !formData.semester) {
      toast.warn("Please select a valid year and semester.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await registration(
        formData.fullName,
        formData.userName,
        formData.password,
        parseInt(formData.year),
        parseInt(formData.semester)
      );

      if (res.statusText) {
        toast.success("User registered successfully!");
        localStorage.setItem("registration_token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.student));

        setFormData({
          fullName: "",
          userName: "",
          password: "",
          year: "",
          semester: "",
        });

        navigate("/verifying");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Registration
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              User Name
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Year
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Year</option>
              {[1, 2, 3, 4].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Semester
            </label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              disabled={!availableSemesters.length}
              required
            >
              <option value="">Select Semester</option>
              {availableSemesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
