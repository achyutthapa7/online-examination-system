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
    //  if (!userName || !password) {
    //   return res.status(400).json({ message: "Missing required fields" });
    // }
    // if (userName !== adminUserName || password !== adminPassword) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }
    console.log("h");
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

export const createExam = (subject) => {
  try {
    const response = axios.post(
      `${API_URL}/teacher/createExam/${subject}`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during creating exam:", error);
    throw error;
  }
};

export const deleteExam = (examId) => {
  try {
    const response = axios.delete(`${API_URL}/teacher/deleteExam/${examId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error during deleting exam:", error);
    throw error;
  }
};
export const saveExam = (examId) => {
  try {
    const response = axios.post(
      `${API_URL}/teacher/saveExam/${examId}`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during saving exam:", error);
    throw error;
  }
};
export const getSavedExam = async () => {
  try {
    const response = await axios.get(`${API_URL}/teacher/getSavedExam`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      return "No saved exam";
    }
  } catch (error) {
    console.error("Error during fetching saved exam:", error);
    throw error;
  }
};
export const createQuestion = (
  examId,
  title,
  timeLimit,
  questionText,
  options,
  correctAnswer
) => {
  try {
    console.log("here");
    const response = axios.post(
      `${API_URL}/teacher/createQuestions/${examId}`,
      { title, timeLimit, questionText, options, correctAnswer },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during creating question:", error);
    throw error;
  }
};
export const removeQuestions = (questionId, examId) => {
  try {
    const response = axios.delete(
      `${API_URL}/teacher/removeQuestions/${questionId}`,
      {
        data: { examId },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during removing question:", error);
    throw error;
  }
};

export const updateQuestion = (
  questionId,
  questionText,
  options,
  correctAnswer
) => {
  try {
    const response = axios.put(
      `${API_URL}/teacher/updateQuestion/${questionId}`,
      { questionText, options, correctAnswer },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during updating question:", error);
    throw error;
  }
};

export const getExamById = async (examId) => {
  try {
    const response = axios.get(`${API_URL}/teacher/getExamById/${examId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error during fetching exam:", error);
    throw error;
  }
};

export const publishExam = async (examId) => {
  try {
    const response = axios.patch(
      `${API_URL}/teacher/publishExam/${examId}`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during publishing exam:", error);
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
    // console.log(response);
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
    const response = await axios.get(
      `${API_URL}/student/getExamQuestion/${examId}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error during getting exam:", error);
    throw error;
  }
};

export const getYearAndSemester = async (username) => {
  try {
    if (username) {
      const response = axios.post(
        `${API_URL}/student/getYearAndSemester`,
        { userName: username },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    }
  } catch (error) {
    console.error("Error during fetching courses:", error);
    throw error;
  }
};
