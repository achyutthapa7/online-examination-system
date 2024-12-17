const mongoose = require("mongoose");
const answerSchema = mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exams",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
      required: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
      required: true,
    },
    selectedOption: { type: Number, required: true },
  },
  { timestamps: true }
);
const answerModel = new mongoose.model("answer", answerSchema);
module.exports = answerModel;
