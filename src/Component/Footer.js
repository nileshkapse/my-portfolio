import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import "../styles/Footer.css"; // Importing CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">
        {/* Logo or Site Name */}
        <h2 className="footerTitle">InstantPortfolio</h2>

        {/* Social Links */}
        <div className="socialLinks">
          <a
            href="https://linkedin.com/in/nileshkapse"
            target="_blank"
            rel="noopener noreferrer"
            className="socialIcon"
          >
            <FaLinkedin size={22} />
          </a>
          <a
            href="https://github.com/nileshkapse"
            target="_blank"
            rel="noopener noreferrer"
            className="socialIcon"
          >
            <FaGithub size={22} />
          </a>
          <a
            href="mailto:youremail@example.com"
            className="socialIcon"
          >
            <FaEnvelope size={22} />
          </a>
        </div>

        {/* Copyright */}
        <p className="footerText">
          © {new Date().getFullYear()} InstantPortfolio. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
