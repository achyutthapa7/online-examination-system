const notificationModel = require("../models/notifications.model");

const getNotification = async (req, res) => {
  try {
    const notifications = await notificationModel
      .find({})
      .sort({ createdAt: -1 });
    if (notifications.length < 1) {
      return res.status(200).json({ message: "No notifications found" });
    }
    if (req.rootUser.isVerified || req.rootUser.isAssigned) {
      res.json(notifications);
    } else {
      res.status(401).json({ message: " unauthorized" });
    }
  } catch (error) {
    handleError(res, error);
  }
};

const markNotificationsAsRead = async (req, res) => {
  try {
    const { role, userName } = req.params; // Get role and username

    if (!["Student", "Teacher"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const notifications = await notificationModel.find({});

    notifications.forEach(async (notification) => {
      if (!notification.viewedBy[role].includes(userName)) {
        notification.viewedBy[role].push(userName); // Store username instead of userId
        await notification.save();
      }
    });

    res.json({
      success: true,
      message: `Notifications marked as read for ${userName} (${role})`,
    });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = { getNotification, markNotificationsAsRead };
