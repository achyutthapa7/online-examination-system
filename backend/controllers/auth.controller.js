const z = require("zod");
const studentModel = require("../models/student.model");
const jwt = require("jsonwebtoken");
const teacherModel = require("../models/teacher.model");
const isValidSemester = require("../utils/semesterValidator");
const handleError = (res, error) => {
  console.error(error.message);
  res.status(500).send("Server error");
};

/*

 emailAddress: z
    .string()
    .email("Invalid email format")
    .nonempty("Email address is required"),
  
 
 

*/
const registerStudentSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters long")
    .nonempty("Full name is required"),
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .nonempty("Username is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
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
});
// auth for student
const registerStudent = async (req, res) => {
  try {
    const { fullName, userName, password, year, semester } = req.body;

    // Validate required fields
    if (!fullName || !userName || !password || !year || !semester) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const { success, error } = registerStudentSchema.safeParse(req.body);

    if (error) {
      throw new Error(error.issues[0].message);
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
    //I feel like the validation not necessary here,might be wrong, don't know for sure...
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
    //same here, no validation required here neither
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

const forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;
    console.log(username);
    const student = await studentModel.findOne({
      userName: username,
    });

    const teacher = await teacherModel.findOne({
      userName: username,
    });

    if (!teacher || !student) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = teacher || student;
    if (student.passwordResetRequest) {
      return res.status(400).json({
        message:
          "Password reset request already sent. Please wait for verification",
      });
    }
P
    // update the student's password and reset the password reset request flag
    await studentModel.findByIdAndUpdate(student._id, {
      passwordResetRequest: true,
    });

    // send the password to the student's email address
    // await sendMail(student.emailAddress, password, student.userName);

    res.status(200).json({
      message:
        "Password reset submission successfully. You will be notified by the admins after password reset.",
    });
  } catch (error) {}
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
  forgotPassword,
};
