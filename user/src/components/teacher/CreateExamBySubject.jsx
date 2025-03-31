import React, { useEffect, useState } from "react";
import {
  createQuestion,
  getExamById,
  publishExam,
  removeQuestions,
  saveExam,
  updateQuestion,
} from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
const CreateExamBySubject = () => {
  const [editModal, setEditModal] = useState(false);
  const [editedData, setEditedData] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
  const [isDeletingQuestion, setIsDeletingQuestion] = useState(false);
  const location = useLocation();
  const examId = location.state;
  const navigate = useNavigate();
  const [examData, setExamData] = useState({
    title: "",
    timeLimit: "",
    questions: [],
  });

  const [formData, setFormData] = useState({
    title: "",
    timeLimit: "",
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const [errors, setErrors] = useState({
    timeLimit: "",
    options: "",
  });

  const { title, timeLimit, questionText, options, correctAnswer } = formData;

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const res = await getExamById(examId);
        const exam = res.data;
        setExamData({
          title: exam.title,
          timeLimit: exam.timeLimit,
          questions: exam.questions,
        });
        setFormData({
          title: exam.title,
          timeLimit: exam.timeLimit,
          questionText: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        });
      } catch (error) {
        console.error("Error fetching exam data:", error);
      }
    };
    fetchExamData();
  }, [examId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (parseInt(timeLimit) <= 0) {
      errors.timeLimit = "Time limit must be a positive number.";
      valid = false;
    } else {
      errors.timeLimit = "";
    }

    const uniqueOptions = new Set(options);
    if (uniqueOptions.size !== options.length) {
      errors.options = "Options must be unique.";
      valid = false;
    } else {
      errors.options = "";
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsCreatingQuestion(true);
    try {
      const res = await createQuestion(
        examId,
        title,
        parseInt(timeLimit),
        questionText,
        options,
        parseInt(correctAnswer)
      );
      const { newQuestion } = res.data;
      setExamData({
        ...examData,
        questions: [...examData.questions, newQuestion],
      });

      setFormData({
        title,
        timeLimit,
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
    } catch (error) {
      console.error("Error creating exam:", error);
    } finally {
      setIsCreatingQuestion(false);
    }
  };

  const handleRemove = async (questionId) => {
    setIsDeletingQuestion(true);
    try {
      await removeQuestions(questionId, examId);
      setExamData({
        ...examData,
        questions: examData.questions.filter((q) => q._id !== questionId),
      });
    } catch (error) {
      console.error("Error deleting question:", error);
    } finally {
      setIsDeletingQuestion(false);
    }
  };

  const { mutate } = useMutation({
    mutationFn: (id) => publishExam(id),
    onSuccess: (res) => {
      if (res.status === 400) {
        toast.success(res.data, {
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
      if (res.status === 200 || res.status === 201) {
        toast.success("Exam published successfully", {
          position: "top-right",
          autoClose: 250,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        queryClient.invalidateQueries({ queryKey: ["upcomingExams"] });
        navigate("/dashboard/teacher");
      }
    },
    onError: (error) => {
      console.error("Error publishing exam:", error);
    },
  });

  const handlePublish = async (e) => {
    e.preventDefault();
    setIsPublishing(true);
    if (!examId) {
      toast.error("Invalid exam ID", {
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
    mutate(examId);
    setIsPublishing(false);
  };

  const handleUpdate = async (questionId) => {
    try {
      const res = await updateQuestion(
        editedData._id,
        editedData.questionText,
        editedData.options,
        editedData.correctAnswer
      );
      if (res.status === 201 || res.status === 200) {
        toast.success("Question updated successfully", {
          position: "top-right",
          autoClose: 250,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setExamData({
          ...examData,
          questions: examData.questions.map((q) =>
            q._id === questionId ? res.data : q
          ),
        });
        window.location.reload();

        setFormData({
          title: res.data.title,
          timeLimit: res.data.timeLimit,
          questionText: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        });
        setEditModal(false);
      }
    } catch (error) {
      console.error("Error updating exam:", error);
    }
  };

  const handelSave = async () => {
    setIsSaving(true);
    const res = await saveExam(examId);
    if (res.status === 200 || res.status === 201) {
      toast.success("Exam saved successfully");
      navigate("/dashboard/teacher");
    }
    try {
    } catch (error) {
      console.error("Error saving exam:", error);
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="relative">
      <div className="mx-auto p-4 sm:p-6 md:p-8 lg:max-w-7xl lg:flex lg:space-x-8">
        {/* Left Side - Form */}
        <div className="bg-white p-4 rounded-xl shadow-lg space-y-4 h-fit mb-6 sm:p-6 sm:space-y-6 lg:flex-1 lg:mb-0">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4 sm:text-3xl sm:mb-6 md:text-4xl">
            Create Exam
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Title and Time Limit (Disabled after first question is created) */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-base font-medium mb-1 text-gray-700 sm:text-lg sm:mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:p-3"
                required
                disabled={examData.questions.length > 0}
              />
            </div>

            <div className="mb-4 sm:mb-6">
              <label className="block text-base font-medium mb-1 text-gray-700 sm:text-lg sm:mb-2">
                Time Limit (in minutes)
              </label>
              <input
                type="number"
                name="timeLimit"
                value={formData.timeLimit}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.timeLimit ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:p-3`}
                min="1"
                required
                disabled={examData.questions.length > 0}
              />
              {errors.timeLimit && (
                <p className="text-red-500 text-xs mt-1 sm:text-sm">
                  {errors.timeLimit}
                </p>
              )}
            </div>

            {/* Question Text */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-base font-medium mb-1 text-gray-700 sm:text-lg sm:mb-2">
                Question Text
              </label>
              <textarea
                name="questionText"
                value={formData.questionText}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:p-3"
                rows="3"
                required
              />
            </div>

            {/* Options */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-base font-medium mb-1 text-gray-700 sm:text-lg sm:mb-2">
                Options
              </label>
              {formData.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className={`w-full p-2 mb-2 border ${
                    errors.options ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:p-3 sm:mb-3`}
                  required
                />
              ))}
              {errors.options && (
                <p className="text-red-500 text-xs mt-1 sm:text-sm">
                  {errors.options}
                </p>
              )}
            </div>

            {/* Correct Answer */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-base font-medium mb-1 text-gray-700 sm:text-lg sm:mb-2">
                Correct Answer
              </label>
              <input
                type="number"
                name="correctAnswer"
                min="1"
                max="4"
                value={formData.correctAnswer}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:p-3"
                placeholder="Enter the correct option"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              disabled={isCreatingQuestion}
              type="submit"
              className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 flex items-center justify-center sm:p-3"
            >
              {isCreatingQuestion ? (
                "creating..."
              ) : (
                <>
                  <FaPlus className="mr-2" /> Create Question
                </>
              )}
            </button>
            <div className="mt-4 sm:mt-6">
              <button
                disabled={isPublishing}
                onClick={handlePublish}
                className="w-full p-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 flex items-center justify-center sm:p-3"
              >
                {isPublishing ? "Loading..." : "Publish Exam"}
              </button>
            </div>
            <div className="mt-4 sm:mt-6">
              <button
                disabled={isSaving}
                onClick={handelSave}
                className="w-full p-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 flex items-center justify-center sm:p-3"
              >
                {isSaving ? "loading..." : "Save Exams"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Questions List */}
        <div className="bg-white p-4 rounded-xl shadow-lg space-y-4 sm:p-6 sm:space-y-6 lg:flex-1">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4 sm:text-3xl sm:mb-6 md:text-4xl">
            Created Questions
          </h2>
          <ul className="space-y-4 sm:space-y-6">
            {examData.questions.map((question, index) => (
              <li key={question._id} className="border-b pb-4 sm:pb-6">
                <div className="text-lg font-bold text-gray-700 sm:text-xl">
                  <span className="font-semibold">Q{index + 1}:</span>{" "}
                  {question.questionText}
                </div>
                <div className="mt-2 sm:mt-3">
                  <strong className="text-sm sm:text-base">Options:</strong>
                  <ul className="text-sm sm:text-base">
                    {Array.isArray(question.options) &&
                    question.options.length > 0 ? (
                      question.options.map((option, optionIndex) => (
                        <li key={optionIndex}>{option}</li>
                      ))
                    ) : (
                      <li>No options available</li>
                    )}
                  </ul>
                </div>
                <div className="mt-2 text-sm sm:mt-3 sm:text-base">
                  <strong>Correct Answer:</strong> {question.correctAnswer}
                </div>
                <div className="mt-2 flex flex-wrap gap-2 sm:mt-3 sm:gap-3">
                  <button
                    disabled={isDeletingQuestion}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to remove this question?"
                        )
                      ) {
                        handleRemove(question._id);
                      }
                    }}
                    className="flex items-center px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 sm:px-4 sm:py-2 sm:text-base"
                  >
                    {isDeletingQuestion ? (
                      "Deleting..."
                    ) : (
                      <>
                        <FaTrashAlt className="mr-1 sm:mr-2" /> Remove
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setEditModal(true);
                      setEditedData(question);
                    }}
                    className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 sm:px-4 sm:py-2 sm:text-base"
                  >
                    ✏️ <span className="ml-1 sm:ml-2">Edit Question</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Edit Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm transition-opacity duration-300 ${
          editModal ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative bg-white p-4 rounded-lg shadow-2xl w-11/12 max-w-md sm:p-6 md:max-w-lg">
          <button
            onClick={() => setEditModal(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition duration-200 text-2xl sm:top-3 sm:right-3"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-3 text-center text-gray-800 sm:text-2xl sm:mb-4">
            Edit Question
          </h2>
          {/* Question Text */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-base font-medium mb-1 text-gray-700 sm:text-lg sm:mb-2">
              Question Text
            </label>
            <textarea
              name="questionText"
              value={editedData.questionText}
              onChange={(e) =>
                setEditedData({ ...editedData, questionText: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:p-3"
              rows="3"
              required
            />
          </div>

          {/* Options */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-base font-medium mb-1 text-gray-700 sm:text-lg sm:mb-2">
              Options
            </label>

            {editedData.options ? (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                {editedData.options.map((o, index) => (
                  <div key={index} className="p-1 rounded-md sm:p-2">
                    <input
                      type="text"
                      className="border-2 px-2 py-1 w-full text-sm sm:text-base sm:px-3"
                      value={o}
                      onChange={(e) => {
                        const newOptions = [...editedData.options];
                        newOptions[index] = e.target.value;
                        setEditedData({ ...editedData, options: newOptions });
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}

            {errors.options && (
              <p className="text-red-500 text-xs mt-1 sm:text-sm">
                {errors.options}
              </p>
            )}
          </div>

          {/* Correct Answer */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-base font-medium mb-1 text-gray-700 sm:text-lg sm:mb-2">
              Correct Answer
            </label>
            <input
              type="text"
              name="correctAnswer"
              value={editedData.correctAnswer}
              onChange={(e) =>
                setEditedData({ ...editedData, correctAnswer: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:p-3"
              placeholder="Enter the correct option"
              required
            />
          </div>
          <div className="mt-3 w-full text-gray-600 sm:mt-4">
            <button
              className="px-3 py-2 w-full text-white bg-green-500 rounded hover:bg-green-600 sm:px-4"
              onClick={() => handleUpdate()}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExamBySubject;
