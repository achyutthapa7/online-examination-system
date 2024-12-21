const SubjectModal = ({
  title,
  subjectData,
  availableSemesters,
  availableSubjects,
  onYearChange,
  onSemesterChange,
  onSubjectChange,
  onClose,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/4 p-6 bg-white rounded shadow-lg">
        {/* Modal Title */}
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>

        {/* Year Dropdown */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Year</label>
          <select
            className="w-full px-4 py-2 border rounded"
            value={subjectData.year}
            onChange={onYearChange}
          >
            <option value="">Select Year</option>
            {[1, 2, 3, 4].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Semester Dropdown */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Semester</label>
          <select
            className="w-full px-4 py-2 border rounded"
            value={subjectData.semester}
            onChange={onSemesterChange}
            disabled={!subjectData.year}
          >
            <option value="">Select Semester</option>
            {availableSemesters.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Dropdown */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Subject</label>
          <select
            className="w-full px-4 py-2 border rounded"
            value={subjectData.subject}
            onChange={onSubjectChange}
            disabled={!subjectData.semester}
          >
            <option value="">Select Subject</option>
            {availableSubjects.map((sub) => (
              <option key={sub.subject} value={sub.subject}>
                {sub.subject}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={onSubmit}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectModal;
