const examModel = require("../models/exam.model");
const teacherModel = require("../models/teacher.model");
const handleError = require("../utils/handleError");

const getDetails = async (req, res) => {
  try {
    if (req.rootUser.role != "Student")
      res.status(200).json({ user: req.rootUser });
    else res.status(500).json({ message: "unauthorized access" });
  } catch (error) {
    handleError(res, error);
  }
};

const createExam = async (req, res) => {
  const { title, questions, timeLimit } = req.body;
  const { subject } = req.params;

  try {
    // Only teachers can create exams
    if (req.rootUser.role !== "Teacher") {
      return res
        .status(403)
        .json({ message: "Access denied. Only teachers can create exams." });
    }

    // Validate required fields
    if (!title || !questions || !timeLimit) {
      return res.status(400).json({
        message:
          "Please provide all required fields: title, questions, timeLimit.",
      });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return res
        .status(400)
        .json({ message: "Questions must be an array and cannot be empty." });
    }

    // Validate each question
    for (const question of questions) {
      const { questionText, options, correctAnswer } = question;

      if (!questionText || correctAnswer === undefined) {
        return res.status(400).json({
          message: "Each question must include questionText and correctAnswer.",
        });
      }

      if (!options || !Array.isArray(options) || options.length < 2) {
        return res.status(400).json({
          message:
            "Multiple-choice questions must include at least two options.",
        });
      }

      if (
        typeof correctAnswer !== "number" ||
        correctAnswer < 1 ||
        correctAnswer > options.length
      ) {
        return res.status(400).json({
          message: `correctAnswerIndex must be a valid 1-based index (1, 2, 3, ...) within the options array for question: "${questionText}"`,
        });
      }
    }

    // Check if the teacher is authorized for the subject
    req.rootUser.assignedSubjects.map(async (sub) => {
      if (subject == sub.subject) {
        const newExam = new examModel({
          title,
          subject,
          questions,
          year: sub.year,
          semester: sub.semester,
          timeLimit,
          createdBy: req.rootUser._id,
        });

        // Save exam and associate it with the teacher
        await newExam.save();
        await teacherModel.findOneAndUpdate(
          { _id: req.rootUser._id },
          { $push: { exams: newExam._id } }
        );

        res.status(201).json({
          message: "Exam created successfully",
          exam: newExam,
        });
      } else {
        return res
          .status(401)
          .json({ message: "This subject is not assigned to the teacher." });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteExam = async (req, res) => {
  try {
    const { examId } = req.params;
    if (!examId)
      return res.status(404).json({ message: " Exam does not exist." });
    const exam = await examModel.findByIdAndDelete(examId);
    if (!exam)
      return res.status(404).json({ message: " Exam does not exist." });
    res.json({ message: "Exam deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};
const getExamSubmissions = async (req, res) => {
  try {
    const { examId } = req.params;
    if (!examId)
      return res.status(404).json({ message: " Exam does not exist." });
    const exam = await examModel.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam does not exist." });
    const submissions = await exam.submissions;
    res.status(200).json({ submissions });
  } catch (error) {
    handleError(res, error);
  }
};
module.exports = {
  getDetails,
  createExam,
  deleteExam,
  getExamSubmissions,
};
