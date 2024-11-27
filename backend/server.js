const dotenv = require("dotenv");
const connectDB = require("./config/db");
const express = require("express");
const adminRoute = require("./routes/admin.route");
const teacherRoute = require("./routes/teacher.route");
const authRoute = require("./routes/auth.route");
const studentRoute = require("./routes/student.route");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;
dotenv.config();
connectDB();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/admin", adminRoute);
app.use("/api/teacher", teacherRoute);
app.use("/api/auth/", authRoute);
app.use("/api/student", studentRoute);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
