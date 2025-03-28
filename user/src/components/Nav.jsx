import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL_PRODUCTION
    : import.meta.env.VITE_API_URL_DEVELOPMENT;
const fetchNotifications = async () => {
  const response = await fetch(`${API_URL}/notifications/getNotifications`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json();
};

const markNotificationsAsRead = async (role, userName) => {
  const response = await fetch(
    `${API_URL}/notifications/markNotificationsAsRead/${role}/${userName}`,
    {
      method: "PUT",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to mark notifications as read");
  }

  return response.json();
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

const handleLogout = () => {
  if (window.confirm("Are you sure you want to log out?")) {
    localStorage.removeItem("login_token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.href = "/login";
  }
};

const Nav = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const login_token = localStorage.getItem("login_token");
  const userName = localStorage.getItem("username") || "User";
  const role = localStorage.getItem("role");

  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  const unreadNotifications =
    notifications.length > 0 &&
    notifications?.filter(
      (notification) =>
        notification.viewedBy &&
        !notification.viewedBy[role]?.includes(userName)
    );

  const unreadCount = unreadNotifications.length;

  const { mutate } = useMutation({
    mutationFn: () => markNotificationsAsRead(role, userName),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
    if (!showDropdown && unreadCount > 0) {
      mutate();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          EduPortal
        </Link>
        <div className="space-x-4 flex items-center relative">
          {login_token ? (
            <>
              {/* Notification Bell */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={handleDropdownToggle}
                  className="text-gray-600 hover:text-gray-900 transition relative"
                >
                  <FaBell size={30} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Dropdown Content */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200">
                    <div className="p-3 border-b bg-gray-100 font-semibold text-gray-700">
                      Notifications
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification._id}
                            className={`flex items-start gap-3 p-3 border-b last:border-none transition-all ${
                              unreadNotifications.includes(notification)
                                ? "bg-gray-100"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <div
                              className={`w-2 h-2 mt-1.5 rounded-full ${
                                unreadNotifications.includes(notification)
                                  ? "bg-red-500"
                                  : "bg-gray-400"
                              }`}
                            ></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800">
                                {notification.title || "New Notification"}
                              </p>
                              <p className="text-xs text-gray-600">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {formatDate(notification.createdAt)}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-gray-500 text-sm">
                          No new notifications
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Avatar */}
              <Link
                to={`/dashboard${role === "Teacher" ? "/teacher" : "/student"}`}
              >
                <div
                  className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-semibold"
                  title={userName}
                >
                  {userName.charAt(0).toUpperCase()}
                </div>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="py-2 px-4 text-white transition bg-red-600 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-blue-500 font-semibold hover:text-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
export { handleLogout };
