import React, { useEffect, useState } from "react";
import { assignSubjectToTeacher, getAllTeachers } from "../utils/api";
import AllTeachers from "./AllTeachers";

const AssignSubjects = () => {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const getTeacher = async () => {
      const res = await getAllTeachers();
      setTeachers(res.data);
    };
    getTeacher();
  }, []);

  return (
    <div>
      {teachers.map((teacher) => (
        <div key={teacher._id}>
          <p>{teacher.emailAddress}</p>
          <p>{teacher.userName}</p>
          <p>{teacher.fullName}</p>
          {teacher.isAssigned ? (
            <button>delete</button>
          ) : (
            <button>assign</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AssignSubjects;
