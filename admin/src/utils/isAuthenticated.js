import { jwtDecode } from "jwt-decode";
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    jwtDecode(token);
    return true;
  } catch (error) {
    console.error("Failed to authenticate user:", error);
    return false;
  }
};
