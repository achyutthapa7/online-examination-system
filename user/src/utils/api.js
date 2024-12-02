import axios from "axios";

const API_URL = "http://localhost:4000/api";

export const registration = async (
  fullName,
  userName,
  password,
  year,
  semester
) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/registerStudent`,
      {
        fullName,
        userName,
        password,
        year,
        semester,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const getAllStudents = async () => {
  try {
    const response = axios.get(`${API_URL}/admin/getStudent`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error during fetching students:", error);
    throw error;
  }
};

export const login = async (userName, password, role) => {
  try {
    const response = axios.post(
      `${API_URL}/auth/loginUser`,
      { userName, password, role },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const getTeacherDetails = async () => {
  try {
    const response = axios.get(`${API_URL}/teacher/getDetails`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error during fetching teacher details:", error);
    throw error;
  }
};

export const createExam = (title, questions, timeLimit, subject) => {
  try {
    const response = axios.post(
      `${API_URL}/teacher/createExam/${subject}`,
      { title, questions, timeLimit },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during creating exam:", error);
    throw error;
  }
};

export const getExamsForTeacher = async () => {
  try {
    const response = axios.get(`${API_URL}/teacher/getExams`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error during fetching exams:", error);
    throw error;
  }
};
