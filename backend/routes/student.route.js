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
  getAnswerOfSpecifiQuestion,
} = require("../controllers/student.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/getExams", authMiddleware, getExams);
router.get("/getExamQuestion/:examId", authMiddleware, getExamQuestion);
router.get("/getUpcomingExams", authMiddleware, getUpcomingExams);
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
  "/getAnswerOfSpecifiQuestion/:questionId",
  authMiddleware,
  getAnswerOfSpecifiQuestion
);
module.exports = router;
