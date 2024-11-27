const {
  getDetails,
  createExam,
  deleteExam,
  getExamSubmissions,
} = require("../controllers/teacher.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/getDetails", authMiddleware, getDetails);
router.post("/createExam/:subject", authMiddleware, createExam);
router.delete("/deleteExam/:examId", authMiddleware, deleteExam);
router.get("/getExamSubmissions/:examId", authMiddleware, getExamSubmissions);

module.exports = router;
