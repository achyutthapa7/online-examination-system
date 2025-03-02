const {
  getNotification,
  markNotificationsAsRead,
} = require("../controllers/notification.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/getNotifications", authMiddleware, getNotification);
router.put(
  "/markNotificationsAsRead/:role/:userName",
  authMiddleware,
  markNotificationsAsRead
);

module.exports = router;
