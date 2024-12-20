const {
  getAllRegisteredTeachers,
  getAllRegisteredStudent,
  assignSubjectToTeacher,
  verifyStudent,
  deleteUser,
  updateUserPassword,
  notifyUsersForExam,
  addTeacher,
  viewExams,
  getStudentWithPasswordResetRequest,
  getTeacherWithPasswordResetRequest,
  startExam,
  viewIndividualExam,
  // setDateAndTimeForExams,
} = require("../controllers/admin.controller");

const router = require("express").Router();

router.get("/getTeacher", getAllRegisteredTeachers);
router.get("/getStudent", getAllRegisteredStudent);
router.get(
  "/getStudentWithPasswordResetRequest",
  getStudentWithPasswordResetRequest
);
router.get(
  "/getTeacherWithPasswordResetRequest",
  getTeacherWithPasswordResetRequest
);
router.post("/addTeacher", addTeacher);
router.patch("/assignSubjectToTeacher/:teacherId", assignSubjectToTeacher);
router.patch("/verifyStudent/:studentId", verifyStudent);
router.delete("/deleteUser/:userId", deleteUser);
router.patch("/updateUserPassword/:userId", updateUserPassword);
router.patch("/notifyUsersForExam", notifyUsersForExam);
router.get("/viewExams", viewExams);
router.get("/viewExams/:subjectId", viewIndividualExam);
// router.post("/setDateAndTimeForExams/:examId", setDateAndTimeForExams);
router.patch("/startExam/:examId", startExam);
module.exports = router;
