/* eslint-disable react/prop-types */

const Subject = ({ subject }) => {
  return (
    <div className="flex flex-col items-start justify-between px-8 py-4 rounded-lg shadow-md bg-white min-h-[160px] transition hover:shadow-lg">
      <h2 className="mb-2 text-2xl font-semibold ">{subject.subject}</h2>
    </div>
  );
};

export default Subject;
