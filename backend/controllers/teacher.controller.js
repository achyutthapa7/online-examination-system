const z = require("zod");
const authMiddleware = require("../middlewares/authMiddleware");
const assignsubjectModel = require("../models/assignsubject.model");
const examModel = require("../models/exam.model");
const questionModel = require("../models/question.model");
const savedExamModel = require("../models/savedExam.model");
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
const createQuestions = async (req, res) => {
  const { examId } = req.params;
  try {
    const exam = await examModel.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    const { title, timeLimit, questionText, options, correctAnswer } = req.body;

    // Check for required fields
    if (!questionText || !options || !correctAnswer) {
      return res.status(400).json({
        message:
          "Please provide all required fields: questionText, options, and correctAnswer.",
      });
    }

    // If it's the first question, set title and timeLimit
    if (exam.questions.length === 0) {
      if (!title || !timeLimit) {
        return res.status(400).json({
          message:
            "Please provide both title and timeLimit for the first question.",
        });
      }
    }

    // Create a new question
    const newQuestion = new questionModel({
      examId,
      subject: exam.subject,
      questionText,
      options,
      correctAnswer,
    });
    await newQuestion.save();

    if (exam.questions.length === 0) {
      await examModel.findByIdAndUpdate(
        { _id: examId },
        {
          $push: { questions: newQuestion._id },
          $set: { title, timeLimit },
        },
        { new: true }
      );
    } else {
      await examModel.findByIdAndUpdate(
        { _id: examId },
        {
          $push: { questions: newQuestion._id },
        },
        { new: true }
      );
    }

    res.json({ questionId: newQuestion._id, newQuestion });
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
    await examModel
      .findByIdAndUpdate(
        { _id: examId },
        {
          $pull: { questions: questionId },
        }
      )
      .populate("questions");
    res.json({
      message: "Question deleted successfully",
      question,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// start from here
const updateQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { questionText, options, correctAnswer } = req.body;
    if (!questionText || !options || !correctAnswer) {
      return res.status(400).json({
        message:
          "Please provide all required fields: questionText, options, and correctAnswer.",
      });
    }
    const updatedQuestion = await questionModel.findByIdAndUpdate(
      { _id: questionId },
      {
        $set: { questionText, options, correctAnswer },
      },
      { new: true }
    );
    res.json({
      message: "question updated successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    handleError(res, error);
  }
};
const publishExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await examModel.findById({ _id: examId });

    if (!exam) return res.status(404).json({ message: "Exam not found" });
    if (exam.questions.length <= 0) {
      return res
        .status(400)
        .json({ message: "No questions found in the exam." });
    }
    if (exam.isPublished) {
      return res.status(400).json({ message: "Exam is already published." });
    }
    await examModel.findByIdAndUpdate(
      { _id: exam.id },
      { $set: { isPublished: true } },
      { new: true }
    );
    res.json({ message: "Exam published successfully", exam });
  } catch (error) {
    handleError(res, error);
  }
};

const saveExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await examModel.findById(examId);
    if (exam.isPublished) {
      return res.status(400).json({ message: "Exam is already published." });
    }
    const savedExam = await savedExamModel({
      examId,
    });
    await savedExam.save();
    res.json(savedExam);
  } catch (error) {
    handleError(res, error);
  }
};
const getSavedExam = async (req, res) => {
  try {
    const allSavedExam = await savedExamModel.find({}).populate({
      path: "examId",
      populate: {
        path: "questions",
      },
    });
    const savedExam = allSavedExam.filter(
      (exam) => exam.examId?.isPublished === false
    );

    // if (savedExam.length == 0) {
    // return res.status(404).json({ message: "No saved exams found." });
    // }

    res.json(savedExam);
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

const getExamById = async (req, res) => {
  try {
    const { examId } = req.params;
    if (!examId)
      return res.status(404).json({ message: "Exam does not exist." });
    const exam = await examModel.findById(examId).populate("questions");
    if (!exam) return res.status(404).json({ message: "Exam does not exist." });
    res.json(exam);
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
  getExamById,
  publishExam,
  saveExam,
  getSavedExam,
  updateQuestion,
};

//! this

//? this

// * this

// todo

// // this is a test comment

