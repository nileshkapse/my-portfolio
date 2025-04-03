import React, { useState, useEffect, Suspense, lazy } from "react";

import MainPage from "./Component/MainPage";
import ErrorBoundary from "./Component/ErrorBoundary";

import "./App.css";
import { Navigate, Route, Router, Routes, useParams } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

const ResumeForm = lazy(() => import("./Component/ResumeForm"));
const Login = lazy(() => import("./Component/Login"));
const Signup = lazy(() => import("./Component/Singup"));
const ProtectedRoute = lazy(() => import("./Component/ProtectedRoute"));
const Dashboard = lazy(() => import("./Component/Dashboard"));
const ProfileSettings = lazy(() => import("./Component/ProfileSettings"));
const ResumePreview = lazy(() => import("./Component/ResumePreview"));
const UserProfile = lazy(() => import("./Component/UserProfile"));


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
    <ErrorBoundary> <Routes>
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
    </Routes></ErrorBoundary>

  );
}

export default App;
