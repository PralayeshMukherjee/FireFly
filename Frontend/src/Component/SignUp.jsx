import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    emailId: "",
    password: "",
  });

  const handleChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/user/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerFormData),
      });

      const data = await response.json();

      if (data.isSend) {
        sessionStorage.setItem("isSend", true);
        sessionStorage.setItem("emailId", registerFormData.emailId);
        sessionStorage.setItem("name", registerFormData.name);
        navigate("/OTPVerification");
      } else {
        sessionStorage.setItem("isSend", false);
        alert("User already exists");
      }
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="flex w-full max-w-5xl bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white dark:from-indigo-700 dark:to-purple-700 flex flex-col items-center justify-center p-12">
          <h2 className="text-4xl font-extrabold mb-4">Welcome Aboard!</h2>
          <p className="text-lg text-center max-w-xs">
            Join us today and unlock a world of awesome features tailored just
            for you.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-12 bg-white dark:bg-gray-900">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Sign Up
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300">
                Full Name
              </label>
              <input
                name="name"
                onChange={handleChange}
                type="text"
                placeholder="John Doe"
                className="mt-1 w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300">
                Email Address
              </label>
              <input
                name="emailId"
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300">
                Password
              </label>
              <input
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="********"
                className="mt-1 w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
              />
            </div>

            <button
              type="submit"
              onClick={handelSubmit}
              disabled={loading}
              className={`w-full py-3 mt-6 rounded-xl text-lg font-semibold shadow-md transition-all duration-300
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:from-indigo-600 hover:to-purple-600"
                }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Loading message below the form */}
          {loading && (
            <div className="mt-4 text-center text-indigo-600 font-semibold">
              Creating your account... Please wait ⏳
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <hr className="w-full border-gray-300 dark:border-gray-600" />
            <span className="px-3 text-gray-500 dark:text-gray-400 text-sm font-medium">
              or
            </span>
            <hr className="w-full border-gray-300 dark:border-gray-600" />
          </div>

          <div className="mt-6 space-y-3">
            <button className="w-full flex items-center justify-center py-2 border-2 border-gray-200 dark:border-gray-700 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-3"
              />
              Sign up with Google
            </button>

            <button className="w-full flex items-center justify-center py-2 border-2 border-gray-200 dark:border-gray-700 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="GitHub"
                className="w-5 h-5 mr-3"
              />
              Sign up with GitHub
            </button>
          </div>

          <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
