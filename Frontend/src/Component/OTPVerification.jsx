import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OTPVerification = () => {
  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const isLoginUser = sessionStorage.getItem("isSend") === "true";
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
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = { ...otp, [`otp${index + 1}`]: value };
    setOtp(updatedOtp);

    // Move focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const finalSubmit = async (formData) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/user/success`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    if (data.isSuccessfullyRegister) {
      toast.success("✅ User registered successfully");
      sessionStorage.setItem("isSuccessfullyRegister", true);
      navigate("/chatbot", { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullOtp = Object.values(otp).join(""); // Combine to 6-digit OTP
    console.log(fullOtp);
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/user/verifyOtp?otp=${fullOtp}&emailId=${sessionStorage.getItem(
        "emailId"
      )}&name=${sessionStorage.getItem("name")}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.isVerfied) {
      sessionStorage.setItem("isVerfied", true);
      toast.success("✅ OTP verified successfully");
      const updatedData = {
        name: sessionStorage.getItem("name"),
        emailId: sessionStorage.getItem("emailId"),
        password: sessionStorage.getItem("password"),
      };
      finalSubmit(updatedData);
    } else {
      sessionStorage.setItem("isVerfied", false);
      toast.warn("⚠️ Invalid OTP");
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[`otp${index + 1}`] && index > 0) {
      inputRefs.current[index - 1]?.focus();
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
                      onChange={(e) => handleChange(e, i)}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      ref={(el) => (inputRefs.current[i] = el)}
                      className="w-12 h-12 text-center text-lg border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
                    />
                  )
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-lg font-semibold shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
            >
              {loading ? "Verifing OTP..." : "Verify OTP"}
            </button>
          </form>
          {/* Loading message below the form */}
          {loading && (
            <div className="mt-4 cursor-progress text-center text-indigo-600 font-semibold">
              Verifing your OTP... Please wait ⏳
            </div>
          )}

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
