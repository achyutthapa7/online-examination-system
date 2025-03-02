const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    viewedBy: {
      Student: [{ type: String }], // Store student IDs
      Teacher: [{ type: String }], // Store teacher IDs
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
