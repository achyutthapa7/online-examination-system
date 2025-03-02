import React, { useState } from "react";
import { notifyUsers } from "../utils/api"; // Adjust the path as per your project structure
import { toast } from "react-toastify";
const NotifyUser = () => {
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleNotifyUsers = async (e) => {
    e.preventDefault();

    if (!message) {
      setErrorMessage("Message cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const response = await notifyUsers(message.trim());
      if (response.status === 200) {
        toast.success("Users notified successfully!");
        setMessage("");
      }
    } catch (error) {
      console.error("Error notifying users:", error);
      setErrorMessage("Failed to notify users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Notify Users
        </h2>
        <form onSubmit={handleNotifyUsers}>
          {/* Message Input */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Notification Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the notification message here"
            ></textarea>
          </div>

          {/* Success and Error Messages */}
          {successMessage && (
            <div className="mb-4 text-sm font-semibold text-green-600">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 text-sm font-semibold text-red-600">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 rounded text-white font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Sending..." : "Notify Users"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotifyUser;
