const studentModel = require("../models/student.model");
const jwt = require("jsonwebtoken");
const teacherModel = require("../models/teacher.model");
const isValidSemester = require("../utils/semesterValidator");
const handleError = (res, error) => {
  console.error(error.message);
  res.status(500).send("Server error");
};

// auth for student
const registerStudent = async (req, res) => {
  try {
    const { fullName, userName, password, year, semester } = req.body;

    // Validate required fields
    if (!fullName || !userName || !password || !year || !semester) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!isValidSemester(year, semester)) {
      return res.status(400).json({ message: "Invalid year or semester" });
    }

    const [existingStudent, existingTeacher] = await Promise.all([
      studentModel.findOne({ userName }),
      teacherModel.findOne({ userName }),
    ]);
    if (existingStudent || existingTeacher) {
      return res.status(409).json({ message: "username is already taken" });
    }

    const newStudent = new studentModel({
      fullName,
      userName,
      password,
      year,
      semester,
    });

    const token = await jwt.sign(
      { _id: newStudent._id },
      process.env.SECRET_KEY
    );
    res.cookie("registration_token", token);

    const result = await newStudent.save();
    const studentWithoutPassword = await studentModel
      .findById(result._id)
      .select("-password");
    res.status(201).json({
      message: "Student registered successfully",
      token,
      student: studentWithoutPassword,
    });
  } catch (error) {
    handleError(res, error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, password, role } = req.body;
    if (!userName || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const [teacher, student] = await Promise.all([
      teacherModel.findOne({ userName, role }),
      studentModel.findOne({ userName, role }),
    ]);
    const rootUser = teacher || student;
    if (!rootUser) {
      return res.status(401).json({ message: "User is not found" });
    }
    if (role === "Student" && !rootUser.isVerified) {
      return res.status(402).json({ message: "User is not verified" });
    }

    if (rootUser.password != password) {
      return res.status(403).json({ message: "Invalid email or password" });
    }
    const token = await jwt.sign({ _id: rootUser._id }, process.env.SECRET_KEY);
    res.cookie("login_token", token);
    res.status(200).json({
      message: "login successfull",
      token,
      role: rootUser.role,
      userName: rootUser.userName,
    });
  } catch (error) {
    handleError(res, error);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const adminUserName = process.env.ADMIN_USER;
    const adminPassword = process.env.ADMIN_PASS;
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (userName !== adminUserName || password !== adminPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = await jwt.sign(
      { _id: `admin${Math.random() * 40000}` },
      process.env.SECRET_KEY
    );
    res.cookie("admin_token", token);
    res.json({
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    handleError(res, error);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully", currentUser: req.rootUser });
  } catch (error) {
    handleError(res, error);
  }
};

const getUserVerificationStatus = async (req, res) => {
  const { studentId } = req.params;
  try {
    const user = await studentModel.findById(studentId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  registerStudent,
  loginAdmin,
  logout,
  getUserVerificationStatus,
  loginUser,
};
