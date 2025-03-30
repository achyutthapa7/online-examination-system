// import { useEffect, useState } from "react";
// import {
//   getExamForStudent,
//   submitIndividualAnswer,
//   submitExam,
//   API_URL,
// } from "../../utils/api";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// const ExamPage = () => {
//   const { examId } = useParams();
//   const [timeLeft, setTimeLeft] = useState(null);
//   const [examTitle, setExamTitle] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [qId, setQId] = useState(null);
//   const [examEndTime, setExamEndTime] = useState(null);
//   const navigate = useNavigate();
//   const [submittedQuestion, setSubmittedQuestion] = useState([]);

//   useEffect(() => {
//     const getSubmittedQuestion = async () => {
//       const res = await fetch(
//         `${API_URL}/student/getSubmittedQuestions/${examId}`,
//         {
//           method: "GET",
//           credentials: "include",
//         }
//       );
//       const data = await res.json();

//       if (data.answers) {
//         const submittedAnswersMap = new Map();
//         data.answers.forEach((answer) => {
//           submittedAnswersMap.set(answer.questionId, answer.selectedOption);
//         });

//         setSubmittedQuestion(submittedAnswersMap);
//       }
//     };
//     getSubmittedQuestion();
//   }, [examId]);

//   useEffect(() => {
//     const fetchExam = async () => {
//       try {
//         const res = await getExamForStudent(examId);
//         if (res.status === 200 || (res.status === 201 && res.data.timeLimit)) {
//           setQuestions(res.data.questions);
//           setExamTitle(res.data.title);

//           // Set time limit
//           const startTime = new Date(res.data.startTime);
//           const endTime = new Date(
//             startTime.getTime() + res.data.timeLimit * 60000
//           );
//           setExamEndTime(endTime);
//           setTimeLeft(Math.floor((endTime - Date.now()) / 1000));

//           // Find the first unanswered question
//           let lastUnansweredIndex = res.data.questions.findIndex(
//             (q) => !submittedQuestion.has(q._id)
//           );

//           if (lastUnansweredIndex === -1) lastUnansweredIndex = 0;

//           setCurrentQuestionIndex(lastUnansweredIndex);
//           setQId(res.data.questions[lastUnansweredIndex]._id);
//           setSelectedOption(
//             submittedQuestion.get(
//               res.data.questions[lastUnansweredIndex]._id
//             ) || null
//           );
//         }
//       } catch (error) {
//         console.error("Failed to fetch exam data:", error);
//       }
//     };

//     fetchExam();
//   }, [examId, submittedQuestion]);

//   useEffect(() => {
//     if (timeLeft === null) return;
//     const timer = setInterval(() => {
//       const remainingTime = Math.max(
//         Math.floor((examEndTime - Date.now()) / 1000),
//         0
//       );
//       setTimeLeft(remainingTime);

//       if (remainingTime <= 0) {
//         clearInterval(timer);

//         alert("Time's up! Your answers are submitted automatically.");

//         handleSubmitExam();
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [examEndTime]);

//   const handleOptionChange = (optionIndex) => {
//     setSelectedOption(optionIndex + 1);
//   };

//   const handleNext = async () => {
//     try {
//       if (selectedOption !== null) {
//         await submitIndividualAnswer(qId, examId, selectedOption);
//         setSubmittedQuestion((prev) => new Map(prev).set(qId, selectedOption));
//       }

//       const nextIndex = currentQuestionIndex + 1;
//       if (nextIndex < questions.length) {
//         setCurrentQuestionIndex(nextIndex);
//         setQId(questions[nextIndex]._id);
//         setSelectedOption(
//           submittedQuestion.get(questions[nextIndex]._id) || null
//         );
//       }
//     } catch (error) {
//       console.error("Error submitting answer:", error.message);
//     }
//   };

//   const handleAutoSubmitExam = async () => {
//     try {
//       for (let i = 0; i < questions.length; i++) {
//         const questionId = questions[i]._id;
//         if (!submittedQuestion.has(questionId)) {
//           await submitIndividualAnswer(questionId, examId, null); // Submit unanswered with null
//         }
//       }
//       const response = await submitExam(examId);
//       if (response.status === 200 || response.statusText === "OK") {
//         toast.success("Exam is submitted successfully");
//         navigate("/dashboard/student");
//       } else {
//         console.error("Failed to submit exam:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error auto-submitting exam:", error.message);
//     }
//   };
//   const handleSubmitExam = async () => {
//     try {
//       if (Date.now() > examEndTime) {
//         toast.error("Time is over");
//         await handleAutoSubmitExam();
//         return;
//       }

//       if (selectedOption !== null) {
//         await submitIndividualAnswer(qId, examId, selectedOption);
//       }

//       const response = await submitExam(examId);

//       if (response.status === 200 || response.statusText === "OK") {
//         toast.success("Exam is submitted successfully.");
//         navigate("/dashboard/student");
//       } else {
//         console.error("Failed to submit exam:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error submitting exam:", error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center">
//       <div className="w-full max-w-4xl mt-8 p-6 bg-white rounded-lg shadow-md">
//         <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
//           Exam: {examTitle}
//         </h1>
//         {timeLeft !== null && timeLeft > 0 ? (
//           <div
//             className={`text-2xl font-bold text-center ${
//               timeLeft < 30 ? "text-red-600 animate-pulse" : "text-blue-700"
//             }`}
//           >
//             Time Left:{" "}
//             {`${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
//               .toString()
//               .padStart(2, "0")}`}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">Loading timer...</p>
//         )}
//         {timeLeft === 0 && navigate("/dashboard/student/take-exam")}
//       </div>

//       <div className="w-full max-w-4xl mt-6 p-6 bg-white rounded-lg shadow-md">
//         {questions.length > 0 ? (
//           <>
//             <div>
//               <p className="text-lg font-semibold text-gray-700 mb-4">
//                 Question {currentQuestionIndex + 1} of {questions.length}:
//               </p>
//               <p className="text-gray-800 text-lg mb-6">
//                 {questions[currentQuestionIndex].questionText}
//               </p>
//               <div className="space-y-3">
//                 {questions[currentQuestionIndex].options.map(
//                   (option, index) => (
//                     <label
//                       key={index}
//                       className="block bg-gray-50 border rounded-lg px-4 py-2 hover:bg-blue-50 cursor-pointer"
//                     >
//                       <input
//                         type="radio"
//                         name={`question-${currentQuestionIndex}`}
//                         value={index + 1}
//                         onChange={() => handleOptionChange(index)}
//                         className="mr-3"
//                         checked={selectedOption === index + 1}
//                       />
//                       {option}
//                     </label>
//                   )
//                 )}
//               </div>
//             </div>
//             {currentQuestionIndex < questions.length - 1 ? (
//               <button
//                 className={`mt-6 w-full py-3 text-lg font-semibold rounded ${
//                   selectedOption
//                     ? "bg-blue-600 text-white hover:bg-blue-700"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//                 onClick={handleNext}
//                 disabled={!selectedOption}
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 className={`mt-6 w-full py-3 text-lg font-semibold rounded ${
//                   selectedOption
//                     ? "bg-green-600 text-white hover:bg-green-700"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//                 onClick={handleSubmitExam}
//                 disabled={!selectedOption}
//               >
//                 Submit Exam
//               </button>
//             )}
//           </>
//         ) : (
//           <p className="text-gray-500">Loading questions...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExamPage;


import { useEffect, useState } from "react";
import {
  getExamForStudent,
  submitIndividualAnswer,
  submitExam,
  API_URL,
} from "../../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa"; // Importing spinner icon for loading

const ExamPage = () => {
  const { examId } = useParams();
  const [timeLeft, setTimeLeft] = useState(null);
  const [examTitle, setExamTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [qId, setQId] = useState(null);
  const [examEndTime, setExamEndTime] = useState(null);
  const navigate = useNavigate();
  const [submittedQuestion, setSubmittedQuestion] = useState([]);

  // Loading states for buttons
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [isSubmittingExam, setIsSubmittingExam] = useState(false);

  useEffect(() => {
    const getSubmittedQuestion = async () => {
      const res = await fetch(
        `${API_URL}/student/getSubmittedQuestions/${examId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();

      if (data.answers) {
        const submittedAnswersMap = new Map();
        data.answers.forEach((answer) => {
          submittedAnswersMap.set(answer.questionId, answer.selectedOption);
        });

        setSubmittedQuestion(submittedAnswersMap);
      }
    };
    getSubmittedQuestion();
  }, [examId]);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await getExamForStudent(examId);
        if (res.status === 200 || (res.status === 201 && res.data.timeLimit)) {
          setQuestions(res.data.questions);
          setExamTitle(res.data.title);

          // Set time limit
          const startTime = new Date(res.data.startTime);
          const endTime = new Date(
            startTime.getTime() + res.data.timeLimit * 60000
          );
          setExamEndTime(endTime);
          setTimeLeft(Math.floor((endTime - Date.now()) / 1000));

          // Find the first unanswered question
          let lastUnansweredIndex = res.data.questions.findIndex(
            (q) => !submittedQuestion.has(q._id)
          );

          if (lastUnansweredIndex === -1) lastUnansweredIndex = 0;

          setCurrentQuestionIndex(lastUnansweredIndex);
          setQId(res.data.questions[lastUnansweredIndex]._id);
          setSelectedOption(
            submittedQuestion.get(
              res.data.questions[lastUnansweredIndex]._id
            ) || null
          );
        }
      } catch (error) {
        console.error("Failed to fetch exam data:", error);
      }
    };

    fetchExam();
  }, [examId, submittedQuestion]);

  useEffect(() => {
    if (timeLeft === null) return;
    const timer = setInterval(() => {
      const remainingTime = Math.max(
        Math.floor((examEndTime - Date.now()) / 1000),
        0
      );
      setTimeLeft(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timer);

        alert("Time's up! Your answers are submitted automatically.");

        handleSubmitExam();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [examEndTime]);

  const handleOptionChange = (optionIndex) => {
    setSelectedOption(optionIndex + 1);
  };

  const handleNext = async () => {
    setIsSubmittingAnswer(true); // Start loader
    try {
      if (selectedOption !== null) {
        await submitIndividualAnswer(qId, examId, selectedOption);
        setSubmittedQuestion((prev) => new Map(prev).set(qId, selectedOption));
      }

      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
        setQId(questions[nextIndex]._id);
        setSelectedOption(
          submittedQuestion.get(questions[nextIndex]._id) || null
        );
      }
    } catch (error) {
      console.error("Error submitting answer:", error.message);
    } finally {
      setIsSubmittingAnswer(false); // Stop loader
    }
  };

  const handleAutoSubmitExam = async () => {
    setIsSubmittingExam(true); // Start loader
    try {
      for (let i = 0; i < questions.length; i++) {
        const questionId = questions[i]._id;
        if (!submittedQuestion.has(questionId)) {
          await submitIndividualAnswer(questionId, examId, null); // Submit unanswered with null
        }
      }
      const response = await submitExam(examId);
      if (response.status === 200 || response.statusText === "OK") {
        toast.success("Exam is submitted successfully");
        navigate("/dashboard/student");
      } else {
        console.error("Failed to submit exam:", response.statusText);
      }
    } catch (error) {
      console.error("Error auto-submitting exam:", error.message);
    } finally {
      setIsSubmittingExam(false); // Stop loader
    }
  };

  const handleSubmitExam = async () => {
    setIsSubmittingExam(true); // Start loader
    try {
      if (Date.now() > examEndTime) {
        toast.error("Time is over");
        await handleAutoSubmitExam();
        return;
      }

      if (selectedOption !== null) {
        await submitIndividualAnswer(qId, examId, selectedOption);
      }

      const response = await submitExam(examId);

      if (response.status === 200 || response.statusText === "OK") {
        toast.success("Exam is submitted successfully.");
        navigate("/dashboard/student");
      } else {
        console.error("Failed to submit exam:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting exam:", error.message);
    } finally {
      setIsSubmittingExam(false); // Stop loader
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center">
      <div className="w-full max-w-4xl mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
          Exam: {examTitle}
        </h1>
        {timeLeft !== null && timeLeft > 0 ? (
          <div
            className={`text-2xl font-bold text-center ${
              timeLeft < 30 ? "text-red-600 animate-pulse" : "text-blue-700"
            }`}
          >
            Time Left:{" "}
            {`${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
              .toString()
              .padStart(2, "0")}`}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading timer...</p>
        )}
        {timeLeft === 0 && navigate("/dashboard/student/take-exam")}
      </div>

      <div className="w-full max-w-4xl mt-6 p-6 bg-white rounded-lg shadow-md">
        {questions.length > 0 ? (
          <>
            <div>
              <p className="text-lg font-semibold text-gray-700 mb-4">
                Question {currentQuestionIndex + 1} of {questions.length}:
              </p>
              <p className="text-gray-800 text-lg mb-6">
                {questions[currentQuestionIndex].questionText}
              </p>
              <div className="space-y-3">
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <label
                      key={index}
                      className="block bg-gray-50 border rounded-lg px-4 py-2 hover:bg-blue-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestionIndex}`}
                        value={index + 1}
                        onChange={() => handleOptionChange(index)}
                        className="mr-3"
                        checked={selectedOption === index + 1}
                      />
                      {option}
                    </label>
                  )
                )}
              </div>
            </div>
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                className={`mt-6 w-full py-3 text-lg font-semibold rounded ${
                  selectedOption
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={handleNext}
                disabled={!selectedOption}
              >
                {isSubmittingAnswer ? (
                  <FaSpinner className="animate-spin mr-2 text-center" />
                ) : (
                  "Next"
                )}
              </button>
            ) : (
              <button
                className={`mt-6 w-full py-3 text-lg font-semibold rounded ${
                  selectedOption
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={handleSubmitExam}
                disabled={!selectedOption}
              >
                {isSubmittingExam ? (
                  <FaSpinner className="animate-spin mr-2 text-center" />
                ) : (
                  "Submit Exam"
                )}
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-500">Loading questions...</p>
        )}
      </div>
    </div>
  );
};

export default ExamPage;
