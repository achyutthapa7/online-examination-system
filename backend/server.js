const dotenv = require("dotenv");
const connectDB = require("./config/db");
const express = require("express");
const adminRoute = require("./routes/admin.route");
const teacherRoute = require("./routes/teacher.route");
const authRoute = require("./routes/auth.route");
const studentRoute = require("./routes/student.route");
const notificationsRoute = require("./routes/notification.route");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;

dotenv.config();
connectDB();

const corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "http://localhost:4174",
    "https://online-examination-system-seven-sable.vercel.app",
    "https://online-examination-system-eghl.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/admin", adminRoute);
app.use("/api/teacher", teacherRoute);
app.use("/api/auth/", authRoute);
app.use("/api/student", studentRoute);
app.use("/api/notifications", notificationsRoute);

// Test route to ensure server is running
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
