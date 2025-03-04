import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import "../styles/Auth.css"; // Import CSS

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.success) {
        login({ token: data.token, userId: data.userId }); // Store user info globally
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setError(data.message || "Invalid email or password ❌");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Error logging in ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-box ${error ? "shake" : ""}`}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="auth-input"
            placeholder="Email"
            required
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            required
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="signup-text">
          Don't have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/signup")}>
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
