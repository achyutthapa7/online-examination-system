import React from "react";
import { useNavigate } from "react-router-dom";

const Subject = ({ subject }) => {
  const navigate = useNavigate();
  const examId = "675fde6b1c5ea5f765d0c9ff";

  // console.log(subject, "subject");

  return (
    <div className="gap-3 p-4 bg-red-500 border-2 border-green-700 rounded-lg h-[200px] items-between justify-between flex flex-col   ">
      <h2 className="mb-2 text-2xl font-semibold text-green-700 ">
        {subject.subject}
      </h2>
      {/* <p className="text-gray-600">
        <strong>Subject:</strong> {subject}
      </p>
      <p className="text-gray-600">
        <strong>Year:</strong> {subject} | <strong>Semester:</strong> {subject}
      </p>
      <p className="text-gray-600">
        <strong>Time Limit:</strong> 12 minutes
      </p> */}
      <button
        className="px-4 py-2 w-1/2 mt-4 text-white transition bg-green-600 rounded hover:bg-green-700"
        // onClick={() => navigate(`/dashboard/student/take-exam/${examId}`)}
        // onClick={jpaitei}
      >
        Start Exam
      </button>
    </div>
  );
};

export default Subject;
