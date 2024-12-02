import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const Dashboard = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const token = localStorage.getItem("login_token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  if (role === "Teacher") return <>unauthorized access</>;
  return (
    <div>
      Dashboard
      <>
        <Outlet />
      </>
    </div>
  );
};

export default Dashboard;
