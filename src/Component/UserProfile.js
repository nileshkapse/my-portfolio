import React, { useState, useEffect } from "react";
import "../App.css";

import {
  FaArrowUp,
  FaRobot,
  FaWindowClose,
  FaWindowMinimize,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Resume from "./Resume";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";

const UserProfile = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I assist you with job opportunities, project collaborations, or any professional inquiries?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [showZomatoAnimation, setShowZomatoAnimation] = useState(false);
  const [zomatoLogos, setZomatoLogos] = useState([]);

  const defaultQueries = [
    "What are your top skills?",
    "What is your total experience?",
    "Tell me about your projects.",
    "What technologies have you used?",
    "Celebrate a win!",
    "I am from Zomato HR",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (showCelebration) {
      const interval = setInterval(() => {
        setConfetti((prevConfetti) =>
          [...Array(20)].map(() => ({
            id: Math.random(),
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 2}s`,
          }))
        );
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        setShowCelebration(false);
        setConfetti([]);
      }, 5000);
    }
  }, [showCelebration]);

  useEffect(() => {
    if (showZomatoAnimation) {
      const interval = setInterval(() => {
        setZomatoLogos((prevLogos) =>
          [...Array(5)].map(() => ({
            id: Math.random(),
            top: `${
              window.scrollY + Math.random() * window.innerHeight * 0.8
            }px`,
            left: `${Math.random() * window.innerWidth * 0.8}px`,
            animationDelay: `${Math.random() * 2}s`,
          }))
        );
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        setShowZomatoAnimation(false);
        setZomatoLogos([]);
      }, 10000);
    }
  }, [showZomatoAnimation]);

  const handleSendMessage = (query = null) => {
    const messageText = query || input;
    if (!messageText.trim()) return;
    setMessages([...messages, { text: messageText, sender: "user" }]);
    setInput("");

    let response = "I'm not sure about that. Could you specify?";
    if (messageText.toLowerCase().includes("top skills")) {
      response = "My top skills include ReactJS, AWS, Flask, and NodeJS.";
    } else if (messageText.toLowerCase().includes("total experience")) {
      response = "I have 2+ years of experience as a Software Engineer.";
    } else if (messageText.toLowerCase().includes("projects")) {
      response =
        "I have worked on multiple projects including an OTP Verification System, Musafir.com Infra-services Web App, and a Vehicle Finance Management System.";
    } else if (messageText.toLowerCase().includes("technologies")) {
      response =
        "I have experience with ReactJS, AWS, Flask, NodeJS, JavaScript, and more.";
    } else if (messageText.toLowerCase().includes("celebrate")) {
      response = "🎉 Congratulations! Let's celebrate with some fireworks! 🎊";
      setShowCelebration(true);
    } else if (messageText.toLowerCase().includes("zomato")) {
      response =
        "Welcome, Zomato HR! Enjoy the custom Zomato-themed animations!";
      setShowZomatoAnimation(true);
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
    }, 1000);
  };
  const { username } = useParams(); // Get username from URL
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (username) {
      fetchUserData(username);
    }
  }, [username]);

  const fetchUserData = async (username) => {
    setLoading(true);
    try {
      console.log("Fetching data for:", username); // Debugging
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>No user data found.</p>;

  return (
    <div>
      <div className="app-container">
        {showCelebration && (
          <div className="celebration-effect">
            {confetti.map((piece) => (
              <div
                key={piece.id}
                className="confetti-piece"
                style={{
                  top: piece.top,
                  left: piece.left,
                  animationDelay: piece.animationDelay,
                }}
              />
            ))}
          </div>
        )}
        {showZomatoAnimation && (
          <div className="zomato-animation">
            {zomatoLogos.map((logo) => (
              <img
                key={logo.id}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Zomato_logo.png/600px-Zomato_logo.png"
                alt="Zomato Logo"
                className="zomato-logo firework-logo"
                style={{
                  top: logo.top,
                  left: logo.left,
                  animationDelay: logo.animationDelay,
                }}
              />
            ))}
            <img
              src="https://image.pngaaa.com/325/8364325-middle.png"
              alt="Food Delivery"
              className="food-delivery moving-bike"
            />
          </div>
        )}
        <Header />
        <Hero userData={userData}/>
        <About userData={userData}/>
        <Skills userData={userData}/>
        <Experience userData={userData} />
        <Projects userData={userData}/>
        <Resume userData={userData}/>
        <Contact userData={userData}/>
        {showScroll && (
          <button className="scroll-to-top" onClick={scrollToTop}>
            <FaArrowUp />
          </button>
        )}
        <button
          className="chatbot-toggle"
          onClick={() => setShowChatbot(!showChatbot)}
        >
          <FaRobot />
        </button>
        {showChatbot&& username==="nilesh_kapse" && (
          <div className="chatbot-container">
            <div className="chatbot-header">
              Chatbot Assistant
              <div className="chatbot-header-icon">
                <FaWindowMinimize
                  onClick={() => setShowChatbot(!showChatbot)}
                />{" "}
                <FaWindowClose
                  onClick={() => {
                    setMessages([
                      {
                        text: "Hello! How can I assist you regarding my portfolio?",
                        sender: "bot",
                      },
                    ]);
                    setInput("");
                    setShowChatbot(!showChatbot);
                  }}
                />
              </div>
            </div>
            <div className="chatbot-default-queries">
              {defaultQueries.map((query, index) => (
                <button
                  key={index}
                  className="query-btn"
                  onClick={() => handleSendMessage(query)}
                >
                  {query}
                </button>
              ))}
            </div>
            <div className="chatbot-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.sender === "bot" ? "bot-message" : "user-message"
                  }
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chatbot-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
              />
              <button onClick={() => handleSendMessage()}>Send</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
