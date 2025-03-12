import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Component/Header";
import Hero from "./Component/Hero";
import About from "./Component/About";
import Skills from "./Component/Skills";
import Experience from "./Component/Experience";
import Contact from "./Component/Contact";
import Projects from "./Component/Projects";
import Resume from "./Component/Resume";
import {
  FaArrowUp,
  FaRobot,
  FaWindowClose,
  FaWindowMinimize,
} from "react-icons/fa";
import ResumeForm from "./Component/ResumeForm";
import { Navigate, Route, Router, Routes, useParams } from "react-router-dom";
import Login from "./Component/Login";
import Signup from "./Component/Singup";
import ProtectedRoute from "./Component/ProtectedRoute";
import Dashboard from "./Component/Dashboard";
import ProfileSettings from "./Component/ProfileSettings";
import MySkillAndResume from "./Component/MySkillAndResume";
import ResumePreview from "./Component/ResumePreview";
import UserProfile from "./Component/UserProfile";
import { useAuth } from "./context/AuthContext";
import MainPage from "./Component/MainPage";

function App() {
  const { username } = useParams(); // Get username from URL
  const { user } = useAuth(); // Check user authentication
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
      const response = await fetch(
        `process.env.REACT_APP_API_URL/user/${username}`
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setLoading(false);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/dashboard" /> : <Signup />}
      />
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <MainPage />}
      />
      <Route path="/:username" element={<UserProfile />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload-resume" element={<ResumeForm />} />
        {/* <Route path="/skills" element={<MySkillAndResume />} /> */}
        <Route path="resume-preview" element={<ResumePreview />} />
        <Route path="profile-settings" element={<ProfileSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
