const examModel = require("../models/exam.model");
const resultModel = require("../models/result.model");
const studentModel = require("../models/student.model");
const handleError = require("../utils/handleError");

const getExams = async (req, res) => {
  try {
    const exams = await examModel.find({});
    const availableExams = exams.filter((exam) => {
      return !exam.submissions.some((submission) =>
        submission.student.equals(req.user._id)
      );
    });

    if (availableExams.length === 0) {
      return res
        .status(403)
        .json({ message: "No available exams for you to take" });
    }
    if (req.rootUser.role != "Teacher")
      res.status(200).json({ exams: availableExams });
    else res.status(500).json({ message: "unauthorized access" });
  } catch (error) {
    handleError(res, error);
  }
};

const submitExam = async (req, res) => {
  const { examId } = req.params;
  const { answers } = req.body; // Array of answers

  try {
    const exam = await examModel.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    if (
      exam.submissions.some((submission) =>
        submission.student.equals(req.rootUser._id)
      )
    ) {
      return res
        .status(400)
        .json({ message: "You have already submitted this exam" });
    }
    if (!answers) {
      return res.status(400).json({ message: "Answers array is required" });
    }
    if (answers.length < 0) {
      return res.status(400).json({ message: "Answers array is empty" });
    }

    let score = 0;
    exam.questions.forEach((question, index) => {
      const correctAnswer = question.options[question.correctAnswer - 1];
      if (correctAnswer === answers[index]) {
        score += 1;
      }
    });

    await examModel.findOneAndUpdate(
      { _id: examId },
      {
        $push: {
          submissions: {
            student: req.rootUser._id, // Student's ID from JWT
            answers,
            score,
          },
        },
      }
    );
    await studentModel.findOneAndUpdate(
      { _id: req.rootUser._id },
      {
        $push: { completedExams: { exam: exam._id, score } },
      }
    );
    const newResult = new resultModel({
      student: req.rootUser._id, // Student's ID from JWT
      exam: exam._id,
      score,
    });

    await newResult.save();
    res.status(200).json({ message: "Exam submitted successfully", score });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getExams, submitExam };
