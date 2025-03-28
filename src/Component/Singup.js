import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const checkUsername = async (username) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/check-username/${username}`
  );
  const data = await response.json();
  return data.available;
};

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [availability, setAvailability] = useState(null);
  const [debouncedUsername, setDebouncedUsername] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedUsername(username); // Only set username after delay
    }, 1500); // ⏳ Wait 500ms before setting

    return () => clearTimeout(handler); // Cleanup previous timer
  }, [username]); // Runs when `username` changes

  const handleSignup = async (e) => {
    e.preventDefault();

    const userData = { ...user, username };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // ✅ Make sure `username` is sent
    });

    const data = await response.json();
    if (data.success) {
      alert("Signup successful! Please login.");
      navigate("/login");
    } else {
      console.error("Signup Error:", data.errors);
    }
  };

  useEffect(() => {
    if (!debouncedUsername) return; // Avoid checking empty values

    if (debouncedUsername.length < 4) {
      setAvailability(null);
      setError("Username must be at least 4 characters.");
      return;
    }

    if (!/^[a-zA-Z0-9_.]+$/.test(debouncedUsername)) {
      setAvailability(null);
      setError("Username can only contain letters, numbers, '_', and '.'");
      return;
    }

    setError(""); // Clear error if valid

    // ✅ Call API only after debounce delay
    checkUsername(debouncedUsername)
      .then((isAvailable) => setAvailability(isAvailable))
      .catch((error) => {
        console.error("Error checking username:", error);
        setAvailability(null);
      });
  }, [debouncedUsername]);

  return (
    <div className="auth-container">
      <div
        className="logo-container"
        data-theme="light"
      >
        <span className="logo-text">
          <img src="/Instant.ico" style={{ height: 30 }} alt=""/>
          <span className="instant">Instant</span>
          <span className="portfolio" style={{ color: "black" }}>
            Portfolio
          </span>
        </span>
      </div>
      <div className={`auth-box ${error ? "shake" : ""}`}>
        <h2>Signup</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSignup}>
          <input
            type="text"
            className="auth-input"
            placeholder="Full Name"
            required
            onChange={(e) => setUser({ ...user, name: e.target.value })} // ✅ Correctly setting `name`
          />

          <input
            className="auth-input"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          {availability !== null && (
            <p style={{ color: availability ? "green" : "red" }}>
              {availability
                ? "Username is available ✅"
                : "Username is taken ❌"}
            </p>
          )}

          <input
            type="email"
            className="auth-input"
            placeholder="Email"
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button type="submit" className="auth-button">
            Signup
          </button>
        </form>

        <p className="signup-text">
          Already have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
