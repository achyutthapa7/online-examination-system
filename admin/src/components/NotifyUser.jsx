import React, { useState } from "react";
import { notifyUsers } from "../utils/api"; // Adjust the path as per your project structure

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
      const response = await notifyUsers(message);
      console.log(response);
      if (response.status === 200) {
        setSuccessMessage("Users notified successfully!");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Notify Users
        </h2>
        <form onSubmit={handleNotifyUsers}>
          {/* Message Input */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Notification Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
              rows={4}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the notification message here"
            ></textarea>
          </div>

          {/* Success and Error Messages */}
          {successMessage && (
            <div className="mb-4 text-green-600 text-sm font-semibold">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 text-red-600 text-sm font-semibold">
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
