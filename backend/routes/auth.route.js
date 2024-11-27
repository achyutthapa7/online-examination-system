const {
  registerStudent,
  loginStudent,
  logout,
  loginTeacher,
  loginAdmin,
  getUserVerificationStatus,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const checkVerificationStatus = require("../middlewares/checkVerificationStatus");

const router = require("express").Router();

router.post("/registerStudent", registerStudent);
router.post("/loginStudent", checkVerificationStatus, loginStudent);
router.get("/getUserVerificationStatus/:studentId", getUserVerificationStatus);
router.post("/loginTeacher", loginTeacher);
router.post("/loginAdmin", loginAdmin);
router.post("/logout", authMiddleware, logout);
module.exports = router;
