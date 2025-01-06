const assignsubjectModel = require("../models/assignsubject.model");
const examModel = require("../models/exam.model");
const studentModel = require("../models/student.model");
const teacherModel = require("../models/teacher.model");
const handleError = require("../utils/handleError");
const isValidSemester = require("../utils/semesterValidator");
const sendMail = require("../utils/sendMail");

const z = require("zod");
const addTeacherSchema = z.object({
  emailAddress: z
    .string()
    .email("Invalid email format")
    .nonempty("Email address is required"),
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .nonempty("Username is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters long")
    .nonempty("Full name is required"),
});

const addTeacher = async (req, res) => {
  try {
    // if (!req.admin) {
    //   return res
    //     .status(403)
    //     .json({ message: "Access denied. You are not admin." });
    // }
    const { emailAddress, userName, password, fullName } = req.body;

    const { success, error } = addTeacherSchema.safeParse(req.body);

    if (success) {
      if (!emailAddress || !userName || !password || !fullName) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const [existingStudent, existingTeacherUsername, existingTeacherEmail] =
        await Promise.all([
          studentModel.findOne({ userName }),
          teacherModel.findOne({ userName }),
          teacherModel.findOne({ emailAddress }),
        ]);

      if (existingStudent || existingTeacherUsername || existingTeacherEmail) {
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
      return res.json({ message: "Teacher added successfully", teacher });
    }
    if (error) {
      throw new Error(error.issues[0].message);
    }
  } catch (e) {
    handleError(res, e);
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
    console.error(error);
  }
};

const getTeacherWithPasswordResetRequest = async (req, res) => {
  try {
    const teacher = await teacherModel.find({
      passwordResetRequest: true,
    });
    console.log(teacher);
  } catch (error) {
    console.error(error);
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

const assignSubjectSchema = z.object({
  year: z
    .number()
    .int("Year must be an integer")
    .positive("Year must be a positive number")
    .min(1, "Year must be greater than 0"),

  semester: z
    .number()
    .int("Semester must be an integer")
    .positive("Semester must be a positive number")
    .min(1, "Semester must be at least 1"),

  subject: z.string().nonempty("Subject is required"),
});

const assignSubjectToTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { year, semester, subject } = req.body;
    const { success, error } = assignSubjectSchema.safeParse(req.body);
    if (success) {
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
    }
    if (error) {
      throw new Error(error.issues[0].message);
    }
  } catch (error) {
    handleError(res, error);
  }
};

const editAssignSubjectToTeacher = async (req, res) => {
  try {
    const { assignSubjectId } = req.params;
    const { year, semester, subject } = req.body;
    const { success, error } = assignSubjectSchema.safeParse(req.body);
    if (success) {
      if (!subject || !year || !semester) {
        return res.status(400).json({ message: "Missing required fields" });
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
      res.json(updatedAssignSubject);
    }
    if (error) {
      throw new Error(error.issues[0].message);
    }
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
const newPasswordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .nonempty("Password is required");

const updateUserPassword = async (req, res) => {
  try {
    const { userId } = req.params;

    const { newPassword } = req.body;

    const { success, error } = newPasswordSchema.safeParse(newPassword);

    if (error) {
      throw new Error(error.issues[0].message);
    }
    // console.log(userId, newPassword);
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

const messageSchema = z
  .string()
  .nonempty("Message is required to publish notice");

const notifyUsersForExam = async (req, res) => {
  try {
    const { message } = req.body;
    const { success, error } = messageSchema.safeParse(message);
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
  try {
    const { examId } = req.params;
    const exams = await examModel.find({ _id: examId }).populate("questions");

    res.json(exams);
  } catch (error) {
    handleError(res, error);
  }
};

const getExams = async (req, res) => {};
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

// ! where to put this to check continuously??
//! const exam1 = await examModel.find({ _id: examId });
//! const endTime = exam1.endTime;
//! if (Date.now() > endTime) {
//!   console.log("time up");
//!   await examModel.findByIdAndUpdate(
//!     examId,
//!     { $set: { isCompleted: true } },
//!     { new: true }
//!   );
//! }

const checkStatus = async () => {
  const exam1 = await examModel.find({ _id: examId });
  const endTime = exam1.endTime;
  if (Date.now() > endTime) {
    console.log("time up");
    await examModel.findByIdAndUpdate(
      examId,
      { $set: { isCompleted: true } },
      { new: true }
    );
  }
};
const startExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const { timeLimit } = req.body;
    const exam = await examModel.findByIdAndUpdate(
      examId,
      {
        $set: { isApproved: true, startTime: Date.now() },
        endTime: Date.now() + timeLimit * 60000,
      },
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
  checkStatus,
  // setDateAndTimeForExams,
  startExam,
  getStudentWithPasswordResetRequest,
  viewIndividualExam,
  getTeacherWithPasswordResetRequest,
  editAssignSubjectToTeacher,
};
