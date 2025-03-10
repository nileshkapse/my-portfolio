import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/ResumePreview.css";

const ResumePreview = () => {
  const location = useLocation();
  const resumeUrl = location.state?.resumeUrl;
  const fullResumeUrl = `${resumeUrl}`; // ✅ Ensure proper path

  if (!resumeUrl) {
    return <h2>No Resume Found</h2>;
  }

  return (
    <div className="resume-container">
      <iframe
        src={fullResumeUrl}
        className="pdf-viewer"
        title="Resume Preview"
      ></iframe>
    </div>
  );
};

export default ResumePreview;
