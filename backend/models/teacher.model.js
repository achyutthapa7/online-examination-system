const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema(
  {
    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
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
    assignedSubjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "assignSubject",
      },
    ],
    isAssigned: {
      type: Boolean,
      default: false,
    },
    notifications: [
      {
        message: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    role: {
      type: String,
      default: "Teacher",
    },
    exams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exams" }],
  },
  { timestamps: true }
);

const teacherModel = new mongoose.model("Teachers", teacherSchema);
module.exports = teacherModel;
