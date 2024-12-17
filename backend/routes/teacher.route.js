const {
  getDetails,
  createExam,
  deleteExam,
  getExamSubmissions,
  getExams,
  createQuestions,
  removeQuestions,
} = require("../controllers/teacher.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/getDetails", authMiddleware, getDetails);
router.post("/createExam/:subject", authMiddleware, createExam);
router.post("/createQuestions/:examId", authMiddleware, createQuestions);
router.delete("/removeQuestions/:questionId", authMiddleware, removeQuestions);
router.delete("/deleteExam/:examId", authMiddleware, deleteExam);
router.get("/getExamSubmissions/:examId", authMiddleware, getExamSubmissions);
router.get("/getExams", authMiddleware, getExams);

module.exports = router;
