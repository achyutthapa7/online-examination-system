const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema(
  {
    examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exams" },
    subject: { type: String, required: true },
    questionText: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
  },
  { timestamps: true }
);
const questionModel = new mongoose.model("question", questionSchema);
module.exports = questionModel;
