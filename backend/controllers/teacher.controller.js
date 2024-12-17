const authMiddleware = require("../middlewares/authMiddleware");
const assignsubjectModel = require("../models/assignsubject.model");
const examModel = require("../models/exam.model");
const questionModel = require("../models/question.model");
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
  // const { title, timeLimit, questionText, options, correctAnswer } = req.body;
  const { subject } = req.params;

  try {
    if (req.rootUser.role !== "Teacher") {
      return res
        .status(403)
        .json({ message: "Access denied. Only teachers can create exams." });
    }

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

    const assignedSubject = subjects.find((sub) => sub.subject === subject);

    const newExam = new examModel({
      subject,
      year: assignedSubject.year,
      semester: assignedSubject.semester,
      createdBy: req.rootUser._id,
    });
    await newExam.save();
    await teacherModel.findByIdAndUpdate(req.rootUser._id, {
      $push: { exams: newExam._id },
    });

    return res.status(201).json({
      message: "Exam created and question added successfully",
      exam: newExam,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const createQuestions = async (req, res) => {
  const { examId } = req.params;
  try {
    const exam = await examModel.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    const { title, timeLimit, questionText, options, correctAnswer } = req.body;
    if (!title || !timeLimit || !questionText || !options || !correctAnswer) {
      return res.status(400).json({
        message:
          "Please provide all required fields: title, timeLimit, question details.",
      });
    }
    const newQuestion = new questionModel({
      examId,
      subject: exam.subject,
      questionText,
      options,
      correctAnswer,
    });
    await newQuestion.save();
    const updatedExam = await examModel.findByIdAndUpdate(
      { _id: examId },
      {
        $push: { questions: newQuestion._id },
        $set: { title, timeLimit },
      },
      { new: true }
    );
    res.json(updatedExam);
  } catch (error) {
    handleError(res, error);
  }
};

const removeQuestions = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { examId } = req.body;
    const question = await questionModel.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question does not exist." });
    }
    await questionModel.findByIdAndDelete(questionId);
    await examModel.findByIdAndUpdate(
      { _id: examId },
      {
        $pull: { questions: questionId },
      }
    );
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    handleError(res, error);
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
    await questionModel.deleteMany({ examId: examId });
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
      .populate("questions")
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
  createQuestions,
  removeQuestions,
};
