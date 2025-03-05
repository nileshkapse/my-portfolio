import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col items-center text-center">
        {/* Logo or Site Name */}
        <h2 className="text-lg font-semibold mb-2">YourWebsite</h2>

        {/* Social Links */}
        <div className="flex space-x-6">
          <a
            href="https://linkedin.com/in/nileshkapse"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <FaLinkedin size={22} />
          </a>
          <a
            href="https://github.com/nileshkapse"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaGithub size={22} />
          </a>
          <a
            href="mailto:youremail@example.com"
            className="hover:text-red-400"
          >
            <FaEnvelope size={22} />
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-3 text-sm">
          © {new Date().getFullYear()} YourWebsite. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
