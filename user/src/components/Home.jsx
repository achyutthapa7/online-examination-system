import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between container mx-auto px-6 py-16">
        {/* Text Section */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to EduPortal
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Empowering students and teachers with seamless access to learning
            resources, exams, and notifications. Join us to enhance your
            learning and teaching experience.
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-blue-500 text-white px-6 py-3 rounded font-semibold hover:bg-blue-600 transition"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="text-blue-500 font-semibold hover:text-blue-700 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="md:w-1/2">
          <img
            src="https://via.placeholder.com/600x400"
            alt="Learning illustration"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Why Choose EduPortal?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="bg-blue-500 text-white w-16 h-16 flex items-center justify-center mx-auto rounded-full mb-4">
                📚
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Learning Resources
              </h3>
              <p className="text-gray-600">
                Access curated materials and stay ahead in your learning
                journey.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="bg-green-500 text-white w-16 h-16 flex items-center justify-center mx-auto rounded-full mb-4">
                🧑‍🏫
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Teacher Support
              </h3>
              <p className="text-gray-600">
                Tools for teachers to manage exams, notifications, and student
                progress.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="bg-yellow-500 text-white w-16 h-16 flex items-center justify-center mx-auto rounded-full mb-4">
                📢
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Exam Notifications
              </h3>
              <p className="text-gray-600">
                Stay informed with timely exam updates and announcements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} EduPortal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
