import React, { useState, useEffect } from "react";

import { viewExam } from "../../utils/api";
const ExamDetails = () => {
  const [questions, setQuestions] = useState([]);

  const getDetails = async () => {
    const id = window.location.href.split("/").pop();
    const response = await viewExam(id);
    setQuestions(response.data);
  };
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <h3 className="mb-4 text-2xl font-semibold">Questions</h3>
      <div className=" p-5 rounded-lg bg-gray-100 ">
        {questions.map((question, qIndex) => (
          <div key={qIndex} className=" p-5 rounded-lg  shadow-sm mb-4 ">
            <p className="font-bold text-gray-800">{question.title}</p>
            {question.questions.map((elem, index) => (
              <div className=" p-6 mb-4 rounded-lg shadow-md " key={index}>
                <h1>{elem.questionText}</h1>

                <p className="mt-2 font-medium text-gray-700">
                  <strong>Answer:</strong>{" "}
                  {elem.options[elem.correctAnswer - 1]}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamDetails;
