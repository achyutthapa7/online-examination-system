const assignsubjectModel = require("../models/assignsubject.model");
const studentModel = require("../models/student.model");
const teacherModel = require("../models/teacher.model");
const handleError = require("../utils/handleError");
const isValidSemester = require("../utils/semesterValidator");
const sendMail = require("../utils/sendMail");

const addTeacher = async (req, res) => {
  try {
    const { emailAddress, userName, password, fullName } = req.body;
    if (!emailAddress || !userName || !password || !fullName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const [existingStudent, existingTeacher] = await Promise.all([
      studentModel.findOne({ userName }),
      teacherModel.findOne({ userName }),
    ]);
    if (existingStudent || existingTeacher) {
      return res.status(409).json({ message: "username is already taken" });
    }
    const teacher = new teacherModel({
      emailAddress,
      userName,
      password,
      fullName,
      isAssigned: false,
    });
    // await sendMail(emailAddress, password, userName);
    await teacher.save();
    res.json({ message: "Teacher added successfully", teacher });
  } catch (error) {
    handleError(res, error);
  }
};

const getAllRegisteredTeachers = async (req, res) => {
  try {
    const teachers = await teacherModel
      .find({})
      .select("-notifications")
      .populate("assignedSubjects");
    res.json(teachers);
  } catch (error) {
    handleError(res, error);
  }
};

const getAllRegisteredStudent = async (req, res) => {
  try {
    const students = await studentModel.find({}).select("-notifications");
    res.json(students);
  } catch (error) {
    handleError(res, error);
  }
};

const assignSubjectToTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { year, semester, subject } = req.body;
    if (!teacherId || !subject || !year || !semester) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!isValidSemester(year, semester)) {
      return res.status(400).json({ message: "Invalid year or semester" });
    }
    const existingSubject = await assignsubjectModel.findOne({
      teacherId,
      year,
      semester,
      subject,
    });
    if (existingSubject) {
      return res.status(400).json({ message: "Subject already exists" });
    }
    const newSubject = new assignsubjectModel({
      teacherId,
      year,
      semester,
      subject,
    });
    await newSubject.save();
    const updatedTeacher = await teacherModel
      .findByIdAndUpdate(
        teacherId,
        {
          $push: { assignedSubjects: newSubject._id },
          $set: { isAssigned: true },
        },
        { new: true }
      )
      .populate("assignedSubjects");

    if (!updatedTeacher)
      return res.status(404).json({ message: "teacher not found" });
    res.json(updatedTeacher);
  } catch (error) {
    handleError(res, error);
  }
};
const verifyStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await studentModel.findByIdAndUpdate(
      studentId,
      { $set: { isVerified: true } },
      { new: true }
    );

    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    handleError(res, error);
  }
};
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return res.status(404).json({ message: " user is not found " });
    await studentModel.findByIdAndDelete(userId);
    await teacherModel.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};
const updateUserPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;
    if (!userId) return res.status(404).json({ message: "User is not found " });
    const student = await studentModel.findByIdAndUpdate(
      userId,
      { $set: { password: newPassword } },
      { new: true }
    );
    const teacher = await teacherModel.findByIdAndUpdate(
      userId,
      { $set: { password: newPassword } },
      { new: true }
    );

    if (!teacher && !student)
      return res.status(404).json({ message: "User not found" });
    res.json(student || teacher);
  } catch (error) {
    handleError(res, error);
  }
};

const notifyUsersForExam = async (req, res) => {
  try {
    const { message } = req.body;
    const notification = {
      message,
      date: new Date(), // Explicitly set the current date and time
    };
    await studentModel.updateMany(
      { isVerified: true },
      { $push: { notifications: notification } }
    );
    await teacherModel.updateMany(
      { isAssigned: true },
      { $push: { notifications: notification } }
    );
    res.json({ message: "Notifications sent successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getAllRegisteredTeachers,
  getAllRegisteredStudent,
  assignSubjectToTeacher,
  verifyStudent,
  deleteUser,
  updateUserPassword,
  notifyUsersForExam,
  addTeacher,
};
