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
    // console.error("Error during fetching exams:", error);
    throw error;
  }
};

export const getStudentExams = async () => {
  try {
    const response = await axios.get(`${API_URL}/student/getExams`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    // console.error("Error during fetching exams:", error);
    throw error;
  }
};

export const nextExams = async () => {
  try {
    const response = axios.get(`${API_URL}/student/getUpcomingExams`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error during getting exam:", error);
    throw error;
  }
};

export const submitExams = async (answers, examId) => {
  try {
    const response = axios.post(
      `${API_URL}/student/submitExam/${examId}`,
      { answers },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during submitting exams:", error);
    throw error;
  }
};

export const getExamQuestion = async (examId) => {
  try {
    const response = axios.get(`${API_URL}/student/getExamQuestion/${examId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error during getting exam:", error);
    throw error;
  }
};

<<<<<<< HEAD
export const getYearAndSemester = async (subject) => {
  try {
    const response = axios.post(`${API_URL}/student/getYearAndSemester`, {
=======
export const getYearAndSemester = async () => {
  try {
    const response = axios.get(`${API_URL}/student/getYearAndSemester`, {
>>>>>>> 7de29b5 (Setting Up Some Structures)
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
<<<<<<< HEAD
      body:{subject:subject}
=======
>>>>>>> 7de29b5 (Setting Up Some Structures)
    });

    return response;
  } catch (error) {
    console.error("Error during fetching courses:", error);
    throw error;
  }
};
