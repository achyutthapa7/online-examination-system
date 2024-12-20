import React, { useEffect, useState } from "react";
import {
  createQuestion,
  getExamById,
  publishExam,
  removeQuestions,
  saveExam,
  updateQuestion,
} from "../../utils/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const CreateExamBySubject = () => {
  const [editModal, setEditModal] = useState(false);
  const [editedData, setEditedData] = useState([]);

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

    try {
      const res = await createQuestion(
        examId,
        title,
        parseInt(timeLimit),
        questionText,
        options,
        correctAnswer
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
    }
  };

  // Remove question
  const handleRemove = async (questionId) => {
    try {
      await removeQuestions(questionId, examId);
      setExamData({
        ...examData,
        questions: examData.questions.filter((q) => q._id !== questionId),
      });
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      const res = await publishExam(examId);
      if (res.status === 400) {
        alert(res.data);
      }
      if (res.statusText) {
        alert("Exam published successfully");
        navigate("/dashboard/teacher");
      }
    } catch (error) {
      console.error("Error publishing exam:", error);
    }
  };

  const handleUpdate = async (questionId) => {
    try {
      const res = await updateQuestion(
        editedData._id,
        editedData.questionText,
        editedData.options,
        editedData.correctAnswer
      );
      if (res.statusText) {
        alert("Question updated successfully");
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
    const res = await saveExam(examId);
    if (res.statusText) {
      alert("Exam saved successfully");
    }
    try {
    } catch (error) {
      console.error("Error saving exam:", error);
    }
  };
  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto mt-10 p-8 space-x-8 flex">
        {/* Left Side - Form */}
        <div className="flex-1 bg-white p-8 rounded-xl   shadow-lg space-y-6 h-fit">
          <h2 className="text-4xl font-semibold text-gray-800 text-center mb-8">
            Create Exam
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title and Time Limit (Disabled after first question is created) */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2 text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                disabled={examData.questions.length > 0} // Disable after first question
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium mb-2 text-gray-700">
                Time Limit (in minutes)
              </label>
              <input
                type="number"
                name="timeLimit"
                value={formData.timeLimit}
                onChange={handleChange}
                className={`w-full p-3 border ${
                  errors.timeLimit ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                min="1"
                required
                disabled={examData.questions.length > 0} // Disable after first question
              />
              {errors.timeLimit && (
                <p className="text-red-500 text-sm mt-1">{errors.timeLimit}</p>
              )}
            </div>

            {/* Question Text */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2 text-gray-700">
                Question Text
              </label>
              <textarea
                name="questionText"
                value={formData.questionText}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
                required
              />
            </div>

            {/* Options */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2 text-gray-700">
                Options
              </label>
              {formData.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className={`w-full p-3 mb-3 border ${
                    errors.options ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  required
                />
              ))}
              {errors.options && (
                <p className="text-red-500 text-sm mt-1">{errors.options}</p>
              )}
            </div>

            {/* Correct Answer */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2 text-gray-700">
                Correct Answer
              </label>
              <input
                type="number"
                name="correctAnswer"
                min="1"
                max="4"
                value={formData.correctAnswer}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter the correct option"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 flex items-center justify-center"
            >
              <FaPlus className="mr-2" /> Create Question
            </button>
            <div className="mt-6">
              <button
                onClick={handlePublish}
                className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 flex items-center justify-center"
              >
                Publish Exam
              </button>
            </div>
            <div className="mt-6">
              <button
                onClick={handelSave}
                className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 flex items-center justify-center"
              >
                Save Exam
              </button>
            </div>
          </form>
        </div>
        {/* Publish Exam Button */}

        {/* Right Side - Created Questions with All Details */}
        <div className="flex-1 h-full   bg-white p-8 rounded-xl shadow-lg space-y-6">
          <h2 className="text-4xl font-semibold text-gray-800 text-center mb-8">
            Created Questions
          </h2>
          <ul className="space-y-6">
            {examData.questions.map((question, index) => (
              <li key={question._id} className="border-b pb-6">
                <div className="text-xl font-bold text-gray-700">
                  <span className="font-semibold">Q{index + 1}:</span>{" "}
                  {question.questionText}
                </div>
                <div className="mt-3">
                  <strong>Options:</strong>
                  <ul>
                    {Array.isArray(question.options) &&
                    question.options.length > 0 ? (
                      question.options.map((option, optionIndex) => (
                        <li key={optionIndex}>{option}</li>
                      ))
                    ) : (
                      <li>No options available</li> // Handle the case where options are not available
                    )}
                  </ul>
                </div>
                <div className="mt-3">
                  <strong>Correct Answer:</strong> {question.correctAnswer}
                </div>
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to remove this question?"
                        )
                      ) {
                        handleRemove(question._id);
                      }
                    }}
                    className="flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                  >
                    <FaTrashAlt className="mr-2" /> Remove
                  </button>

                  <button
                    onClick={() => {
                      setEditModal(true);
                      setEditedData(question);
                    }}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  >
                    ✏️ <span className="ml-2">Edit Question</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm transition-opacity duration-300 ${
          editModal ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
          <button
            onClick={() => setEditModal(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition duration-200 text-2xl"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Edit Question
          </h2>
          {/* Question Text */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-700">
              Question Text
            </label>
            <textarea
              name="questionText"
              value={editedData.questionText}
              onChange={(e) =>
                setEditedData({ ...editedData, questionText: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
              required
            />
          </div>

          {/* Options */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-700">
              Options
            </label>

            {editedData.options ? (
              <div className="grid grid-cols-2 ">
                {editedData.options.map((o, index) => (
                  <div key={index} className=" p-2 rounded-md">
                    <input
                      type="text"
                      className="border-2 px-3 py-1 w-full"
                      value={o}
                      onChange={(e) => {
                        const newOptions = [...editedData.options];
                        newOptions[index] = e.target.value; // Update the specific option
                        setEditedData({ ...editedData, options: newOptions }); // Update the state
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}

            {errors.options && (
              <p className="text-red-500 text-sm mt-1">{errors.options}</p>
            )}
          </div>

          {/* Correct Answer */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-700">
              Correct Answer
            </label>
            <input
              type="text"
              name="correctAnswer"
              value={editedData.correctAnswer}
              onChange={(e) =>
                setEditedData({ ...editedData, correctAnswer: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter the correct optioss"
              required
            />
          </div>
          <div className="mt-4 w-full  text-gray-600">
            <button
              className="px-4 py-2 w-full  text-white bg-green-500 rounded
            hover:bg-green-600"
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
