const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: Number, required: true },
});

const examSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    subject: { type: String, required: true },
    year: { type: Number, enum: [1, 2, 3, 4] },
    semester: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8] },
    questions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "question", default: [] },
    ],
    timeLimit: { type: Number, default: null },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teachers",
      required: true,
    },
    isApproved: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    
    submissions: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "Students" },
        answers: { type: [String], required: true },
        score: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exams", examSchema);
