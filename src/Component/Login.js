import React, { useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import "../styles/Auth.css"; // Import CSS
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext
  const [showPassword, setShowPassword] = useState(false);
  


  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before new request

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password ❌");
      }

      login({ token: data.token, userId: data.userId }); // Store user info globally
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="logo-container" data-theme="light" onClick={() => navigate("/")}>
        <span className="logo-text" >
          <img src="/Instant.ico" alt="" style={{ height: 30 }} />
          <span className="instant">Instant</span>
          <span className="portfolio" style={{ color: "black" }}>Portfolio</span>
        </span>
      </div>

      <div className={`auth-box ${error ? "shake" : ""}`}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            className="auth-input"
            placeholder="Email"
            required
            value={credentials.email}
            onChange={handleChange}
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="auth-input"
              placeholder="Password"
              required
              value={credentials.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>

        {/* Signup Link */}
        <span className="signup-text">
          Don't have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/signup")}>
            Sign up here
          </span>
        </span>
      </div>
    </div>
  );
};

export default Login;
