const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    score: { type: Number, required: true },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);