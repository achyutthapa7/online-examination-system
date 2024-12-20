import React from "react";

import { useNavigate } from "react-router-dom";

const Subject = ({ subject }) => {
  const navigate = useNavigate();
  const examId = "675fde6b1c5ea5f765d0c9ff";

  return (
    <div className="flex flex-col items-start justify-between px-8 py-4 rounded-lg shadow-md bg-white min-h-[160px] transition hover:shadow-lg">
      <h2 className="mb-2 text-2xl font-semibold ">{subject.subject}</h2>
      {/* <button
        className="px-4 py-2 w-1/2 mt-4 text-white transition bg-green-600 rounded hover:bg-green-700"
        onClick={() => navigate(`/dashboard/student/take-exam/${examId}`)}
      >
        Start Exam
      </button> */}
    </div>
  );
};

export default Subject;
