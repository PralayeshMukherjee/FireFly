# 🤖 FireFly - Your AI-Powered Health Assistant 💊

🚀 **Empowering Instant Healthcare Guidance!**

FireFly is an innovative AI-powered health chatbot created to make healthcare more **accessible**, **smart**, and **instant**. Whether you’re feeling unwell or need immediate medical guidance, FireFly is here to support you with AI-driven recommendations, doctor locators, and basic relief suggestions.

---

## ✨ Features

### 🔹 For Users
- ✅ **Symptom Checker** – Get suggestions based on your reported symptoms
- ✅ **Nearby Doctor & Hospital Finder** – Find healthcare facilities near your location
- ✅ **Temporary Medicine Suggestions** – Quick relief options before visiting a doctor
- ✅ **Smart Chatbot (Coming Soon)** – Talk with an AI trained on basic healthcare needs

### 🚀 Upcoming Features
- 🔜 **User Authentication**
- 🔜 **AI Chatbot Integration (Generative API)**
- 🔜 **Health Record Storage**
- 🔜 **Mobile Responsiveness**

---

## 🛠 Tech Stack

| Component     | Technology                |
|---------------|----------------------------|
| **Frontend**  | React (Vite) + Tailwind CSS |
| **Backend**   | Spring Boot                |
| **Database**  | MySQL                      |
| **AI Layer**  | Generative AI API (Coming Soon) |

---

## 🚀 Getting Started

### 🔧 Prerequisites
- Java JDK 17+
- Maven 3.6+
- Node.js & npm
- MySQL

### 💻 Installation

### 💻 Installation

#### 🔹 Backend (Spring Boot)
```bash
# Clone the repository
git clone https://github.com/PralayeshMukherjee/FireFly
cd firefly

# Navigate to backend folder
cd backend

# Install dependencies & build
mvn clean install

# Configure Database in `application.properties`
spring.datasource.url=jdbc:mysql://localhost:3306/bookie
spring.datasource.username=root
spring.datasource.password=your_password

# Run the backend server
mvn spring-boot:run
```

#### 🔹 Frontend (React + Vite)
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

📌 The frontend runs on `http://localhost:5173` and backend on `http://localhost:8080`.

---

## 🏆 Contributing

Contributions are welcome! 🎉 Feel free to fork the repository, create a new branch, and submit a pull request.

1. Fork the project
2. Create a feature branch (`git checkout -b feature-newFeature`)
3. Commit changes (`git commit -m 'Added a new feature'`)
4. Push to branch (`git push origin feature-newFeature`)
5. Open a pull request

---

## 📝 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📩 Contact
🔗 **GitHub**: [PralayeshMukherjee](https://github.com/PralayeshMukherjee)  
🔗 **LinkedIn**: [Connect with me](https://www.linkedin.com/in/pralayesh-mukherjee-756a8b276/)  
💡 Have suggestions? Let's innovate together! 🚀📚

## 🌍 Architecture Diagram

![Bookie Architecture](diagram.png)
