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
  // console.log(role);

  try {
    const response = axios.post(
      `${API_URL}/auth${
        role === "Student" ? "/loginStudent" : "/loginTeacher"
      }`,
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
