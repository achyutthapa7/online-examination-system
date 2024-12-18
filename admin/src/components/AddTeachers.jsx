import React, { useEffect, useState } from "react";
import { subjectsData } from "../utils/subjects";
import { addTeacher } from "../utils/api";

// Provided subjects JSON data
const AddTeachers = () => {
  const [formData, setFormData] = useState({
    emailAddress: "",
    userName: "",
    password: "",
    fullName: "",
  });
  //missing require fields
  const { emailAddress, userName, password, fullName } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [isAdded, setIsAdded] = useState(false);

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    if (!emailAddress || !userName || !password || !fullName) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsAdded(true);
      const res = await addTeacher(emailAddress, userName, password, fullName);

      if (res.statusText) {
        alert("teacher added successfully");
        setFormData({
          emailAddress: "",
          userName: "",
          password: "",
          fullName: "",
        });
      }

      if (res.status === 400) {
        alert("Teacher already exist");
      }
    } catch (error) {
      console.error("Error adding teacher:", error.message);
    } finally {
      setIsAdded(false);
    }
  };

  // Function to get valid semesters for the selected year
  // const getSemestersForYear = (year) => {
  //   const semesters = {
  //     1: [1, 2],
  //     2: [3, 4],
  //     3: [5, 6],
  //     4: [7, 8],
  //   };
  //   return semesters[year] || [];
  // };

  // Function to get subjects based on selected year and semester
  // const getSubjectsForYearAndSemester = (year, semester) => {
  //   return subjectsData.filter(
  //     (subject) =>
  //       subject.year === parseInt(year) &&
  //       subject.semester === parseInt(semester)
  //   );
  // };
  // const handleSubjectChange = (e) => {
  //   const { value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, subject: value }));
  // };
  return (
    <div className="max-w-xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-semibold text-center ">Add Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="emailAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="text"
            id="emailAddress"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter user name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter full name"
          />
        </div>

        {/* <div className="mb-4">
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700"
          >
            Year
          </label>
          <select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select year</option>
            {[1, 2, 3, 4].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div> */}

        {/* <div className="mb-4">
          <label
            htmlFor="semester"
            className="block text-sm font-medium text-gray-700"
          >
            Semester
          </label>
          <select
            id="semester"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!formData.year}
          >
            <option value="">Select semester</option>
            {getSemestersForYear(formData.year).map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div> */}

        {/* Subjects Section with checkboxes */}
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Subjects
          </label>
          <div className="p-3 mt-2 border border-gray-300 rounded-md shadow-sm">
            <div className="flex flex-wrap gap-4">
              {getSubjectsForYearAndSemester(
                formData.year,
                formData.semester
              ).map((subject, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={subject.subject}
                    name="subject"
                    value={subject.subject}
                    onChange={handleSubjectChange}
                    className="mr-2"
                  />
                  <label htmlFor={subject.subject}>{subject.subject}</label>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        <div className="mb-4">
          {console.log(isAdded)}
          <button
            disabled={isAdded}
            type="submit"
            className={`w-full p-3  text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 ${
              isAdded ? "bg-gray-600 hover:bg-gray-700 cursor-not-allowed" : ""
            }  focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {isAdded ? "Adding Teacher" : "Add Teacher"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeachers;
