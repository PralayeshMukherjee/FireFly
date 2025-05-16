import React from "react";

const App = () => {
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

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                Enter OTP
              </label>
              <div className="flex space-x-3">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength="1"
                      className="w-12 h-12 text-center text-lg border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  ))}
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
            <button className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
