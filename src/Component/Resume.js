// src/components/Resume.js
import React from "react";
import "../styles/Resume.css";
import { FaDownload, FaEye } from "react-icons/fa";

function Resume() {
  const resumeLink = "https://olive-florinda-88.tiiny.site/";

  return (
    <section id="resume" className="resume-section">
      <h2>My Resume</h2>
      <div className="resume-buttons">
        <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="view-btn">
          <FaEye /> View Resume
        </a>
        <a href={resumeLink} download className="download-btn">
          <FaDownload /> Download Resume
        </a>
      </div>
    </section>
  );
}

export default Resume;