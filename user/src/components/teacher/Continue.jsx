{
  // import React, { useState } from "react";
  // import { useLocation, useNavigate } from "react-router-dom";
  // import { createQuestion, publishExam, removeQuestions } from "../../utils/api"; // Assuming this function exists to handle API requests
  // const Continue = () => {
  //   const location = useLocation();
  //   const navigate = useNavigate();
  //   const { state } = location;
  //   const { timeLimit, title, questions, _id } = state;
  //   console.log(questions);
  //   const [questionData, setQuestionData] = useState({
  //     questionText: "",
  //     options: ["", "", "", ""],
  //     correctAnswer: "",
  //   });
  //   console.log(questions);
  //   // Handle form submission to save or update the question
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       // Call the createQuestion function (assuming it returns the new question)
  //       const res = await createQuestion(
  //         _id,
  //         title,
  //         timeLimit,
  //         questionData.questionText,
  //         questionData.options,
  //         parseInt(questionData.correctAnswer)
  //       );
  //       const { newQuestion } = res.data;
  //       questions.push({
  //         _id: newQuestion._id,
  //         examId: newQuestion.examId,
  //         questionText: questionData.questionText,
  //         options: questionData.options,
  //         correctAnswer: parseInt(questionData.correctAnswer, 10), // Ensure the correct answer is an integer
  //         subject: newQuestion.subject, // Assuming subject comes from the response
  //         createdAt: newQuestion.createdAt,
  //         updatedAt: newQuestion.updatedAt,
  //         __v: newQuestion.__v,
  //       });
  //       setQuestionData({
  //         questionText: "",
  //         options: ["", "", "", ""],
  //         correctAnswer: "",
  //       });
  //       alert("Question added successfully!");
  //     } catch (error) {
  //       console.error("Error saving question:", error);
  //     }
  //   };
  //   const handlePublish = async () => {
  //     try {
  //       const res = await publishExam(_id);
  //       if (res.status === 400) {
  //         alert(res.data);
  //       }
  //       if (res.statusText) {
  //         alert("Exam published successfully");
  //         navigate("/dashboard/teacher");
  //       }
  //     } catch (error) {
  //       console.error("Error publishing exam:", error);
  //     }
  //   };
  //   const handleRemove = async (questionId, examId) => {
  //     try {
  //       const res = await removeQuestions(questionId, examId);
  //       console.log(res.data.questions);
  //       if (res.statusText) {
  //         state.questions = res.data.questions;
  //       }
  //     } catch (error) {
  //       console.error("Error removing question:", error);
  //     }
  //   };
  //   return (
  //     <div className="flex justify-around p-6">
  //       <div className="w-full lg:w-1/2 p-4 bg-white shadow-md rounded-lg">
  //         <h2 className="text-2xl font-semibold mb-4">Create or Edit Question</h2>
  //         <form onSubmit={handleSubmit}>
  //           <div className="mb-4">
  //             <label htmlFor="questionText" className="block text-lg font-medium">
  //               Question Text:
  //             </label>
  //             <input
  //               type="text"
  //               id="questionText"
  //               value={questionData.questionText}
  //               onChange={(e) =>
  //                 setQuestionData({
  //                   ...questionData,
  //                   questionText: e.target.value,
  //                 })
  //               }
  //               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //           <div className="mb-4">
  //             <label className="block text-lg font-medium">Options:</label>
  //             {questionData.options.map((option, index) => (
  //               <div key={index} className="mb-2">
  //                 <input
  //                   type="text"
  //                   value={option}
  //                   onChange={(e) => {
  //                     const newOptions = [...questionData.options];
  //                     newOptions[index] = e.target.value;
  //                     setQuestionData({
  //                       ...questionData,
  //                       options: newOptions,
  //                     });
  //                   }}
  //                   className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                 />
  //               </div>
  //             ))}
  //           </div>
  //           <div className="mb-4">
  //             <label htmlFor="timeLimit" className="block text-lg font-medium">
  //               Time Limit:
  //             </label>
  //             <input
  //               type="number"
  //               id="timeLimit"
  //               value={timeLimit}
  //               readOnly
  //               className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
  //             />
  //           </div>
  //           <div className="mb-4">
  //             <label htmlFor="title" className="block text-lg font-medium">
  //               Title:
  //             </label>
  //             <input
  //               type="text"
  //               id="title"
  //               value={title}
  //               readOnly
  //               className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
  //             />
  //           </div>
  //           <div className="mb-4">
  //             <label
  //               htmlFor="correctAnswer"
  //               className="block text-lg font-medium"
  //             >
  //               Correct Answer:
  //             </label>
  //             <input
  //               type="text"
  //               id="correctAnswer"
  //               value={questionData.correctAnswer}
  //               onChange={(e) =>
  //                 setQuestionData({
  //                   ...questionData,
  //                   correctAnswer: e.target.value,
  //                 })
  //               }
  //               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               placeholder="Enter correct answer"
  //             />
  //           </div>
  //           <button
  //             type="submit"
  //             className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
  //           >
  //             Create Question
  //           </button>
  //         </form>
  //         <button
  //           onClick={() => {
  //             handlePublish();
  //           }}
  //         >
  //           publish
  //         </button>
  //       </div>
  //       <div>
  //         <h2 className="text-4xl font-semibold text-gray-800 text-center mb-8">
  //           Created Questions
  //         </h2>
  //         <ul>
  //           {questions.map((question, index) => (
  //             <li key={question._id}>
  //               {" "}
  //               <div className="text-xl font-bold text-gray-700">
  //                 <span className="font-semibold">Q{index + 1}:</span>{" "}
  //                 {question.questionText}
  //               </div>
  //               <div className="mt-3">
  //                 <strong>Options:</strong>
  //                 <ul>
  //                   {Array.isArray(question.options) &&
  //                   question.options.length > 0 ? (
  //                     question.options.map((option, optionIndex) => (
  //                       <li key={optionIndex}>{option}</li>
  //                     ))
  //                   ) : (
  //                     <li>No options available</li> // Handle the case where options are not available
  //                   )}
  //                 </ul>
  //               </div>
  //               <div className="mt-3">
  //                 <strong>Correct Answer:</strong> {question.correctAnswer}
  //               </div>
  //               <div className="flex gap-4">
  //                 <button
  //                   onClick={() => handleRemove(question._id, question.examId)}
  //                   className="flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
  //                 >
  //                   <FaTrashAlt className="mr-2" /> Remove
  //                 </button>
  //                 <button
  //                   onClick={() => {
  //                     setEditModal(true);
  //                     setEditedData(question);
  //                   }}
  //                   className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
  //                 >
  //                   ✏️ <span className="ml-2">Edit Question</span>
  //                 </button>
  //               </div>
  //             </li>
  //           ))}
  //         </ul>
  //       </div>
  //     </div>
  //   );
  // };
  // export default Continue;
}

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createQuestion,
  getExamById,
  publishExam,
  removeQuestions,
  updateQuestion,
} from "../../utils/api";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

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
        alert("Question updated successfully!");
      }
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };
  const handlePublish = async () => {
    try {
      const res = await publishExam(state);
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
  return (
    <div className="flex w-full min-h-screen p-6">
      {/* Left Section: Create New Question */}
      <div className="w-1/3 border border-gray-300 p-4 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create New Question</h2>

        <div className="mb-4">
          <label className="block font-medium">Title:</label>
          <input
            type="text"
            value={title}
            readOnly
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Time Limit(in minutes):</label>
          <input
            type="text"
            value={timeLimit}
            readOnly
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Question Text:</label>
          <input
            type="text"
            value={formData.questionText}
            onChange={(e) =>
              setFormData({ ...formData, questionText: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Options:</label>
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
              className="w-full p-2 border rounded mb-2"
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Correct Answer:</label>
          <input
            type="text"
            value={formData.correctAnswer}
            onChange={(e) =>
              setFormData({ ...formData, correctAnswer: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleCreate}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            <FaPlus className="inline mr-2" />
            Add Question
          </button>
          <button
            onClick={handlePublish}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            <FaPlus className="inline mr-2" />
            Publish Exam
          </button>
        </div>
      </div>

      {/* Right Div for Questions */}
      <div className="w-2/3 border border-gray-300 p-6">
        <h2 className="text-2xl font-bold mb-4">Questions</h2>
        <ul className="space-y-4">
          {questions.map((question, index) => (
            <li key={index} className="border-b pb-4">
              <p className="font-medium">
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
                <div className="flex gap-3">
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
                  <>
                    <input
                      type="text"
                      className="border-2"
                      value={o}
                      onChange={(e) => {
                        const newOptions = [...editedData.options];
                        newOptions[index] = e.target.value; // Update the specific option
                        setEditedData({ ...editedData, options: newOptions }); // Update the state
                      }}
                    />
                  </>
                ))}
              </>
            ) : (
              <>n</>
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
              placeholder="Enter the correct answer"
              required
            />
          </div>
          <div className="mt-4 text-center text-gray-600">
            <button onClick={() => handleUpdate()}>Update</button>
            <p>Add your editing form or content here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Continue;
