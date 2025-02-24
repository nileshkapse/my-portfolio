import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    alert("Signup successful! Please login.");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            className="auth-input"
            placeholder="Name"
            required
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
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
        <a href="/" className="auth-link">
          Already have an account? Login
        </a>
      </div>
    </div>
  );
};

export default Signup;
