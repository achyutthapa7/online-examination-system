import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { subjectsData } from "../../utils/subjects";

import Subject from "../Subject";
import { getYearAndSemester } from "../../utils/api";
const Courses = () => {
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("login_token");
  useEffect(() => {
    // console.log(localStorage.getItem("username"));

    const getStudent = async () => {
      const response = await getYearAndSemester(
        localStorage.getItem("username")
      );

      const subjects = subjectsData.filter((subject) => {
        return (
          subject.year === response.data.year &&
          subject.semester === response.data.semester
        );
      });
      setSubjects(subjects);
    };
    getStudent();
  }, []);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getYearAndSemester().then((res) => setCourses(res.data));
  }, []);

  return subjects.length > 0 ? (
    <div className="w-full h-full p-12 bg-gray-100">
      <h1 className="mb-6 text-4xl font-bold ">Courses</h1>

      <div className="grid w-full h-full grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3 ">
        {subjects.map((subject, index) => (
          <Subject subject={subject} key={index} />
        ))}
      </div>
    </div>
  ) : (
    <div>
      <h1>No courses available</h1>
    </div>
  );
};

export default Courses;
