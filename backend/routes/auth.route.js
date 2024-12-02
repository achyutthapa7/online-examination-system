const {
  registerStudent,
  logout,
  loginAdmin,
  getUserVerificationStatus,
  loginUser,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/registerStudent", registerStudent);
router.post("/loginUser", loginUser);
router.get("/getUserVerificationStatus/:studentId", getUserVerificationStatus);
router.post("/loginAdmin", loginAdmin);
router.post("/logout", authMiddleware, logout);

module.exports = router;
