const {
  getExams,
  submitExam,
  getUpcomingExams,
  getExamQuestion,
  getYearAndSemester,
} = require("../controllers/student.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/getExams", authMiddleware, getExams);
router.get("/getUpcomingExams", authMiddleware, getUpcomingExams);
router.get("/getExamQuestion/:examId", authMiddleware, getExamQuestion);
router.post("/submitExam/:examId", authMiddleware, submitExam);

module.exports = router;
