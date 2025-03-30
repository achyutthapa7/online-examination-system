import axios from "axios";

// const API_URL = "http://localhost:4000/api";
const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL_PRODUCTION
    : import.meta.env.VITE_API_URL_DEVELOPMENT;

export const login = async (userName, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/loginAdmin`,
      { userName, password },
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

export const getAllTeachers = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/getTeacher`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error during fetching teachers:", error);
    throw error;
  }
};

export const getAllStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/getStudent`, {
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

export const getStudentWithPasswordResetRequest = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/getStudentWithPasswordResetRequest`,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getTeacherWithPasswordResetRequest = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/getTeacherWithPasswordResetRequest`,
      { withCredentials: true }
    );
  } catch (error) {
    console.error(error);
  }
};
export const assignSubjectToTeacher = async (
  teacherId,
  year,
  semester,
  subject
) => {
  try {
    const response = await axios.patch(
      `${API_URL}/admin/assignSubjectToTeacher/${teacherId}`,
      { subject, year, semester },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during assigning subject to teacher:", error);
    throw error;
  }
};

export const addTeacher = async (
  emailAddress,
  userName,
  password,
  fullName
) => {
  try {
    const response = await axios.post(
      `${API_URL}/admin/addTeacher`,
      { emailAddress, userName, password, fullName },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during adding teacher:", error);
    throw error;
  }
};

export const verifyStudent = async (studentId) => {
  try {
    const response = await axios.patch(
      `${API_URL}/admin/verifyStudent/${studentId}`,

      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during verifying student:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/admin/deleteUser/${userId}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during deleting user:", error);
    throw error;
  }
};

export const updateUserPassword = async (userId, newPassword) => {
  try {
    const response = await axios.patch(
      `${API_URL}/admin/updateUserPassword/${userId}`,
      { newPassword },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during updating user password:", error);
    throw error;
  }
};

export const notifyUsers = async (message) => {
  try {
    const response = await axios.patch(
      `${API_URL}/admin/notifyUsersForExam`,
      { message },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error during notifying users:", error);
    throw error;
  }
};

export const allExams = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/viewExams`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const startExam = async (examId, timeLimit) => {
  try {
    const response = await axios.patch(`${API_URL}/admin/startExam/${examId}`, {
      withCredentials: true,
      timeLimit,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Error during starting exam:", error);
    throw error;
  }
};

export const editAssignSubjectToTeacher = async (
  assignSubjectId,
  year,
  semester,
  subject
) => {
  try {
    const response = await axios.put(
      `${API_URL}/admin/editAssignSubjectToTeacher/${assignSubjectId}`,
      { year, semester, subject },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during editing assigned subject to teacher:", error);
    throw error;
  }
};

export const getExamDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/admin/viewExams/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error during fetching teachers:", error);
    throw error;
  }
};
