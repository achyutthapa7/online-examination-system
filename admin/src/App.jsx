import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Notfound from "./components/Notfound";
// import DashboardLayout from "./components/DashboardLayout";
import AllTeacher from "./components/AllTeachers";
import DashboardLayout from "./components/Dashboard";
import AllStudents from "./components/AllStudents";
import AssignSubjects from "./components/AssignSubjects";
import VerifyStudents from "./components/VerifyStudents";
import DeleteUsers from "./components/DeleteUsers";
import UpdateUserPassword from "./components/UpdateUserPassword";
import NotifyUser from "./components/NotifyUser";
import AddTeachers from "./components/AddTeachers";
import ViewExams from "./components/ViewExams";
import ExamDetails from "./components/ExamDetails";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        <Route path="/admin/login" element={<Login />} />

        <Route path="/admin" element={<DashboardLayout />}>
          <Route
            path="dashboard"
            element={<div>Welcome to the Dashboard</div>}
          />
          <Route path="teachers" element={<AllTeacher />} />
          <Route path="students" element={<AllStudents />} />
          <Route path="assign-subject" element={<AssignSubjects />} />
          <Route path="verify-students" element={<VerifyStudents />} />
          <Route path="delete-users" element={<DeleteUsers />} />
          <Route path="update-user-password" element={<UpdateUserPassword />} />
          <Route path="notify-user" element={<NotifyUser />} />
          <Route path="add-teacher" element={<AddTeachers />} />
          <Route path="view-exams" element={<ViewExams />} />
          <Route path="/admin/view-exams/:examId" element={<ExamDetails />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
};

export default App;
