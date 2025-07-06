import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/login?emailId=${
          formData.emailId
        }&password=${formData.password}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.result === "0") {
        alert("Login successful");
        sessionStorage.setItem("isLogin", true);
        sessionStorage.setItem("isGoogleUser", false);
        navigate("/chatbot", { replace: true });
      } else if (data.result === "1") {
        alert("Invalid password");
      } else if (data.result === "2") {
        alert("User not found");
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/oauth2/authorization/google`;
  };

  const handleGithubLogin = () => {
    alert("GitHub login clicked");
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-16 bg-gradient-to-r from-blue-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-6xl grid grid-cols-2 gap-8 bg-white p-16 rounded-3xl shadow-2xl dark:bg-gray-900">
        <div className="hidden md:flex flex-col justify-center bg-blue-600 text-white rounded-2xl p-12 dark:bg-gray-800">
          <h2 className="text-5xl font-bold mb-6">Welcome Back!</h2>
          <p className="text-xl">
            Log in to access your dashboard and manage your account.
          </p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center dark:text-white">
            Sign in to Your Account
          </h2>
          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                name="emailId"
                className="w-full px-5 py-4 border border-gray-300 bg-white text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-5 py-4 border border-gray-300 bg-white text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              onClick={handleLogin}
              className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300 font-semibold text-lg"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 flex flex-col gap-4">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-xl bg-white text-black hover:bg-gray-100 transition text-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
            >
              <FcGoogle className="text-2xl" /> Sign in with Google
            </button>
            <button
              onClick={handleGithubLogin}
              className="flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-xl bg-white text-black hover:bg-gray-100 transition text-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
            >
              <FaGithub className="text-2xl" /> Sign in with GitHub
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
