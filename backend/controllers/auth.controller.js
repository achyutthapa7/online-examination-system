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

    const existingStudent = await studentModel.findOne({
      userName,
    });
    if (existingStudent) {
      return res.status(409).json({ message: "Email already in use" });
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

const loginStudent = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const student = await studentModel.findOne({ userName });
    if (!student || student.password != password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = await jwt.sign({ _id: student._id }, process.env.SECRET_KEY);
    res.cookie("login_token", token);
    const studentWithoutPassword = await studentModel
      .findOne({ userName })
      .select("-password");
    res.json({
      message: "Logged in successfully",
      token,
      student: studentWithoutPassword,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// auth for teacher

const loginTeacher = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const teacher = await teacherModel.findOne({ userName });
    if (!teacher || teacher.password != password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // if (!teacher.isAssigned) {
    //   return res
    //     .status(403)
    //     .json({ message: "Teacher is not assigned to a class" });
    // }
    const token = await jwt.sign({ _id: teacher._id }, process.env.SECRET_KEY);
    res.cookie("login_token", token);
    const teacherWithoutPassword = await teacherModel
      .findOne({ userName })
      .select("-password");
    res.json({
      message: "Logged in successfully",
      token,
      teacher: teacherWithoutPassword,
    });
  } catch (error) {
    handleError(res, error);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const admiUserName = process.env.ADMIN_USER;
    const adminPassword = process.env.ADMIN_PASS;
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (userName !== admiUserName || password !== adminPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = await jwt.sign(
      { _id: `admin${Math.random() * 10000}` },
      process.env.SECRET_KEY
    );
    res.cookie("login_token", token);
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
  loginStudent,
  loginTeacher,
  loginAdmin,
  logout,
  getUserVerificationStatus,
};
