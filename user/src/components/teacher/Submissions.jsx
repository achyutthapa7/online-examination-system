import React, { useEffect, useState } from "react";
import { getExamsForTeacher } from "../../utils/api"; // Importing your provided API function

const ExamsWithSubmissions = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openExamId, setOpenExamId] = useState(null); // Track which exam is open

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await getExamsForTeacher(); // Fetching exams
        setExams(response.data);
      } catch (err) {
        setError("Failed to load exams");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const toggleExam = (examId) => {
    setOpenExamId(openExamId === examId ? null : examId); // Open or close exam submissions
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Exams</h2>
      {exams.length === 0 ? (
        <p>No exams found</p>
      ) : (
        <ul>
          {exams.map((exam) => {
            const totalQuestions = exam.questions.length; // Total number of questions in the exam

            return (
              <li
                key={exam._id}
                style={{
                  marginBottom: "15px",
                  border: "1px solid #ddd",
                  padding: "10px",
                }}
              >
                <div
                  onClick={() => toggleExam(exam._id)}
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                  {exam.title || "Untitled Exam"} - {exam.subject} ({exam.year}{" "}
                  Year, Sem {exam.semester})
                </div>

                {openExamId === exam._id && (
                  <div style={{ marginTop: "10px", paddingLeft: "20px" }}>
                    <h3>Submissions:</h3>
                    {exam.submissions.length === 0 ? (
                      <p>No submissions yet</p>
                    ) : (
                      <ul>
                        {exam.submissions.map((submission) => {
                          const completedExam =
                            submission.student.completedExams.find(
                              (completed) => completed.exam === exam._id
                            );

                          const correctAnswers = completedExam
                            ? completedExam.score
                            : 0; // Student's correct answers
                          const percentage =
                            totalQuestions > 0
                              ? (
                                  (correctAnswers / totalQuestions) *
                                  100
                                ).toFixed(2)
                              : 0; // Calculate percentage
                          const passStatus =
                            percentage >= 40 ? "Pass ✅" : "Fail ❌"; // Pass/Fail based on 40% criteria

                          return (
                            <li
                              key={submission._id}
                              style={{ marginBottom: "10px" }}
                            >
                              <strong>Student:</strong>{" "}
                              {submission.student.fullName} (
                              {submission.student.userName})<br />
                              <strong>Correct Answers:</strong> {correctAnswers}
                              /{totalQuestions} <br />
                              <strong>Percentage:</strong> {percentage}% <br />
                              <strong>Status:</strong> {passStatus}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ExamsWithSubmissions;
