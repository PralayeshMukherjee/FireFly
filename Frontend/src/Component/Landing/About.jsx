import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white dark:from-gray-900 dark:to-gray-800 p-6 flex flex-col items-center">
      <div className="max-w-4xl bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 mt-10">
        <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
          About Firefly
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
          <strong>Firefly</strong> is an intelligent chatbot platform designed
          to enhance user experience by providing instant support and guidance.
          Whether you're a new user or need help navigating the platform,
          Firefly is here to assist you 24/7.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-500 dark:text-indigo-300 mt-6 mb-2">
          🌟 Why Use Firefly?
        </h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-300 space-y-1">
          <li>Quick and easy login with Google</li>
          <li>Instant chatbot responses to your queries</li>
          <li>Secure and smooth user experience</li>
          <li>Designed for both mobile and desktop users</li>
          <li>Always available for help and support</li>
        </ul>

        <h2 className="text-2xl font-semibold text-indigo-500 dark:text-indigo-300 mt-6 mb-2">
          💡 Our Mission
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Firefly aims to make digital support more accessible and
          user-friendly. We believe in simplifying communication and making help
          available anytime you need it.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-500 dark:text-indigo-300 mt-6 mb-2">
          🙌 Acknowledgements
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          We sincerely thank everyone who contributed to the development of
          Firefly. Special appreciation goes to those who helped with the
          design, documentation, coordination, and testing. Your support and
          feedback have been instrumental in shaping a user-friendly platform.
        </p>
      </div>
    </div>
  );
};

export default About;
