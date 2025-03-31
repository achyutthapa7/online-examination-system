// import React, { useEffect, useState } from "react";
// import { getStudentExams, nextExams } from "../../utils/api";
// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

// const TakeExam = () => {
//   const [exams, setExams] = useState([]);
//   const [upcomingExams, setUpcomingExams] = useState([]);
//   const navigate = useNavigate();
//   const [isStartingExam, setIsStartingExam] = useState(false);
//   const currentTime = new Date().getTime();
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["studentExams"],
//     queryFn: getStudentExams,
//     refetchInterval: 1000,
//     refetchOnWindowFocus: true,
//     staleTime: 1000 * 60 * 5,
//     onSuccess: (data) => {
//       const filteredExams = (data.data.exams || []).filter((exam) => {
//         const startTime = new Date(exam.startTime).getTime();
//         const endTime = new Date(exam.endTime).getTime();
//         return currentTime >= startTime && currentTime <= endTime; // Ongoing exams only
//       });
//       setExams(filteredExams);
//     },
//   });

//   const {
//     data: upcomingData,
//     isLoading: isUpcomingLoading,
//     error: upcomingError,
//   } = useQuery({
//     queryKey: ["upcomingExams"],
//     queryFn: nextExams,
//     refetchInterval: 2000,
//     refetchOnWindowFocus: true,
//     staleTime: 1000 * 60 * 5,
//     onSuccess: (data) => {
//       setUpcomingExams(data.data.exams || []);
//     },
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div className="min-h-screen p-8 bg-gray-100">
//       <h1 className="mb-6 text-4xl font-bold text-green-700">
//         Available Exams
//       </h1>

//       {exams.length === 0 ? (
//         <div className="text-center text-gray-600">No available exams.</div>
//       ) : (
//         <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
//           {exams.map((exam) => (
//             <div
//               key={exam._id}
//               className="p-6 bg-white border border-gray-200 rounded-lg shadow-md"
//             >
//               <h2 className="mb-2 text-2xl font-semibold text-green-700">
//                 {exam.title}
//               </h2>
//               <p className="text-gray-600">
//                 <strong>Subject:</strong> {exam.subject}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Year:</strong> {exam.year} | <strong>Semester:</strong>{" "}
//                 {exam.semester}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Time Limit:</strong> {exam.timeLimit} minutes
//               </p>
//               <button
//                 disabled={isStartingExam}
//                 className="px-4 py-2 mt-4 text-white transition bg-green-600 rounded hover:bg-green-700"
//                 onClick={() => {
//                   setIsStartingExam(true);
//                   navigate(exam._id, { state: exam });
//                 }}
//               >
//                 {isStartingExam ? "starting..." : "Start Exam"}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       <h1 className="mb-6 text-4xl font-bold text-blue-700">Upcoming Exams</h1>

//       {upcomingExams.length === 0 ? (
//         <div className="text-center text-gray-600">No upcoming exams.</div>
//       ) : (
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {upcomingExams.map((exam) => (
//             <div
//               key={exam._id}
//               className="p-6 bg-white border border-gray-200 rounded-lg shadow-md"
//             >
//               <h2 className="mb-2 text-2xl font-semibold text-blue-700">
//                 {exam.title}
//               </h2>
//               <p className="text-gray-600">
//                 <strong>Subject:</strong> {exam.subject}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Year:</strong> {exam.year} | <strong>Semester:</strong>{" "}
//                 {exam.semester}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Exam Date:</strong> {exam.examDate}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TakeExam;

import React, { useEffect, useState } from "react";
import { getStudentExams, nextExams } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const TakeExam = () => {
  const [exams, setExams] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const navigate = useNavigate();
  const [isStartingExam, setIsStartingExam] = useState(false);
  const currentTime = new Date().getTime();
  const { data, isLoading, error } = useQuery({
    queryKey: ["studentExams"],
    queryFn: getStudentExams,
    refetchInterval: 1000,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    onSuccess: (data) => {
      const filteredExams = (data.data.exams || []).filter((exam) => {
        const startTime = new Date(exam.startTime).getTime();
        const endTime = new Date(exam.endTime).getTime();
        return currentTime >= startTime && currentTime <= endTime; // Ongoing exams only
      });
      setExams(filteredExams);
    },
  });

  const {
    data: upcomingData,
    isLoading: isUpcomingLoading,
    error: upcomingError,
  } = useQuery({
    queryKey: ["upcomingExams"],
    queryFn: nextExams,
    refetchInterval: 2000,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    onSuccess: (data) => {
      setUpcomingExams(data.data.exams || []);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen p-4 bg-gray-100 sm:p-6 md:p-8">
      {/* Available Exams Section */}
      <div className="mb-12">
        <h1 className="mb-4 text-2xl font-bold text-green-700 sm:text-3xl md:text-4xl">
          Available Exams
        </h1>

        {exams.length === 0 ? (
          <div className="p-4 text-center text-gray-600 bg-white rounded-lg shadow">
            No available exams at this time.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => (
              <div
                key={exam._id}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6"
              >
                <h2 className="mb-2 text-xl font-semibold text-green-700 sm:text-2xl">
                  {exam.title}
                </h2>
                <div className="space-y-2 text-sm text-gray-600 sm:text-base">
                  <p>
                    <span className="font-medium">Subject:</span> {exam.subject}
                  </p>
                  <p>
                    <span className="font-medium">Year:</span> {exam.year} |{" "}
                    <span className="font-medium">Semester:</span>{" "}
                    {exam.semester}
                  </p>
                  <p>
                    <span className="font-medium">Time Limit:</span>{" "}
                    {exam.timeLimit} minutes
                  </p>
                </div>
                <button
                  disabled={isStartingExam}
                  className="w-full px-4 py-2 mt-4 text-white transition bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  onClick={() => {
                    setIsStartingExam(true);
                    navigate(exam._id, { state: exam });
                  }}
                >
                  {isStartingExam ? "Starting..." : "Start Exam"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Exams Section */}
      <div>
        <h1 className="mb-4 text-2xl font-bold text-blue-700 sm:text-3xl md:text-4xl">
          Upcoming Exams
        </h1>

        {upcomingExams.length === 0 ? (
          <div className="p-4 text-center text-gray-600 bg-white rounded-lg shadow">
            No upcoming exams scheduled.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingExams.map((exam) => (
              <div
                key={exam._id}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6"
              >
                <h2 className="mb-2 text-xl font-semibold text-blue-700 sm:text-2xl">
                  {exam.title}
                </h2>
                <div className="space-y-2 text-sm text-gray-600 sm:text-base">
                  <p>
                    <span className="font-medium">Subject:</span> {exam.subject}
                  </p>
                  <p>
                    <span className="font-medium">Year:</span> {exam.year} |{" "}
                    <span className="font-medium">Semester:</span>{" "}
                    {exam.semester}
                  </p>
                  <p>
                    <span className="font-medium">Exam Date:</span>{" "}
                    {exam.examDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeExam;
