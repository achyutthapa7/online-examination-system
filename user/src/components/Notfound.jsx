import React from "react";

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
      <h1 className="text-8xl font-extrabold text-red-500 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </p>
      <p className="text-gray-500 mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        className="px-8 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default Notfound;
