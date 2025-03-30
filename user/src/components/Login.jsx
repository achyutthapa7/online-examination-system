import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkVerificationStatus } from "../utils/checkVerificationStatus";
import { login } from "../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Login = () => {
  const registeredUser = JSON.parse(localStorage.getItem("user"));
  const login_token = localStorage.getItem("login_token");
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  useEffect(() => {
    if (login_token) {
      if (role === "Teacher") navigate("/dashboard/teacher");
      if (role === "Student") navigate("/dashboard/student");
    }
  }, [login_token, role]);

  const data = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const res = await checkVerificationStatus(registeredUser?._id);
        if (res.status === 200 || res.status === 201) {
          const data = await res.json();
          if (data?.user.role === "Student" && !data.user.isVerified) {
            navigate("/verifying");
          }
        } else {
          console.error("Failed to check verification status");
        }
      } catch (error) {
        console.error("Error checking verification status:", error);
      }
    };
    if (registeredUser) {
      checkVerification();
    }
  }, [registeredUser, navigate]);

  const [credentials, setCredentials] = useState({
    userName: data.state?.userName || "",
    password: "",
    role: "Student",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const { userName, password, role } = credentials;
    try {
      if (!userName || !password || !role) {
        toast.warn("All fields are required.", { autoClose: 250 });
        setLoading(false);
        return;
      }

      const res = await login(userName, password, role);

      if (res.status === 200) {
        localStorage.removeItem("registration_token");
        localStorage.removeItem("user");
        localStorage.setItem("login_token", res.data.token);
        localStorage.setItem("username", res.data.userName);
        localStorage.setItem("role", res.data.role);
        toast.success("Logged In Successfully.", { autoClose: 250 });

        if (res.data.role === "Teacher") {
          navigate("/dashboard/teacher");
        } else {
          navigate("/dashboard/student");
        }
        window.location.reload();
      }
    } catch (error) {
      if (error.status === 401) toast.error("User not found");
      else if (error.status === 402) toast.error("User is not verified");
      else if (error.status === 403) toast.error("Invalid password");
      else toast.error("Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              disabled={!!data.state}
              type="text"
              id="userName"
              name="userName"
              value={credentials.userName}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={credentials.role}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>

          {error && (
            <div className="mb-4 text-red-600 text-sm font-semibold">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded font-semibold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register here
          </Link>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          <Link to="/forgot-password" className="text-blue-500">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
