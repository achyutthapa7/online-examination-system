const mongoose = require("mongoose");
const savedExamSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exams",
    },
  },
  {
    timestamps: true,
  }
);
const savedExamModel = new mongoose.model("savedExam", savedExamSchema);
module.exports = savedExamModel;
