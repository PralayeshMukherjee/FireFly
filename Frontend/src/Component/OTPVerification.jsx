import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });
  useEffect(() => {
    const isLoginUser = sessionStorage.getItem("isLogin") === "true";
    if (!isLoginUser) {
      console.log("No user is logged in. Redirecting to userLogin...");
      navigate("/Login", { replace: true });
      return;
    }
    if (isLoginUser) {
      console.log("User is logged in. Allowing access.");
      //   navigate("/Main/MainHome", { replace: true });
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!/^\d?$/.test(value)) return; // Only allow digits

    setOtp((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullOtp = Object.values(otp).join(""); // Combine to 6-digit OTP
    const resposnse = await fetch("http://localhost:5173/user/verifyOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp: fullOtp }),
    });
    const data = await resposnse.json();
    if (data.isVerified) {
      sessionStorage.setItem("isVerified", true);
    } else {
      sessionStorage.setItem("isVerified", false);
      alert("Invalid OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="flex w-full max-w-4xl bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white flex flex-col items-center justify-center p-12">
          <h2 className="text-4xl font-extrabold mb-4">Verify Your Account</h2>
          <p className="text-lg text-center max-w-xs">
            Please enter the 6-digit code we just sent to your email to verify
            your account.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-12 bg-white dark:bg-gray-900">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            OTP Verification
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                Enter OTP
              </label>
              <div className="flex space-x-3">
                {["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"].map(
                  (name, i) => (
                    <input
                      key={name}
                      name={name}
                      type="text"
                      maxLength="1"
                      value={otp[name]}
                      onChange={handleChange}
                      className="w-12 h-12 text-center text-lg border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  )
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-lg font-semibold shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
            >
              Verify OTP
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-300">
            Didn't receive the code?{" "}
            <button
              onClick={handleSubmit}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
