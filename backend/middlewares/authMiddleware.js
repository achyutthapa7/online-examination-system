const jwt = require("jsonwebtoken");
const teacherModel = require("../models/teacher.model");
const studentModel = require("../models/student.model");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.login_token;
  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const [teacher, student] = await Promise.all([
      teacherModel.findOne({ _id: decoded._id }).select("-password"),
      studentModel.findOne({ _id: decoded._id }).select("-password"),
    ]);

    const rootUser = teacher || student;
    req.rootUser = rootUser;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
