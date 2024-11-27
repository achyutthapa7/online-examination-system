const { getExams, submitExam } = require("../controllers/student.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();
router.get("/getExams", authMiddleware, getExams);
router.post("/submitExam/:examId", authMiddleware, submitExam);

module.exports = router;
