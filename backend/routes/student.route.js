const {
  getExams,
  submitExam,
  getUpcomingExams,
  submitIndividualAnswer,
  getAllAnswersForRespectedExam,
  calculateExamScore,
} = require("../controllers/student.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/getExams", authMiddleware, getExams);
router.get("/getUpcomingExams", authMiddleware, getUpcomingExams);
router.post(
  "/submitIndividualAnswer/:questionId",
  authMiddleware,
  submitIndividualAnswer
);
router.get(
  "/getAllAnswersForRespectedExam/:examId",
  authMiddleware,
  getAllAnswersForRespectedExam
);

router.get("/calculateExamScore/:examId", authMiddleware, calculateExamScore);
router.post("/submitExam/:examId", authMiddleware, submitExam);
router.post("/getYearAndSemester", authMiddleware, getYearAndSemester);

module.exports = router;
