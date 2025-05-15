import React from "react";
import { FaPlus } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-16">
      {/* Left Section - Text */}
      <div className="md:w-1/2 w-full mb-12 md:mb-0">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-yellow-500 bg-white p-2 rounded-full shadow">
            <FaPlus className="text-xl" />
          </div>
          <span className="text-gray-800 font-medium text-lg">
            Fauget Clinic
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#5535ff] mb-6 leading-tight">
          Health Center for <br /> Medical Care
        </h1>
        <p className="text-base text-gray-600 mb-8">
          We will explore the varied field of Medical Healthcare, covering
          fundamental principles, service delivery, patient care, and medical
          progress.
        </p>
        <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full shadow transition duration-300">
          Get Started
        </button>
      </div>

      {/* Right Section - Illustration */}
      <div className="md:w-1/2 w-full flex justify-center">
        <img
          src="/medical-illustration.png"
          alt="Medical care illustration"
          className="w-full max-w-md"
        />
      </div>
    </div>
  );
};

export default Home;
