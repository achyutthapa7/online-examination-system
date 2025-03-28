export const checkVerificationStatus = async (studentId) => {
  return await fetch(
    `http://localhost:4000/api/auth/getUserVerificationStatus/${studentId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
