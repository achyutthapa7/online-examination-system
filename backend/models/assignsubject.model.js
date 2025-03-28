const mongoose = require("mongoose");
const assignsubjectSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teachers",
    },
    year: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4],
    },
    semester: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    subject: {
      type: String,
    },
  },
  { timestamps: true }
);
const assignsubjectModel = new mongoose.model(
  "assignSubject",
  assignsubjectSchema
);
module.exports = assignsubjectModel;
