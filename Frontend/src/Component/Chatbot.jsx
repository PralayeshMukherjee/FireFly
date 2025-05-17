// Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import ThemeBtn from "../Component/ThemeBtn";

const Chatbot = () => {
  useEffect(() => {
    const isSuccessfullyRegister =
      sessionStorage.getItem("isSuccessfullyRegister") === "true";

    const isLoginUser = sessionStorage.getItem("isLogin") === "true";

    if (!isSuccessfullyRegister && !isLoginUser) {
      console.log("No user is logged in. Redirecting to userLogin...");
      navigate("/Login", { replace: true });
      return;
    }
    if (isSuccessfullyRegister) {
      console.log("Seller is logged in. Redirecting to MainHome...");
      return;
    }
    if (isLoginUser) {
      console.log("User is logged in. Allowing access.");
      navigate("/Main/MainHome", { replace: true });
    }
  }, []);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulated bot response (replace with your GPT API call)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "This is a response from GPT!" },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-screen h-screen border-none rounded-none shadow-none bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="p-6 text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md dark:from-gray-800 dark:to-gray-700">
        GPT Chatbot
      </div>

      <div className="flex-1 px-6 py-4 overflow-y-auto space-y-6 bg-white dark:bg-gray-900">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-5 py-3 rounded-2xl text-sm font-medium shadow-md max-w-sm ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t bg-white dark:bg-gray-900 dark:border-gray-700 flex gap-3 items-center">
        <input
          type="text"
          className="flex-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transform transition duration-300"
          onClick={handleSend}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
