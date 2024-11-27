const jwt = require("jsonwebtoken");
const studentModel = require("../models/student.model");
const checkVerificationStatus = async (req, res, next) => {
  try {
    const token = req.cookies?.registration_token;
    if (!token)
      return res.status(401).json({ message: "User is not registered" });
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const student = await studentModel.findOne({ _id: decoded._id });
    if (!student.isVerified) {
      return res.status(403).json({ message: "User is not verified" });
    }
    req.student = student;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = checkVerificationStatus;
