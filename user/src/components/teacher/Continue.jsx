import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createQuestion,
  getExamById,
  publishExam,
  removeQuestions,
  updateQuestion,
} from "../../utils/api";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Continue = () => {
  const navigate = useNavigate();
  const [editModal, setEditModal] = useState(false);
  const [editedData, setEditedData] = useState({});
  const location = useLocation();
  const { state } = location;
  const [questions, setQuestions] = useState([]);
  const [exam, setExam] = useState({});
  const timeLimit = exam?.timeLimit;
  const title = exam?.title;

  const [formData, setFormData] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await getExamById(state);
        if (res.status === 200) {
          setExam(res.data);
          setQuestions(res.data.questions);
        }
      } catch (error) {
        console.error("Error fetching exam:", error);
      }
    };

    fetchExam();
  }, [state]);

  // Handle Create New Question
  const handleCreate = async () => {
    try {
      const res = await createQuestion(
        state,
        title,
        timeLimit,
        formData.questionText,
        formData.options,
        parseInt(formData.correctAnswer)
      );
      if (res.statusText) {
        setQuestions([...questions, res.data.newQuestion]);
        setFormData({
          questionText: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        });
      }
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  // Handle Remove Question
  const handleRemove = async (questionId, examId) => {
    try {
      const res = await removeQuestions(questionId, examId);
      if (res.status === 200) {
        const updatedQuestions = questions.filter((q) => q._id !== questionId);
        setQuestions(updatedQuestions);
      }
    } catch (error) {
      console.error("Error removing question:", error);
    }
  };

  // Handle Update Question
  const handleUpdate = async () => {
    try {
      const res = await updateQuestion(
        editedData._id,
        editedData.questionText,
        editedData.options,
        editedData.correctAnswer
      );
      if (res.statusText) {
        const updatedQuestions = questions.map((q) =>
          q._id === editedData._id ? res.data.question : q
        );
        setQuestions(updatedQuestions);
        setEditModal(false);
        toast.success("Question updated successfully!", {
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
      console.error("Error updating question:", error);
    }
  };

  const handlePublish = async () => {
    try {
      const res = await publishExam(state);
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
      if (res.statusText) {
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
        navigate("/dashboard/teacher");
      }
    } catch (error) {
      console.error("Error publishing exam:", error);
    }
  };

  return (
    <div className="flex w-full min-h-screen p-8 bg-gray-50">
      {/* Left Section: Create New Question */}
      <div className="w-full md:w-1/3 border border-gray-300 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Create New Question
        </h2>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-600">
            Title:
          </label>
          <input
            type="text"
            value={title}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-600">
            Time Limit (minutes):
          </label>
          <input
            type="text"
            value={timeLimit}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-600">
            Question Text:
          </label>
          <input
            type="text"
            value={formData.questionText}
            onChange={(e) =>
              setFormData({ ...formData, questionText: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-600">
            Options:
          </label>
          {formData.options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...formData.options];
                newOptions[index] = e.target.value;
                setFormData({ ...formData, options: newOptions });
              }}
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-600">
            Correct Answer:
          </label>
          <input
            type="text"
            value={formData.correctAnswer}
            onChange={(e) =>
              setFormData({ ...formData, correctAnswer: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleCreate}
            className="flex items-center justify-center w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            <FaPlus className="mr-2" />
            Add Question
          </button>
          <button
            onClick={handlePublish}
            className="flex items-center justify-center w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition"
          >
            <FaPlus className="mr-2" />
            Publish Exam
          </button>
        </div>
      </div>

      {/* Right Div for Questions */}
      <div className="w-full md:w-2/3 border border-gray-300 p-6 bg-white shadow-lg rounded-lg ml-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Questions</h2>
        <ul className="space-y-4">
          {questions.map((question, index) => (
            <li key={index} className="border-b pb-4">
              <p className="text-lg font-medium text-gray-800">
                <strong>Q{index + 1}:</strong> {question.questionText}
              </p>
              <ul className="list-disc pl-6 mt-2">
                {question.options.map((option, i) => (
                  <li key={i} className="text-gray-700">
                    {option}
                  </li>
                ))}
                <div className="mt-3">
                  <strong>Correct Answer:</strong> {question.correctAnswer}
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleRemove(question._id, question.examId)}
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
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Modal */}
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

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-700">
              Options
            </label>
            {editedData.options ? (
              <>
                {editedData.options.map((o, index) => (
                  <input
                    key={index}
                    type="text"
                    className="border-2 p-3 rounded-md mb-3 w-full"
                    value={o}
                    onChange={(e) => {
                      const newOptions = [...editedData.options];
                      newOptions[index] = e.target.value;
                      setEditedData({ ...editedData, options: newOptions });
                    }}
                  />
                ))}
              </>
            ) : (
              <>No Options</>
            )}
          </div>

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
              placeholder="Enter the correct option"
              required
            />
          </div>
          <div className="mt-4 text-center text-gray-600">
            <button
              onClick={() => handleUpdate()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Continue;
