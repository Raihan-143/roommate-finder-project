import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import notFoundAnimation from "../assets/lottie/not-found.json"; // Make sure this path is correct

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center px-4 bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <Lottie animationData={notFoundAnimation} loop={true} />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mt-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-2">
        Sorry, the page you are looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
