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
import Results from "./components/student/Results";
import ExamPage from "./components/student/ExamPage";
import Courses from "./components/student/Courses";
import SavedExams from "./components/teacher/SavedExams";
import Continue from "./components/teacher/Continue";
import CompletedExams from "./components/student/CompletedExams";
import PastExams from "./components/student/PastExams";
import ExamDetails from "./components/student/ExamDetails";
import ResetPassword from "./components/ResetPassword";
import Submissions from "./components/teacher/Submissions";
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
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/dashboard/teacher/" element={<TeacherDashboard />}>
          <Route path="create-exam" element={<CreateExam />} />
          <Route path="view-exams" element={<ViewExams />} />
          <Route path="saved-exams" element={<SavedExams />} />
          <Route path="submissions" element={<Submissions />} />
        </Route>
        <Route
          path="/dashboard/teacher/create-exam/:subject"
          element={<CreateExamBySubject />}
        />
        <Route
          path="/dashboard/teacher/saved-exams/continue"
          element={<Continue />}
        />
        <Route path="/dashboard/student" element={<StudentDashboard />}>
          <Route path="/dashboard/student/courses" element={<Courses />} />
          <Route path="take-exam" element={<TakeExam />} />
          <Route path="past-exams" element={<PastExams />} />
          <Route path="past-exams/:id" element={<ExamDetails />} />
          <Route path="results" element={<Results />} />
          <Route path="completed-exam" element={<CompletedExams />} />
        </Route>
        <Route
          path="/dashboard/student/take-exam/:examId"
          element={<ExamPage />}
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
};

export default App;

// import React, { useEffect, useState } from "react";

// const App = () => {
//   const [questions, setQuestions] = useState(["A", "B", "C", "D"]);
//   const [question, setQuestion] = useState(questions[0]);
//   const [index, setIndex] = useState(0);
//   const length = questions.length;

//   useEffect(() => {
//     if (length > index) {
//       setQuestion(questions[index]);
//       console.log(questions[index]);
//     }
//   }, [index]);
//   const handleNext = () => {
//     setIndex((index) => index + 1);
//   };
//   return (
//     <div>
//       {/* <div className="border-2 w-80 h-40 bg-black"></div> */}
//       {question}
//       <button onClick={handleNext}>next</button>
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from "react";

// const itemsPerPage = 5;

// const PaginatedList = ({ data }) => {
//   const [currentPage, setCurrentPage] = useState(1);

//   // Calculate the index range for the current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   // Handle page changes
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div>
//       <h2>Paginated List</h2>
//       <ul>
//         {currentItems.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>

//       <div>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => paginate(i + 1)}
//             style={{
//               margin: "0 5px",
//               backgroundColor: currentPage === i + 1 ? "#4CAF50" : "",
//             }}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PaginatedList;
