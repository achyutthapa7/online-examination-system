/* eslint-disable react/prop-types */

const Subject = ({ subject }) => {
  return (
    <div className="flex flex-col items-start justify-between px-8 py-4 rounded-lg shadow-md bg-white min-h-[160px] transition hover:shadow-lg">
      <h2 className="mb-2 text-2xl font-semibold ">{subject.subject}</h2>
      <button
        className="px-4 py-2 w-1/2 mt-4 text-white transition bg-green-600 rounded hover:bg-green-700"
        onClick={() => {
          alert("Left To Do");
          // navigate(`/dashboard/student/take-exam/${examId}`);
        }}
      >
        Details
      </button>
    </div>
  );
};

export default Subject;
