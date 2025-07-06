import React from "react";
import { FaPlus } from "react-icons/fa";
import homePageSvg from "../../assets/homePageSvg.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f9f9ff] dark:bg-gray-900 flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-16">
      {/* Left Section - Text */}
      <div className="md:w-1/2 w-full mb-12 md:mb-0">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-yellow-500 bg-white dark:bg-gray-800 p-2 rounded-full shadow">
            <FaPlus className="text-xl" />
          </div>
          <span className="text-gray-800 dark:text-gray-200 font-medium text-lg">
            FireFly
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#5535ff] dark:text-yellow-400 mb-6 leading-tight">
          Health ChatBot <br /> Medical Care
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
          We will explore the varied field of Medical Healthcare, covering
          fundamental principles, service delivery, patient care, and medical
          progress.
        </p>
        <Link
          to={"/signup"}
          className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-black dark:text-white font-semibold rounded-full shadow transition duration-300"
        >
          Get Started
        </Link>
      </div>

      {/* Right Section - Illustration */}
      <div className="md:w-1/2 w-full flex justify-center">
        <img
          src={homePageSvg}
          alt="Medical care illustration"
          className="w-full max-w-md"
        />
      </div>
    </div>
  );
};

export default Home;
