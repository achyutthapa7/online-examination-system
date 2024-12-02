import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Nav from "./components/Nav";
import Waiting from "./components/Waiting";
import TeacherDashboard from "./components/teacher/Dashboard";
import StudentDashboard from "./components/student/Dashboard";
import Notfound from "./components/Notfound";
import CreateExam from "./components/teacher/CreateExam";
import TakeExam from "./components/student/TakeExam";
import CreateExamBySubject from "./components/teacher/CreateExamBySubject";
import ViewExams from "./components/teacher/ViewExams";
const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student_dashboard" element={<StudentDashboard />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/verifying" element={<Waiting />} />
        <Route path="/dashboard/teacher/" element={<TeacherDashboard />}>
          <Route path="create-exam" element={<CreateExam />} />
          <Route path="view-exams" element={<ViewExams />} />
        </Route>
        <Route
          path="/dashboard/teacher/create-exam/:subject"
          element={<CreateExamBySubject />}
        />

        <Route path="/dashboard/student" element={<StudentDashboard />}>
          <Route path="take-exam" element={<TakeExam />} />
        </Route>

        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
};

export default App;
