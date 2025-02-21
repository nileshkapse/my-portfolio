import React, { useState } from "react";
import "../styles/ResumeForm.css";
import { FaWindowClose } from "react-icons/fa";

const ResumeForm = () => {
  const [resumeData, setResumeData] = useState(null);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [showPopup, setShowPopup] = useState(true); // Show popup on page load

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", file);

    const response = await fetch("http://localhost:5000/upload-resume", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    setResumeData(result.data);
  };

  const handleSave = async () => {
    await fetch("http://localhost:5000/save-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, ...resumeData }),
    });

    alert("Resume saved successfully!");
    setShowPopup(false); // Close popup after saving
  };

  return (
    <>
      {showPopup && (
        <div className="resume-popup-overlay">
          <div className="resume-popup-content">
            <div className="resume-popup-header">
              <h2>Upload & Edit Resume</h2>
            </div>

            {!resumeData ? (
              <>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={handleUpload}>Upload</button>
              </>
            ) : (
              <div className="resume-form">
                <label>Username:</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label>Summary:</label>
                <textarea
                  value={resumeData.summary}
                  onChange={(e) =>
                    setResumeData({ ...resumeData, summary: e.target.value })
                  }
                />

                <h3>Skills</h3>
                {Object.entries(resumeData.skills).map(
                  ([category, skills], index) => (
                    <div key={index} className="resume-skill-category">
                      <h4>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </h4>
                      <textarea
                        value={skills.join(", ")}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            skills: {
                              ...resumeData.skills,
                              [category]: e.target.value.split(", "),
                            },
                          })
                        }
                      />
                    </div>
                  )
                )}

                <h3>Experience</h3>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="resume-experience-card">
                    <input
                      value={exp.company}
                      onChange={(e) => {
                        const updatedExp = [...resumeData.experience];
                        updatedExp[index].company = e.target.value;
                        setResumeData({
                          ...resumeData,
                          experience: updatedExp,
                        });
                      }}
                    />
                    <input
                      value={exp.role}
                      onChange={(e) => {
                        const updatedExp = [...resumeData.experience];
                        updatedExp[index].role = e.target.value;
                        setResumeData({
                          ...resumeData,
                          experience: updatedExp,
                        });
                      }}
                    />
                    <textarea
                      value={exp.description.join("\n")}
                      onChange={(e) => {
                        const updatedExp = [...resumeData.experience];
                        updatedExp[index].description =
                          e.target.value.split("\n");
                        setResumeData({
                          ...resumeData,
                          experience: updatedExp,
                        });
                      }}
                    />
                  </div>
                ))}

                <h3>Projects</h3>
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="resume-project-card">
                    <input
                      value={project.name}
                      onChange={(e) => {
                        const updatedProjects = [...resumeData.projects];
                        updatedProjects[index].name = e.target.value;
                        setResumeData({
                          ...resumeData,
                          projects: updatedProjects,
                        });
                      }}
                    />
                    <textarea
                      value={project.description.join("\n")}
                      onChange={(e) => {
                        const updatedProjects = [...resumeData.projects];
                        updatedProjects[index].description =
                          e.target.value.split("\n");
                        setResumeData({
                          ...resumeData,
                          projects: updatedProjects,
                        });
                      }}
                    />
                    <input
                      value={project.technologies.join(", ")}
                      onChange={(e) => {
                        const updatedProjects = [...resumeData.projects];
                        updatedProjects[index].technologies =
                          e.target.value.split(", ");
                        setResumeData({
                          ...resumeData,
                          projects: updatedProjects,
                        });
                      }}
                    />
                  </div>
                ))}

                <button onClick={handleSave}>Save</button>
              </div>
            )}

            <button
              className="resume-close-btn"
              onClick={() => {
                setShowPopup(false);
                setResumeData(null);
              }}
            >
              <FaWindowClose />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ResumeForm;
