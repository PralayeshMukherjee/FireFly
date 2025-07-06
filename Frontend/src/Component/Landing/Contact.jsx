import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/contact/team`,
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.isContactMailSend === true) {
        toast.success("✅ Your message has been sent successfully!");
        setLoading(false);
        navigate("/home", { replace: true });
      } else {
        toast.warn("⚠️ Failed to send your message. Please try again later.");
        setLoading(false);
      }
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(
        "❌ An error occurred while sending your message. Please try again later."
      );
      setLoading(false);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white dark:from-gray-900 dark:to-gray-800 p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 mt-10">
        <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
          Contact Us
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Have questions, feedback, or need help? Fill out the form below and
          our team will get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 cursor-pointer mt-6 rounded-xl text-lg font-semibold shadow-md transition-all duration-300
                ${
                  loading
                    ? "bg-gray-400 cursor-progress"
                    : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:from-indigo-600 hover:to-purple-600"
                }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
