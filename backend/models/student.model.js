const mongoose = require("mongoose");
const studentSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      enum: [1, 2, 3, 4],
      required: true,
      default: 1,
    },
    semester: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8],
      required: true,
      default: 1,
    },
    results: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Results",
    },

    passwordResetRequest: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
    role: {
      type: String,
      default: "Student",
    },
    completedExams: [
      {
        exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exams" },
        score: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const studentModel = new mongoose.model("Students", studentSchema);
module.exports = studentModel;
