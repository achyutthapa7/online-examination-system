const {
  getDetails,
  createExam,
  deleteExam,
  getExamSubmissions,
  getExams,
  createQuestions,
  removeQuestions,
  getExamById,
  publishExam,
  saveExam,
  getSavedExam,
  updateQuestion,
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
router.get("/getExamById/:examId", authMiddleware, getExamById);
router.patch("/publishExam/:examId", authMiddleware, publishExam);
router.post("/saveExam/:examId", authMiddleware, saveExam);
router.get("/getSavedExam", authMiddleware, getSavedExam);
router.put("/updateQuestion/:questionId", authMiddleware, updateQuestion);

module.exports = router;
