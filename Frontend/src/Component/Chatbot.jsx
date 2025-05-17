import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import ThemeBtn from "../Component/ThemeBtn";
import fireflyLogo from "../assets/fireflyLogo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import User from "../assets/user.png";
import Profile from "../assets/profile.png";
import Setting from "../assets/setting.png";
import Logout from "../assets/logout.png";
import Help from "../assets/help.png";

const Chatbot = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Added
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const LogoutUser = () => {
    sessionStorage.removeItem("isLogin");
    navigate("/Login", { replace: true });
  };

  useEffect(() => {
    const isSuccessfullyRegister =
      sessionStorage.getItem("isSuccessfullyRegister") === "true";

    if (isSuccessfullyRegister) {
      return;
    }

    // If not a registered seller, check backend for OAuth login
    fetch("http://localhost:8080/check/login", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 401) {
          console.log("No user logged in. Redirecting to Login...");
          navigate("/Login", { replace: true });
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;

        console.log("User logged in via Google:", data);

        sessionStorage.setItem("isLogin", "true");
        sessionStorage.setItem("userEmail", data.email);
        sessionStorage.setItem("userName", data.name);
        sessionStorage.setItem("isGoogleUser", "true");

        // Redirect based on role/email
        if (data.email.endsWith("@gmail.com")) {
          return;
        } else {
          navigate("/Login", { replace: true });
        }
      })
      .catch((err) => {
        console.error("Error checking login:", err);
        navigate("/Login", { replace: true });
      });
  }, []);

  //   useEffect(() => {
  //     const isSuccessfullyRegister =
  //       sessionStorage.getItem("isSuccessfullyRegister") === "true";
  //     const isLoginUser = sessionStorage.getItem("isLogin") === "true";

  //     if (!isSuccessfullyRegister && !isLoginUser) {
  //       console.log("No user is logged in. Redirecting to userLogin...");
  //       navigate("/Login", { replace: true });
  //       return;
  //     }
  //     if (isSuccessfullyRegister) {
  //       console.log("Seller is logged in. Redirecting to MainHome...");
  //       return;
  //     }
  //     if (isLoginUser) {
  //       console.log("User is logged in. Allowing access.");
  //     }
  //   }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return; // ✅ Prevent spam or empty input

    const currentInput = input;
    setInput("");
    setMessages((prev) => [...prev, { text: currentInput, sender: "user" }]);
    setLoading(true); // ✅ Start loading

    // ✅ Show "Typing..." message
    setMessages((prev) => [...prev, { text: "Typing...", sender: "bot" }]);

    try {
      const response = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: currentInput }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      let botMessage = "No response found.";

      if (data?.response) {
        botMessage = data.response;
      } else if (
        data?.candidates?.length > 0 &&
        data.candidates[0]?.content?.parts?.length > 0
      ) {
        botMessage = data.candidates[0].content.parts[0].text;
      }

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // remove "Typing..."
        return [...updated, { text: botMessage, sender: "bot" }];
      });
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // remove "Typing..."
        return [...updated, { text: "Error fetching response", sender: "bot" }];
      });
    } finally {
      setLoading(false); // ✅ Done loading
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-screen h-screen border-none rounded-none shadow-none bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex items-center justify-between p-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md dark:from-gray-800 dark:to-gray-700">
        <div className="flex items-center space-x-4">
          <img
            src={fireflyLogo}
            alt="GPT Chatbot"
            className="mr-2 w-25 h-20 rounded-full"
          />
          <span className="text-2xl font-bold">FireFly Chatbot</span>
        </div>

        <div className="flex space-x-4">
          <ThemeBtn />
          <div className="relative">
            <img
              src={User}
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleMenu}
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
                <div className="p-4 flex items-center space-x-3 border-b border-gray-300 dark:border-gray-600">
                  <img
                    src={User}
                    alt="User"
                    className="w-12 h-12 rounded-full dark:brightness-90"
                  />
                  <h3>
                    <Link to="/Profile/Me" className="hover:underline">
                      Me
                    </Link>
                  </h3>
                </div>
                <div className="p-2">
                  <Link
                    to={"/Main/Setting/EditSection"}
                    className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
                  >
                    <img
                      src={Profile}
                      alt="Edit"
                      className="w-6 h-6 mr-2 dark:brightness-90"
                    />{" "}
                    Edit Profile
                  </Link>
                  <Link
                    to="#"
                    className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
                  >
                    <img
                      src={Setting}
                      alt="Settings"
                      className="w-6 h-6 mr-2 dark:brightness-90"
                    />
                    Settings & Privacy
                  </Link>
                  <Link
                    to="#"
                    className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
                  >
                    <img
                      src={Help}
                      alt="Help"
                      className="w-6 h-6 mr-2 dark:brightness-90"
                    />{" "}
                    Help & Support
                  </Link>
                  <Link
                    onClick={LogoutUser}
                    className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
                  >
                    <img
                      src={Logout}
                      alt="Logout"
                      className="w-6 h-6 mr-2 dark:brightness-90"
                    />{" "}
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
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
          placeholder={
            loading ? "Please wait for response..." : "Type your message..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading} // ✅ Disable input
        />
        <button
          className={`bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-full shadow-lg transform transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
          onClick={sendMessage}
          disabled={loading} // ✅ Disable button
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
