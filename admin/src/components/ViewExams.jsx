// import { useEffect, useState } from "react";
// import { allExams, startExam } from "../utils/api";
// import { FaClipboardList } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// const ViewExams = () => {
//   const [exams, setExams] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getExams = async () => {
//       try {
//         const res = await allExams();
//         const publishedExams = res.data.filter((exam) => exam.isPublished); // Only keep published exams
//         setExams(publishedExams);
//       } catch (error) {
//         console.error("Error fetching exams:", error);
//       }
//     };

//     getExams();
//   }, []);

//   // Function to handle starting the exam
//   const handleStartExam = async (examId) => {
//     try {
//       const exam = exams.filter((exam) => exam._id == examId);
//       const res = await startExam(examId, exam[0].timeLimit);
//       if (res.status === 200 || res.status === 201) {
//         toast.success("Exam started successfully", {
//           position: "top-right",
//           autoClose: 250,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });

//         // Update the exam status in the state
//         setExams((prevExams) =>
//           prevExams.map((exam) =>
//             exam._id === examId ? { ...exam, isApproved: true } : exam
//           )
//         );
//       } else {
//         toast.error("Failed to start the exam", {
//           position: "top-right",
//           autoClose: 250,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//       }
//     } catch (error) {
//       console.error("Error starting exam:", error);
//       toast.error("Error starting the exam", {
//         position: "top-right",
//         autoClose: 250,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//   };

//   return (
//     <div className="container p-6 mx-auto">
//       <h1 className="flex items-center mb-4 text-2xl font-bold">
//         <FaClipboardList className="mr-2" /> Available Exams
//       </h1>

//       {exams.length === 0 ? (
//         <p>No exams available.</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {exams.map((exam) => (
//             <div key={exam._id} className="p-4 border rounded shadow-md">
//               <h2 className="mb-2 text-xl font-semibold">{exam.title}</h2>
//               <p>
//                 <strong>Subject:</strong> {exam.subject}
//               </p>
//               <p>
//                 <strong>Year:</strong> {exam.year}
//               </p>
//               <p>
//                 <strong>Semester:</strong> {exam.semester}
//               </p>
//               <p>
//                 <strong>Time Limit:</strong> {exam.timeLimit} minutes
//               </p>

//               <div className="mt-4">
//                 <button
//                   onClick={() => navigate(exam._id, { state: exam })}
//                   className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//                 >
//                   View Exam Details
//                 </button>

//                 {/* Show Start Exam button only if the exam is not approved */}
//                 {!exam.isApproved && (
//                   <button
//                     className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
//                     onClick={() => handleStartExam(exam._id)}
//                   >
//                     Start Exam
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewExams;


import { useEffect, useState } from "react";
import { allExams, startExam } from "../utils/api";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(null); // Track loading state for each exam
  const navigate = useNavigate();

  useEffect(() => {
    const getExams = async () => {
      try {
        const res = await allExams();
        const publishedExams = res.data.filter((exam) => exam.isPublished); // Only keep published exams
        setExams(publishedExams);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    getExams();
  }, []);

  // Function to handle starting the exam
  const handleStartExam = async (examId) => {
    setLoading(examId); // Set the loading state for the exam being started
    try {
      const exam = exams.filter((exam) => exam._id === examId);
      const res = await startExam(examId, exam[0].timeLimit);
      if (res.status === 200 || res.status === 201) {
        toast.success("Exam started successfully", {
          position: "top-right",
          autoClose: 250,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // Update the exam status in the state
        setExams((prevExams) =>
          prevExams.map((exam) =>
            exam._id === examId ? { ...exam, isApproved: true } : exam
          )
        );
      } else {
        toast.error("Failed to start the exam", {
          position: "top-right",
          autoClose: 250,
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
        autoClose: 250,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(null); // Reset loading state after the request completes
    }
  };

  return (
    <div className="container p-6 mx-auto">
      <h1 className="flex items-center mb-4 text-2xl font-bold">
        <FaClipboardList className="mr-2" /> Available Exams
      </h1>

      {exams.length === 0 ? (
        <p>No exams available.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <div key={exam._id} className="p-4 border rounded shadow-md">
              <h2 className="mb-2 text-xl font-semibold">{exam.title}</h2>
              <p>
                <strong>Subject:</strong> {exam.subject}
              </p>
              <p>
                <strong>Year:</strong> {exam.year}
              </p>
              <p>
                <strong>Semester:</strong> {exam.semester}
              </p>
              <p>
                <strong>Time Limit:</strong> {exam.timeLimit} minutes
              </p>

              <div className="mt-4">
                <button
                  onClick={() => navigate(exam._id, { state: exam })}
                  className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  View Exam Details
                </button>

                {/* Show Start Exam button only if the exam is not approved */}
                {!exam.isApproved && (
                  <button
                    className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                    onClick={() => handleStartExam(exam._id)}
                    disabled={loading === exam._id} // Disable button while loading
                  >
                    {loading === exam._id ? (
                      <span className="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-5 h-5 mr-2"></span>
                    ) : (
                      "Start Exam"
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewExams;
