const examModel = require("../models/exam.model");
const resultModel = require("../models/result.model");
const studentModel = require("../models/student.model");
const handleError = require("../utils/handleError");

const getExams = async (req, res) => {
  try {
    const exams = await examModel.find({});

    const availableExams = exams.filter((exam) => {
      const isApproved = exam.isApproved;
      const isYearAndSemesterMatch =
        exam.year === req.rootUser.year &&
        exam.semester === req.rootUser.semester;
      const isNotSubmitted = !exam.submissions.some((submission) =>
        submission.student.equals(req.rootUser._id)
      );
      return isYearAndSemesterMatch && isNotSubmitted && isApproved;
    });
    console.log({ availableExams });
    if (availableExams.length === 0) {
      return res.json({ message: "No available exams for you to take" });
    }
    res.json({ exams: availableExams });
  } catch (error) {
    handleError(res, error);
  }
};

const getUpcomingExams = async (req, res) => {
  const exams = await examModel.find({});
  const upcomingExams = exams.filter((exam) => {
    const isApproved = !exam.isApproved;
    const isYearAndSemesterMatch =
      exam.year === req.rootUser.year &&
      exam.semester === req.rootUser.semester;
    return isApproved && isYearAndSemesterMatch;
  });
  if (upcomingExams.length === 0) {
    return res.status(200).json({ message: "No upcoming exams" });
  }
  res.json({ exams: upcomingExams });
};

const submitExam = async (req, res) => {
  const { examId } = req.params;
  const { answers } = req.body;

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
const getExamQuestion = async (req, res) => {
  const { examId } = req.params;

  try {
    const exam = await examModel.findById(examId);
    // console.log(exam, examId);
    res.json({ exam });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getExams,
  submitExam,
  getUpcomingExams,
  getExamQuestion,
  getYearAndSemester,
};
