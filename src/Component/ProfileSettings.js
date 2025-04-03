import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import "../styles/ProfileSettings.css";

const ProfileSettings = () => {
  const location = useLocation();
  const userData = location.state?.user || {};

  const [user, setUser] = useState(userData);
  const [showPopup, setShowPopup] = useState(false);
  const [newProfileLink, setNewProfileLink] = useState(user.profile_link || "");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleProfileChange = () => {
    setUser({ ...user, profile_link: newProfileLink });
    setShowPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/update-profile`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Profile updated successfully!");
      } else {
        alert("Update failed ❌");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-settings-container">
      <button
        className="resume-close-btn"
        onClick={() => {
          setShowPopup(false);
          navigate("/dashboard");
        }}
      >
        ✖
      </button>
      <div className="profile-settings-box">
        <h2 className="profile-settings-title">Profile Settings</h2>

        {/* Profile Picture Section */}
        <div className="profile-settings-picture-container">
          {user.profile_link ? (
            <img
              src={user.profile_link}
              alt="Profile"
              className="profile-settings-picture"
              onError={(e) => (e.target.style.display = "none")}
            />
          ) : (
            <FaUserCircle className="profile-icon" size={120} />
          )}
          <div
            className="profile-settings-edit-icon"
            onClick={() => setShowPopup(true)}
          >
            <FaEdit size={16} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="profile-settings-form">
          <div className="profile-settings-group">
            <label>Username</label>
            <input
              className="profile-settings-input disable"
              type="text"
              name="username"
              value={user.username}
              disabled
            />
          </div>

          <div className="profile-settings-group">
            <label>Full Name</label>
            <input
              className="profile-settings-input"
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>

          <div className="profile-settings-group">
            <label>Email</label>
            <input
              className="profile-settings-input disable"
              type="email"
              name="email"
              value={user.email}
              disabled
            />
          </div>

          <div className="profile-settings-group">
            <label>Profile Heading</label>
            <textarea
              className="profile-settings-textarea"
              name="profileheading"
              value={user.profileheading || ""}
              onChange={handleChange}
            />
          </div>

          <div className="profile-settings-group">
            <label>Summary</label>
            <textarea
              className="profile-settings-textarea"
              name="summary"
              value={user.summary || ""}
              onChange={handleChange}
            />
          </div>

          <div className="profile-settings-group">
            <label>Phone</label>
            <input
              className="profile-settings-input"
              type="text"
              name="phone"
              value={user.phone || ""}
              onChange={handleChange}
            />
          </div>

          <div className="profile-settings-group">
            <label>LinkedIn</label>
            <input
              className="profile-settings-input"
              type="text"
              name="linkedin"
              value={user.linkedin || ""}
              onChange={handleChange}
            />
          </div>

          <div className="profile-settings-group">
            <label>GitHub</label>
            <input
              className="profile-settings-input"
              type="text"
              name="github"
              value={user.github || ""}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="profile-settings-btn">
            Update Profile
          </button>
        </form>
      </div>

      {/* Profile Picture Update Popup */}
      {showPopup && (
        <div className="profile-settings-popup">
          <h3>Update Profile Picture</h3>
          <img
            src={newProfileLink || "https://via.placeholder.com/120"}
            alt="Preview"
            className="profile-settings-picture"
          />
          <input
            type="text"
            value={newProfileLink}
            onChange={(e) => setNewProfileLink(e.target.value)}
            placeholder="Enter new profile image URL"
          />
          <div className="profile-settings-popup-buttons">
            <button
              className="profile-settings-save-btn"
              onClick={handleProfileChange}
            >
              Save
            </button>
            <button
              className="profile-settings-cancel-btn"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
