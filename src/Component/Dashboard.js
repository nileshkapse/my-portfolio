import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUpload,
  FaUserEdit,
  FaFileAlt,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";
import "../styles/Dashboard.css";
import Header from "./Header";
import { useAuth } from "../context/AuthContext";
import ProfileSettings from "./ProfileSettings";
import Footer from "./Footer";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Add loading state
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);

  const handleViewResume = () => {
    if (userData?.user?.resume) {
      setShowPreview(true);
    } else {
      alert("No resume available for preview.");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const token = user?.token || "";

    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setLoading(false); // ✅ Stop loading when data is fetched
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    logout(); // ✅ Logout from context
    navigate("/login");
  };

  if (loading) {
    return <h2>Loading...</h2>; // ✅ Show loader until data is fetched
  }

  return (
    <div className="dashboard-container">
      <Header profile_link={userData.user?.profile_link} />
      <div className="dashboard-contain">
        <h2>Welcome, {userData?.user?.name} ! 👋</h2>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <FaUpload size={40} color="white" />
            <h3>Upload Resume</h3>
            <button
              onClick={() =>
                navigate("/upload-resume", {
                  state: { user: userData.user },
                })
              }
            >
              Upload
            </button>
          </div>

          <div className="dashboard-card">
            <FaUserEdit size={40} color="white" />

            <h3>Profile Settings</h3>
            <button
              onClick={() =>
                navigate("/profile-settings", {
                  state: { user: userData.user },
                })
              }
            >
              Edit Profile
            </button>
          </div>

          <div className="dashboard-card">
            <FaFileAlt size={40} color="white" />
            <h3>Saved Resumes</h3>
            <button
              onClick={() => {
                if (userData.user.resume) {
                  navigate("/resume-preview", {
                    state: {
                      resumeUrl: `${process.env.REACT_APP_API_URL}${userData.user.resume}`,
                    },
                  });
                } else {
                  alert("No resume uploaded.");
                }
              }}
            >
              View Resume
            </button>
          </div>

          {/* <div className="dashboard-card">
            <FaCogs size={40} color="white" />
            <h3>My Skills & Experience</h3>
            <button onClick={() => navigate("/skills")}>View</button>
          </div> */}

          <div className="dashboard-card logout-card">
            <FaSignOutAlt size={40} color="white" />
            <h3>Logout</h3>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
