const answerModel = require("../models/answer.model");
const examModel = require("../models/exam.model");
const questionModel = require("../models/question.model");
const resultModel = require("../models/result.model");
const studentModel = require("../models/student.model");
const handleError = require("../utils/handleError");

const getExams = async (req, res) => {
  try {
    const exams = await examModel.find({}).populate("questions");

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

const submitIndividualAnswer = async (req, res) => {
  const { questionId } = req.params;
  const { selectedOption } = req.body;
  const { examId } = req.body;
  try {
    const question = await questionModel
      .findById(questionId)
      .select("-correctAnswer");

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const existingAnswer = await answerModel.findOne({
      questionId,
      studentId: req.rootUser._id,
    });

    if (existingAnswer) {
      await answerModel.updateOne(
        { questionId, studentId: req.rootUser._id },
        { $set: { selectedOption } }
      );
      return res.status(200).json({ message: "Answer updated successfully" });
    } else {
      const newAnswer = new answerModel({
        examId,
        studentId: req.rootUser._id,
        questionId,
        selectedOption,
      });

      await newAnswer.save();
      return res
        .status(201)
        .json({ message: "Answer submitted successfully", newAnswer });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const submitExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await examModel.findById(examId).populate("questions");
    const answers = await answerModel.find({
      examId,
      studentId: req.rootUser._id,
    });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    if (!answers || answers.length === 0) {
      return res
        .status(400)
        .json({ message: "No answers found for this student" });
    }

    let score = 0;

    // Calculate the score by comparing selected options with correct answers
    answers.forEach((answer) => {
      const question = exam.questions.find(
        (q) => q._id.toString() === answer.questionId.toString()
      );
      if (question) {
        if (answer.selectedOption === question.correctAnswer) {
          score += 1; // Increment score for correct answer
        }
      }
    });

    // Check if the student has already completed the exam
    const student = await studentModel.findById(req.rootUser._id);
    if (
      student.completedExams.some((exam) => exam.exam.toString() === examId)
    ) {
      return res
        .status(400)
        .json({ message: "This student has already completed this exam" });
    }

    // Update the student's completedExams with the score
    await studentModel.findOneAndUpdate(
      { _id: req.rootUser._id },
      {
        $push: {
          completedExams: { exam: examId, score },
        },
      },
      { new: true }
    );

    res.json({ exam, score });
  } catch (error) {
    handleError(res, error);
  }
};
const getAllAnswersForRespectedExam = async (req, res) => {
  const { examId } = req.params;
  try {
    // Fetch the exam and populate its questions
    const exam = await examModel.findById(examId).populate("questions");

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Fetch all answers for this exam, filtering by questionId
    const answers = await answerModel
      .find({ questionId: { $in: exam.questions } })
      .populate("studentId");

    // Calculate the score for each student
    const studentScores = {};

    answers.forEach((answer) => {
      const question = exam.questions.find((q) =>
        q._id.equals(answer.questionId)
      );

      // Check if the answer is correct
      if (question) {
        const correctAnswer = question.options[question.correctAnswer - 1];
        if (answer.selectedOption === correctAnswer) {
          // Increase the score for this student
          if (!studentScores[answer.studentId._id]) {
            studentScores[answer.studentId._id] = 0;
          }
          studentScores[answer.studentId._id] += 1;
        }
      }
    });

    // Format the response to include answers and their respective scores
    const result = answers.map((answer) => ({
      student: answer.studentId,
      question: answer.questionId,
      selectedOption: answer.selectedOption,
      score: studentScores[answer.studentId._id] || 0,
    }));

    res.json({ answers: result });
  } catch (error) {
    handleError(res, error);
  }
};

const getYearAndSemester = async (req, res) => {
  const student = await studentModel.findOne({ userName: req.body.username });

  console.log(student?.userName);
  res.json({
    year: student?.year,
    semester: student?.semester,
  });
};

const calculateExamScore = async (req, res) => {
  // const { examId } = req.params;
  // try {
  //   const exam = await examModel.findById(examId).populate("questions");
  //   if (!exam) {
  //     return res.status(404).json({ message: "Exam not found" });
  //   }
  //   const answers = await answerModel.find({
  //     questionId: { $in: exam.questions.map((q) => q._id) },
  //     studentId: req.rootUser._id,
  //   });
  //   let score = 0;
  //   exam.questions.forEach((question) => {
  //     const answer = answers.find((ans) => ans.questionId.equals(question._id));
  //     if (
  //       answer &&
  //       question.options[question.correctAnswer - 1] === answer.selectedOption
  //     ) {
  //       score += 1;
  //     }
  //   });
  //   // Save the result in the result model
  //   const newResult = new resultModel({
  //     student: req.rootUser._id,
  //     exam: examId,
  //     score,
  //   });
  //   await newResult.save();
  //   res.status(200).json({
  //     message: "Score calculated successfully",
  //     score,
  //   });
  // } catch (error) {
  //   res.status(500).json({ message: "Server Error", error: error.message });
  // }
};

module.exports = {
  getYearAndSemester,
  getExams,
  submitIndividualAnswer,
  getUpcomingExams,
  calculateExamScore,
  getAllAnswersForRespectedExam,
  submitExam,
};
