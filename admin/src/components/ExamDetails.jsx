import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login, startExam } from "../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ExamDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [exam, setExam] = useState(state);

  // useEffect(() => {}, []);

  // Function to handle starting the exam
  const handleStartExam = async () => {
    try {
      const res = await startExam(exam._id);
      if (res.statusText === "OK") {
        toast.success("Exam started successfully", {
          position: "top-right",
          autoClose: 1350,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setExam({ ...exam, isApproved: true });
      } else {
        toast.error("Failed to start the exam", {
          position: "top-right",
          autoClose: 1350,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error starting exam:", error);
      toast.error("Error starting the exam", {
        position: "top-right",
        autoClose: 1350,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h2 className="mb-6 text-3xl font-semibold text-center">{exam.title}</h2>
      <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <p className="text-lg font-medium text-gray-700">
          Subject: {exam.subject}
        </p>
        <p className="text-lg font-medium text-gray-700">Year: {exam.year}</p>
        <p className="text-lg font-medium text-gray-700">
          Semester: {exam.semester}
        </p>
        <p className="text-lg font-medium text-gray-700">
          Time Limit: {exam.timeLimit} minutes
        </p>
        <p
          className={`text-lg font-medium ${
            exam.isApproved ? "text-green-500" : "text-red-500"
          }`}
        >
          Status: {exam.isApproved ? "Approved" : "Pending"}
        </p>
      </div>
      <div className="flex justify-center mb-6">
        <button
          onClick={handleStartExam}
          className={`bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors ${
            exam.isApproved ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={exam.isApproved}
        >
          {exam.isApproved ? "Exam Already Started" : "Start Exam"}
        </button>
      </div>
      <div>
        <h3 className="mb-4 text-2xl font-semibold">Questions</h3>
      </div>
    </div>
  );
};

export default ExamDetails;

// <div className="max-w-4xl p-6 mx-auto">
//   {/* Exam Title */}
//   <h2 className="mb-6 text-3xl font-semibold text-center">{exam.title}</h2>

//   {/* Exam Details */}
//   <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-lg">
//     <p className="text-lg font-medium text-gray-700">
//       Subject: {exam.subject}
//     </p>
//     <p className="text-lg font-medium text-gray-700">Year: {exam.year}</p>
//     <p className="text-lg font-medium text-gray-700">
//       Semester: {exam.semester}
//     </p>
//     <p className="text-lg font-medium text-gray-700">
//       Time Limit: {exam.timeLimit} minutes
//     </p>
//     <p
//       className={`text-lg font-medium ${
//         exam.isApproved ? "text-green-500" : "text-red-500"
//       }`}
//     >
//       Status: {exam.isApproved ? "Approved" : "Pending"}
//     </p>
//   </div>

//   {/* Start Exam Button */}
//   <div className="flex justify-center mb-6">
//     <button
//       onClick={handleStartExam}
//       className={`bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors ${
//         exam.isApproved ? "cursor-not-allowed opacity-50" : ""
//       }`}
//       disabled={exam.isApproved}
//     >
//       {exam.isApproved ? "Exam Already Started" : "Start Exam"}
//     </button>
//   </div>

//   {/* Questions Section */}
//   <div>
//     <h3 className="mb-4 text-2xl font-semibold">Questions</h3>
//     <div className="space-y-6">
//       {exam.questions.map((question, index) => (
//         <div
//           key={question._id}
//           className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
//         >
//           <h4 className="mb-2 text-xl font-semibold">
//             {index + 1}. {question.questionText}
//           </h4>
//           <div className="space-y-2">
//             {question.options.map((option, optionIndex) => (
//               <div key={optionIndex} className="flex items-center">
//                 <input
//                   type="radio"
//                   id={`question-${index}-option-${optionIndex}`}
//                   name={`question-${index}`}
//                   value={optionIndex + 1}
//                   disabled
//                   className="mr-2"
//                   checked={
//                     question.options[question.correctAnswer - 1] == option
//                   }
//                 />

//                 <label
//                   htmlFor={`question-${index} option-${optionIndex}`}
//                   className="text-gray-600"
//                 >
//                   {option}
//                 </label>
//               </div>
//             ))}
//           </div>
//           <p className="mt-4 text-sm text-gray-600">
//             {"Correct Answer:  " +
//               question.options[question.correctAnswer - 1]}
//           </p>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>

// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { login, startExam } from "../utils/api";

// const ExamDetails = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [exam, setExam] = useState(state);

//   // Function to handle starting the exam
//   const handleStartExam = async () => {
//     try {
//       const res = await startExam(exam._id);
//       if (res.statusText === "OK") {
//         alert("Exam started successfully");
//         setExam({ ...exam, isApproved: true });
//       } else {
//         alert("Failed to start the exam");
//       }
//     } catch (error) {
//       console.error("Error starting exam:", error);
//       alert("Error starting the exam");
//     }
//   };

//   return (
//     <div className="max-w-4xl p-6 mx-auto">
//       {/* Exam Title */}
//       <h2 className="mb-6 text-3xl font-semibold text-center">{exam.title}</h2>

//       {/* Exam Details */}
//       <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-lg">
//         <p className="text-lg font-medium text-gray-700">
//           Subject: {exam.subject}
//         </p>
//         <p className="text-lg font-medium text-gray-700">Year: {exam.year}</p>
//         <p className="text-lg font-medium text-gray-700">
//           Semester: {exam.semester}
//         </p>
//         <p className="text-lg font-medium text-gray-700">
//           Time Limit: {exam.timeLimit} minutes
//         </p>
//         <p
//           className={`text-lg font-medium ${
//             exam.isApproved ? "text-green-500" : "text-red-500"
//           }`}
//         >
//           Status: {exam.isApproved ? "Approved" : "Pending"}
//         </p>
//       </div>

//       {/* Start Exam Button */}
//       <div className="flex justify-center mb-6">
//         <button
//           onClick={handleStartExam}
//           className={`bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors ${
//             exam.isApproved ? "cursor-not-allowed opacity-50" : ""
//           }`}
//           disabled={exam.isApproved}
//         >
//           {exam.isApproved ? "Exam Already Started" : "Start Exam"}
//         </button>
//       </div>

//       {/* Questions Section */}
//       <div>
//         <h3 className="mb-4 text-2xl font-semibold">Questions</h3>
//         <div className="space-y-6">
//           {exam.questions.map((question, index) => (
//             <div
//               key={question._id}
//               className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
//             >
//               <h4 className="mb-2 text-xl font-semibold">
//                 {index + 1}. {question.questionText}
//               </h4>
//               <div className="space-y-2">
//                 {question.options.map((option, optionIndex) => (
//                   <div key={optionIndex} className="flex items-center">
//                     <input
//                       type="radio"
//                       id={`question-${index}-option-${optionIndex}`}
//                       name={`question-${index}`}
//                       value={optionIndex + 1}
//                       disabled
//                       className="mr-2"
//                       checked={
//                         question.options[question.correctAnswer - 1] == option
//                       }
//                     />

//                     <label
//                       htmlFor={`question-${index} option-${optionIndex}`}
//                       className="text-gray-600"
//                     >
//                       {option}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//               <p className="mt-4 text-sm text-gray-600">
//                 {"Correct Answer:  " +
//                   question.options[question.correctAnswer - 1]}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExamDetails;
