// src/components/Resume.js
import React from "react";
import "../styles/Resume.css";
import { FaDownload, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Resume(props) {
  const navigate = useNavigate();

  const downloadResume = async () => {
    const resumeUrl = `${process.env.REACT_APP_API_URL}${props.userData.user_details.resume}`;
    try {
      const response = await fetch(resumeUrl, { mode: "cors" });
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <section id="resume" className="resume-section1">
      <h2>My Resume</h2>
      <div className="resume-buttons">
        <button
          className="view-btn"
          onClick={() => {
            if (props.userData.user_details.resume) {
              navigate("/resume-preview", {
                state: {
                  resumeUrl: `${process.env.REACT_APP_API_URL}${props.userData.user_details.resume}`,
                },
              });
            } else {
              alert("No resume uploaded.");
            }
          }}
        >
          <FaEye /> View Resume
        </button>

        <button onClick={downloadResume} className="download-btn">
          <FaDownload /> Download Resume
        </button>
      </div>
    </section>
  );
}

export default Resume;
