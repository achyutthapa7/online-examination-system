const assignsubjectModel = require("../models/assignsubject.model");
const examModel = require("../models/exam.model");
const studentModel = require("../models/student.model");
const teacherModel = require("../models/teacher.model");
const handleError = require("../utils/handleError");
const isValidSemester = require("../utils/semesterValidator");
const sendMail = require("../utils/sendMail");

const addTeacher = async (req, res) => {
  try {
    // if (!req.admin) {
    //   return res
    //     .status(403)
    //     .json({ message: "Access denied. You are not admin." });
    // }
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

const getStudentWithPasswordResetRequest = async (req, res) => {
  try {
    const student = await studentModel.find({
      passwordResetRequest: true,
    });
    console.log(student);
  } catch (error) {
    console.log(error);
  }
};

const getTeacherWithPasswordResetRequest = async (req, res) => {
  try {
    const teacher = await teacherModel.find({
      passwordResetRequest: true,
    });
    console.log(teacher);
  } catch (error) {
    console.log(error);
  }
};

const getAllRegisteredStudent = async (req, res) => {
  try {
    const students = await studentModel
      .find({})
      .select("-password")
      .select("-notification");
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

const editAssignSubjectToTeacher = async (req, res) => {
  try {
    const { assignSubjectId } = req.params;
    const { year, semester, subject } = req.body;
    if (!subject || !year || !semester) {
      return res.status(400).json({ msuessage: "Missing required fields" });
    }
    if (!isValidSemester(year, semester)) {
      return res.status(400).json({ message: "Invalid year or semester" });
    }
    const updatedAssignSubjct = await assignsubjectModel.findByIdAndUpdate(
      assignSubjectId,
      {
        $set: { year, semester, subject },
      },
      { new: true }
    );
    res.json(updatedAssignSubjct);
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
    console.log(userId, newPassword);
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

const viewExams = async (req, res) => {
  try {
    const exams = await examModel.find({});

    res.json(exams);
  } catch (error) {
    handleError(res, error);
  }
};

const viewIndividualExam = async (req, res) => {
  res.send("here");
};

// const setDateAndTimeForExams = async (req, res) => {
//   try {
//     const { examId } = req.params;
//     const { day, time } = req.body;
//     if (!examId || !day || !time) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }
//     const exam = await examModel.findByIdAndUpdate(
//       examId,
//       { $set: { day, time } },
//       { new: true }
//     );
//     if (!exam) return res.status(404).json({ message: "Exam not found" });
//     res.json(exam);
//   } catch (error) {
//     handleError(res, error);
//   }
// };

const startExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await examModel.findByIdAndUpdate(
      examId,
      { $set: { isApproved: true } },
      { new: true }
    );
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    res.json(exam);
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
  viewExams,
  // setDateAndTimeForExams,
  startExam,
  getStudentWithPasswordResetRequest,
  viewIndividualExam,
  getTeacherWithPasswordResetRequest,
  editAssignSubjectToTeacher,
};
