import { API_URL } from "./api";

export const checkVerificationStatus = async (studentId) => {
  return await fetch(
    `${API_URL}/api/auth/getUserVerificationStatus/${studentId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
