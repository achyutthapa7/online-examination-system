const {
  getExams,
  submitExam,
  getUpcomingExams,
  submitIndividualAnswer,
  getAllAnswersForRespectedExam,
  calculateExamScore,
  getYearAndSemester,
  getExamQuestion,
  getExamForStudent,
  getAnswerOfSpecificQuestion,
  getPastExams,
  viewExams,
  showCompletedExams,
  getSubmittedQuestions,
  me,
} = require("../controllers/student.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();
router.get("/showCompletedExams", authMiddleware, showCompletedExams);

router.get("/getExams", authMiddleware, getExams);
router.get("/getExamQuestion/:examId", authMiddleware, getExamQuestion);
router.get("/getUpcomingExams", authMiddleware, getUpcomingExams);
router.get("/getPastExams", authMiddleware, getPastExams);
router.get("/viewExams/:examId", authMiddleware, viewExams);

router.post(
  "/submitIndividualAnswer/:questionId",
  authMiddleware,
  submitIndividualAnswer
);
router.post("/getYearAndSemester", getYearAndSemester);
router.get(
  "/getAllAnswersForRespectedExam/:examId",
  authMiddleware,
  getAllAnswersForRespectedExam
);

router.get("/calculateExamScore/:examId", authMiddleware, calculateExamScore);
router.post("/submitExam/:examId", authMiddleware, submitExam);
router.get("/getExamForStudent/:examId", authMiddleware, getExamForStudent);
router.get(
  "/getAnswerOfSpecificQuestion/:questionId",
  authMiddleware,
  getAnswerOfSpecificQuestion
);
router.get(
  "/getSubmittedQuestions/:examId",
  authMiddleware,
  getSubmittedQuestions
);
router.get("/me", authMiddleware, me);
module.exports = router;
