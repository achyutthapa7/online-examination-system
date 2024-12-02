const authMiddleware = require("../middlewares/authMiddleware");
const assignsubjectModel = require("../models/assignsubject.model");
const examModel = require("../models/exam.model");
const teacherModel = require("../models/teacher.model");
const handleError = require("../utils/handleError");

const getDetails = async (req, res) => {
  try {
    if (req.rootUser.role != "Student") {
      const user = await teacherModel
        .findOne({ _id: req.rootUser._id })
        .populate("assignedSubjects");
      res.status(200).json({ user });
    } else res.status(500).json({ message: "unauthorized access" });
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

    // Fetch subjects assigned to the teacher
    const subjects = await assignsubjectModel.find({
      teacherId: req.rootUser._id,
    });

    if (!subjects.length) {
      return res
        .status(404)
        .json({ message: "Teacher is not assigned any subjects yet." });
    }

    const isSubjectAssigned = subjects.some((sub) => sub.subject === subject);

    if (!isSubjectAssigned) {
      return res
        .status(403)
        .json({ message: "Teacher is not assigned this subject." });
    }

    // Validate request body
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
          message: `correctAnswerIndex must be a valid 1-based index (1, 2, 3, ...) within the options array for question: "${questionText}".`,
        });
      }
    }

    // Create and save the exam
    const assignedSubject = subjects.find((sub) => sub.subject === subject);

    const newExam = new examModel({
      title,
      subject,
      questions,
      year: assignedSubject.year,
      semester: assignedSubject.semester,
      timeLimit,
      createdBy: req.rootUser._id,
    });

    await newExam.save();

    // Optionally associate the exam with the teacher
    await teacherModel.findByIdAndUpdate(req.rootUser._id, {
      $push: { exams: newExam._id },
    });

    return res.status(201).json({
      message: "Exam created successfully",
      exam: newExam,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
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
    await teacherModel.findByIdAndUpdate(req.rootUser._id, {
      $pull: { exams: examId },
    });
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

const getExams = async (req, res) => {
  try {
    const exams = await examModel
      .find({ createdBy: req.rootUser._id })
      .populate("createdBy")
      .populate({
        path: "submissions.student",
      });
    res.json(exams);
  } catch (error) {
    handleError(res, error);
  }
};
module.exports = {
  getDetails,
  createExam,
  deleteExam,
  getExamSubmissions,
  getExams,
};
