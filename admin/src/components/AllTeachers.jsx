import { useEffect, useState } from "react";
import {
  deleteUser,
  getAllTeachers,
  assignSubjectToTeacher,
  editAssignSubjectToTeacher,
} from "../utils/api";
import { subjectsData } from "../utils/subjects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editAssignSubjectModal, setEditAssignSubjectModal] = useState(false);
  const [subjectData, setSubjectData] = useState({
    year: "",
    semester: "",
    subject: "",
  });

  const [editedSubjectData, setEditedSubjectData] = useState({
    editedYear: "",
    editedSemester: "",
    editedSubject: "",
  });

  const [availableSemesters, setAvailableSemesters] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [assignSubjectId, setAssignSubjectId] = useState("");

  useEffect(() => {
    const getTeacher = async () => {
      try {
        const res = await getAllTeachers();
        setTeachers(res.data);
        setFilteredTeachers(res.data); // Initially show all teachers
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };
    getTeacher();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = teachers.filter(
        (teacher) =>
          teacher.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          teacher.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          teacher.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTeachers(filtered);
    } else {
      setFilteredTeachers(teachers); // Reset the filtered list when searchQuery is empty
    }
  }, [searchQuery, teachers]);

  const handleDelete = async (teacherId) => {
    try {
      const res = await deleteUser(teacherId);
      if (res.status === 200) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 250,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.reload();
      }
    } catch (err) {
      console.error("Error deleting teacher:", err);
      toast.error("Failed to delete teacher.", {
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
  };

  const getSemestersForYear = (year) => {
    const semesters = {
      1: [1, 2],
      2: [3, 4],
      3: [5, 6],
      4: [7, 8],
    };
    return semesters[year] || [];
  };

  const getSubjectsForYearAndSemester = (year, semester) => {
    return subjectsData.filter(
      (subject) =>
        subject.year === parseInt(year) &&
        subject.semester === parseInt(semester)
    );
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSubjectData((prevData) => ({
      ...prevData,
      year,
      semester: "",
      subject: "",
    }));
    setEditedSubjectData((prevData) => ({
      ...prevData,
      editedYear: year,
      editedSemester: "",
      editedSubject: "",
    }));
    const semesters = getSemestersForYear(year || editedSubjectData.editedYear);
    setAvailableSemesters(semesters);
    setAvailableSubjects([]);
  };

  const handleSemesterChange = (e) => {
    const semester = e.target.value;
    selectedTeacher &&
      setSubjectData((prevData) => ({ ...prevData, semester, subject: "" }));
    editAssignSubjectModal &&
      setEditedSubjectData((prevData) => ({
        ...prevData,
        editedSemester: semester,
        editedSubject: "",
      }));

    const subjects = getSubjectsForYearAndSemester(
      subjectData.year || editedSubjectData.editedYear,
      semester
    );
    setAvailableSubjects(subjects);
  };

  const handleSubjectChange = (e) => {
    const { value } = e.target;
    setSubjectData((prevData) => ({ ...prevData, subject: value }));
    setEditedSubjectData((prevData) => ({
      ...prevData,
      editedSubject: value,
    }));
  };

  const handleAssignSubject = async () => {
    if (!subjectData.year || !subjectData.semester || !subjectData.subject) {
      toast.warn("Please fill out all fields.", {
        position: "top-right",
        autoClose: 250,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      setIsLoading(true);
      const res = await assignSubjectToTeacher(
        selectedTeacher._id,
        parseInt(subjectData.year),
        parseInt(subjectData.semester),
        subjectData.subject
      );
      if (res.status === 200) {
        toast.success("Subject assigned successfully!", {
          position: "top-right",
          autoClose: 250,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSubjectData({ year: "", semester: "", subject: "" });
        setSelectedTeacher(null);
        setIsLoading(false);
        window.location.reload();
      } else if (res.status === 401) {
        toast.warn("Subject is already assigned!", {
          position: "top-right",
          autoClose: 250,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error assigning subject:", err);
      toast.error("Failed to assign subject.", {
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
      setIsLoading(false);
    }
  };

  const handleEditAssignSubject = async () => {
    try {
      const res = await editAssignSubjectToTeacher(
        assignSubjectId,
        parseInt(editedSubjectData.editedYear),
        parseInt(editedSubjectData.editedSemester),
        editedSubjectData.editedSubject
      );
      if (res.status === 200 || res.status === 201) {
        toast.success("Subject edited successfully!", {
          position: "top-right",
          autoClose: 250,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEditedSubjectData({
          editedYear: "",
          editedSemester: "",
          editedSubject: "",
        });
        setEditAssignSubjectModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error editing assigned subject:", error);
      toast.error("Failed to edit assigned subject.", {
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
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl">All Teachers</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, username, or role"
          className="w-full px-4 py-2 text-sm border rounded sm:text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredTeachers.length === 0 ? (
        <p className="text-lg text-gray-600 sm:text-xl">
          No teachers available
        </p>
      ) : (
        <div className="space-y-4">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher._id}
              className="flex flex-col p-4 bg-white rounded-lg shadow-md md:flex-row"
            >
              {/* Teacher Info */}
              <div className="flex-1 mb-4 md:mb-0 md:pr-4">
                <div className="text-base font-semibold text-gray-800 sm:text-lg">
                  {teacher.fullName}
                </div>
                <div className="text-xs text-gray-600 sm:text-sm">
                  Username: {teacher.userName}
                </div>
                <div className="text-xs text-gray-600 sm:text-sm">
                  Role: {teacher.role}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    className="px-3 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600 sm:px-4 sm:py-2 sm:text-sm"
                    onClick={() => {
                      if (window.confirm("Do you want to delete the user?"))
                        handleDelete(teacher._id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="px-3 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 sm:px-4 sm:py-2 sm:text-sm"
                    onClick={() => setSelectedTeacher(teacher)}
                  >
                    Assign Subject
                  </button>
                </div>
              </div>

              {/* Assigned Subjects */}
              <div className="flex-1">
                <h3 className="mb-2 text-base font-semibold text-gray-700 sm:text-lg">
                  Assigned Subjects
                </h3>
                {teacher.assignedSubjects &&
                teacher.assignedSubjects.length > 0 ? (
                  <ul className="space-y-1 text-xs sm:text-sm">
                    {teacher.assignedSubjects.map((sub) => (
                      <li key={sub._id} className="text-gray-600">
                        <span className="font-medium">{sub.subject}</span>{" "}
                        (Year: {sub.year}, Semester: {sub.semester})
                        <button
                          className="ml-1 text-blue-500 underline sm:ml-2"
                          onClick={() => {
                            setEditedSubjectData({
                              editedYear: "",
                              editedSemester: "",
                              editedSubject: "",
                            });
                            const semesters = getSemestersForYear(sub.year);
                            const subjects = getSubjectsForYearAndSemester(
                              sub.year,
                              sub.semester
                            );
                            setAvailableSemesters(semesters);
                            setAvailableSubjects(subjects);
                            setEditAssignSubjectModal(true);
                            setAssignSubjectId(sub._id);
                          }}
                        >
                          Edit
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-500 sm:text-sm">
                    No subjects assigned.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal - Responsive */}
      {(selectedTeacher || editAssignSubjectModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-11/12 p-4 mx-2 bg-white rounded shadow-lg sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
            <h2 className="mb-3 text-xl font-bold sm:text-2xl">
              {selectedTeacher ? "Assign Subject" : "Edit Assign Subject"}
            </h2>
            <div className="mb-3">
              <label className="block mb-1 text-sm font-semibold sm:text-base">
                Year
              </label>
              <select
                className="w-full px-3 py-1 text-sm border rounded sm:px-4 sm:py-2 sm:text-base"
                value={
                  selectedTeacher
                    ? subjectData.year
                    : editedSubjectData.editedYear
                }
                onChange={handleYearChange}
              >
                <option value="">Select Year</option>
                {[1, 2, 3, 4].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-sm font-semibold sm:text-base">
                Semester
              </label>
              <select
                className="w-full px-3 py-1 text-sm border rounded sm:px-4 sm:py-2 sm:text-base"
                value={
                  selectedTeacher
                    ? subjectData.semester
                    : editedSubjectData.editedSemester
                }
                onChange={handleSemesterChange}
                disabled={!subjectData.year || !editedSubjectData.editedYear}
              >
                <option value="">Select Semester</option>
                {availableSemesters.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-semibold sm:text-base">
                Subject
              </label>
              <select
                className="w-full px-3 py-1 text-sm border rounded sm:px-4 sm:py-2 sm:text-base"
                value={
                  selectedTeacher
                    ? subjectData.subject
                    : editedSubjectData.editedSubject
                }
                onChange={handleSubjectChange}
                disabled={
                  selectedTeacher
                    ? !subjectData.semester
                    : !editedSubjectData.editedSemester
                }
              >
                <option value="">Select Subject</option>
                {availableSubjects.map((sub) => (
                  <option key={sub.subject} value={sub.subject}>
                    {sub.subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              <button
                className="px-3 py-1 text-sm text-gray-800 bg-gray-300 rounded hover:bg-gray-400 sm:px-4 sm:py-2"
                onClick={() => {
                  setSelectedTeacher(null);
                  setEditAssignSubjectModal(false);
                  setSubjectData({
                    year: "",
                    semester: "",
                    subject: "",
                  });
                }}
              >
                Cancel
              </button>

              {selectedTeacher ? (
                <button
                  className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 sm:px-4 sm:py-2"
                  onClick={handleAssignSubject}
                >
                  {isLoading ? "Loading..." : "Assign"}
                </button>
              ) : (
                <button
                  className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 sm:px-4 sm:py-2"
                  onClick={handleEditAssignSubject}
                >
                  {isLoading ? "Loading..." : "Update"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTeachers;
