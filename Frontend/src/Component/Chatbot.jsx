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
  const [previewImage, setPreviewImage] = useState(null);

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
          }
        }
      })
      .catch((err) => {
        console.error("Error checking login:", err);
        navigate("/Login", { replace: true });
      });
  }, []);

  // useEffect(() => {}, []);

  // const sendMessage = async () => {
  //   if (previewImage) {
  //     setMessages((prev) => [...prev, { sender: "user", image: previewImage }]);
  //     setPreviewImage(null); // clear after sending
  //   }

  //   if (!input.trim() || loading) return; // ✅ Prevent spam or empty input

  //   const currentInput = input;
  //   setInput("");
  //   setMessages((prev) => [...prev, { text: currentInput, sender: "user" }]);
  //   setLoading(true); // ✅ Start loading

  //   // ✅ Show "Typing..." message
  //   setMessages((prev) => [...prev, { text: "Typing...", sender: "bot" }]);

  //   try {
  //     const response = await fetch("http://localhost:8080/api/chat", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ userMessage: currentInput }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Server error: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("API Response:", data);

  //     let botMessage = "No response found.";

  //     if (data?.response) {
  //       botMessage = data.response;
  //     } else if (
  //       data?.candidates?.length > 0 &&
  //       data.candidates[0]?.content?.parts?.length > 0
  //     ) {
  //       botMessage = data.candidates[0].content.parts[0].text;
  //     }

  //     setMessages((prev) => {
  //       const updated = [...prev];
  //       updated.pop(); // remove "Typing..."
  //       return [
  //         ...updated,
  //         { text: botMessage, sender: "bot" },
  //         { sender: "bot", text: "💬 Anything else? I’m here to help you." },
  //       ];
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setMessages((prev) => {
  //       const updated = [...prev];
  //       updated.pop(); // remove "Typing..."
  //       return [
  //         ...updated,
  //         {
  //           text: "❌ Sorry, something went wrong. Please try again.",
  //           sender: "bot",
  //         },
  //       ];
  //     });
  //   } finally {
  //     setLoading(false); // ✅ Done loading
  //   }
  // };

  const sendMessage = async () => {
    if (previewImage) {
      setMessages((prev) => [...prev, { sender: "user", image: previewImage }]);
      setPreviewImage(null);
    }

    if (!input.trim() || loading) return;

    const currentInput = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: currentInput, sender: "user" }]);

    // 👇 Medicine Flow
    if (conversationStage === "medicine") {
      if (!contextData.age) {
        setContextData({ ...contextData, age: currentInput });
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "What's your gender?" },
        ]);
        return;
      }
      if (!contextData.gender) {
        setContextData({ ...contextData, gender: currentInput.toLowerCase() });
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Are you allergic to any medicine?" },
        ]);
        return;
      }
      if (!contextData.allergies) {
        setContextData({ ...contextData, allergies: currentInput });
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Do you have any existing medical conditions (e.g., diabetes, asthma)?",
          },
        ]);
        return;
      }
      if (!contextData.conditions) {
        setContextData({ ...contextData, conditions: currentInput });

        const enriched = `${pendingQuery} for ${contextData.age} year old ${contextData.gender}. Allergies: ${contextData.allergies}. Conditions: ${currentInput}`;
        sendToApi(enriched);
        resetConversation();
        return;
      }
    }

    // 👇 Doctor Flow
    if (conversationStage === "doctor") {
      if (!contextData.city) {
        setContextData({ ...contextData, city: currentInput });
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "What's your age?" },
        ]);
        return;
      }
      if (!contextData.age) {
        setContextData({ ...contextData, age: currentInput });
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "What's your gender?" },
        ]);
        return;
      }
      if (!contextData.gender) {
        setContextData({ ...contextData, gender: currentInput.toLowerCase() });
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Preferred language for consultation?" },
        ]);
        return;
      }
      if (!contextData.language) {
        setContextData({ ...contextData, language: currentInput });
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Do you want a general physician or a specialist?",
          },
        ]);
        return;
      }
      if (!contextData.type) {
        const enriched = `${pendingQuery} in ${contextData.city}, ${contextData.age} year old ${contextData.gender}. Language: ${contextData.language}. Need: ${currentInput}`;
        sendToApi(enriched);
        resetConversation();
        return;
      }
    }

    // 👇 Symptom Check Flow
    if (conversationStage === "symptom-check") {
      if (!contextData.duration) {
        setContextData({ ...contextData, duration: currentInput });
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "What's your age?" },
        ]);
        return;
      }
      if (!contextData.age) {
        setContextData({ ...contextData, age: currentInput });
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "What's your gender?" },
        ]);
        return;
      }
      if (!contextData.gender) {
        setContextData({ ...contextData, gender: currentInput.toLowerCase() });
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Do you have a fever? (yes/no)" },
        ]);
        return;
      }
      if (!contextData.fever) {
        setContextData({ ...contextData, fever: currentInput.toLowerCase() });
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Rate your pain on a scale of 1–10" },
        ]);
        return;
      }
      if (!contextData.painLevel) {
        const enriched = `${pendingQuery} — symptoms for ${contextData.duration}, ${contextData.age} year old ${contextData.gender}, fever: ${contextData.fever}, pain level: ${currentInput}`;
        sendToApi(enriched);
        resetConversation();
        return;
      }
    }

    // 👇 Trigger Query Recognition
    if (/suggest.*fever.*medicine/i.test(currentInput)) {
      setConversationStage("medicine");
      setPendingQuery(currentInput);
      setContextData({});
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "What's your age?" },
      ]);
      return;
    }

    if (/recommend.*doctor/i.test(currentInput)) {
      setConversationStage("doctor");
      setPendingQuery(currentInput);
      setContextData({});
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Which city are you in?" },
      ]);
      return;
    }

    if (
      /what.*reason.*(pain|vomiting|rash|dizzy|headache)/i.test(currentInput)
    ) {
      setConversationStage("symptom-check");
      setPendingQuery(currentInput);
      setContextData({});
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "How long have you had this issue?" },
      ]);
      return;
    }

    // Default
    sendToApi(currentInput);
  };
  const resetConversation = () => {
    setConversationStage(null);
    setPendingQuery(null);
    setContextData({});
  };

  const sendToApi = async (userText) => {
    setLoading(true);
    setMessages((prev) => [...prev, { text: "Typing...", sender: "bot" }]);

    try {
      const response = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: userText }),
      });

      const data = await response.json();

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
        return [
          ...updated,
          { text: botMessage, sender: "bot" },
          { sender: "bot", text: "💬 Anything else? I’m here to help you." },
        ];
      });
    } catch (err) {
      console.error("API error:", err);
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        return [
          ...updated,
          { text: "❌ API error. Try again.", sender: "bot" },
        ];
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // const [awaitingInfo, setAwaitingInfo] = useState(false);
  const [pendingQuery, setPendingQuery] = useState(null);
  // const [userAge, setUserAge] = useState(null);
  // const [userGender, setUserGender] = useState(null);
  const [conversationStage, setConversationStage] = useState(null);
  const [contextData, setContextData] = useState({});

  const parseMarkdown = (text, isSummary = false) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(<strong key={match.index}>{match[1]}</strong>);
      lastIndex = boldRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    // ✅ Add the emoji only for summary and return a paragraph
    if (isSummary) {
      return (
        <p className="mb-1">
          <span className="mr-1">✅</span>
          {parts}
        </p>
      );
    }

    return parts;
  };

  const replaceWithEmoji = (text) => {
    return text
      .replace(/fever/gi, "🌡️ fever")
      .replace(/pain/gi, "💊 pain")
      .replace(/inflammation/gi, "🔥 inflammation")
      .replace(/doctor/gi, "👨‍⚕️ doctor")
      .replace(/medicine/gi, "💊 medicine")
      .replace(/hydration|hydrate/gi, "💧 hydration")
      .replace(/water/gi, "🚰 water")
      .replace(/recovery/gi, "🛌 recovery")
      .replace(/headache/gi, "🤕 headache")
      .replace(/nausea/gi, "🤢 nausea")
      .replace(/vomiting/gi, "🤮 vomiting")
      .replace(/cough/gi, "🤧 cough")
      .replace(/rest/gi, "🛏️ rest")
      .replace(/sick|illness/gi, "🤒 sick")
      .replace(/hospital/gi, "🏥 hospital")
      .replace(/summary/gi, "✅ Summary");
  };

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
        {messages.map((msg, idx) => {
          const text = msg.text.trim();
          const isBullet = text.startsWith("*");
          const content = isBullet ? text.substring(1).trim() : text;
          const isSummary = content.toLowerCase().startsWith("summary");

          return (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-5 py-3 rounded-2xl text-sm font-medium shadow-md max-w-sm whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100 rounded-bl-none"
                }`}
              >
                {msg.sender === "bot" ? (
                  isBullet ? (
                    <li className="list-disc ml-4">
                      {parseMarkdown(replaceWithEmoji(content), isSummary)}
                    </li>
                  ) : (
                    <p className="mb-1">
                      {parseMarkdown(replaceWithEmoji(text))}
                    </p>
                  )
                ) : (
                  parseMarkdown(replaceWithEmoji(msg.text))
                )}
              </div>
            </div>
          );
        })}

        {messages[messages.length - 1]?.sender === "user" && (
          <div className="flex justify-start">
            <div className="px-5 py-3 rounded-2xl text-sm font-medium shadow-md max-w-sm bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100 rounded-bl-none">
              I'm here to help you 😊 Anything else?
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t bg-white dark:bg-gray-900 dark:border-gray-700">
        <div className="flex gap-3 items-center">
          {/* Text Input */}
          <input
            type="text"
            className="flex-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
            placeholder={
              loading ? "Please wait for response..." : "Type your message..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />

          {/* Send Button */}
          <button
            className={`bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-full shadow-lg transform transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }`}
            onClick={sendMessage}
            disabled={loading}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
