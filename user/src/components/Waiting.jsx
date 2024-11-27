import React, { useEffect, useState } from "react";
import { checkVerificationStatus } from "../utils/checkVerificationStatus";
import { useNavigate } from "react-router-dom";
// import { loginTeacher } from "../../../backend/controllers/auth.controller";

const Waiting = () => {
  const [registeredUser, setRegisteredUser] = useState(() => {
    // console.log(registeredUser + " l;m");

    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [isVerified, setIsVerified] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!registeredUser) {
      navigate("/");
    } else {
      setUsername(registeredUser.userName);
    }
  }, [registeredUser, navigate]);

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const res = await checkVerificationStatus(registeredUser._id);
        if (res.ok) {
          const data = await res.json();
          setRegisteredUser(data.user);
          setIsVerified(data.user.isVerified);
        } else {
          console.error("Failed to check verification status");
        }
      } catch (error) {
        console.error("Error checking verification status:", error);
      }
    };
    checkVerification();
  }, [registeredUser, isVerified, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isVerified ? (
        <div className="bg-white shadow-md rounded-lg p-8 w-96 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Welcome, {username}!
          </h2>
          <p className="text-gray-600 mb-6">
            Your account has been successfully verified. You can now log in and
            enjoy our services.
          </p>
          <button
            onClick={() => {
              console.log(registeredUser);
              navigate("/login", { state: registeredUser });
            }}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Log In Here
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-8 w-96 text-center">
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">
            Verification Pending
          </h2>
          <p className="text-gray-600 mb-4">
            Your account is still under review. Please wait while our team
            verifies your details.
          </p>
          <p className="text-gray-500">
            You’ll be notified once the verification is complete. Thank you for
            your patience!
          </p>
        </div>
      )}
    </div>
  );
};

export default Waiting;
