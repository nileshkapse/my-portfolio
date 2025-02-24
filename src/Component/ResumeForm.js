import React, { useState } from "react";
import "../styles/ResumeForm.css";

const ResumeForm = () => {
  const [resumeData, setResumeData] = useState(null);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [showPopup, setShowPopup] = useState(true);

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
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="resume-popup-overlay">
          <div className="resume-popup-content">
            <div className="resume-popup-header">
              <h2>Upload & Edit Resume</h2>
              <button
                className="resume-close-btn"
                onClick={() => setShowPopup(false)}
              >
                ✖
              </button>
            </div>

            {!resumeData ? (
              <div className="resume-upload">
                <input
                  type="file"
                  className="resume-input"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button className="resume-btn" onClick={handleUpload}>
                  Upload
                </button>
              </div>
            ) : (
              <div className="resume-form">
                <div className="resume-form-section">
                  <label>Username:</label>
                  <input
                    className="resume-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="resume-form-section">
                  <label>Summary:</label>
                  <textarea
                    className="resume-textarea"
                    value={resumeData.summary}
                    onChange={(e) =>
                      setResumeData({ ...resumeData, summary: e.target.value })
                    }
                  />
                </div>

                <h3>Skills</h3>
                {Object.entries(resumeData.skills).map(
                  ([category, skills], index) => (
                    <div key={index} className="resume-skill-category">
                      <h4>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </h4>
                      <textarea
                        className="resume-textarea"
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

                <h3>Projects</h3>
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="resume-project-card">
                    <label>Project Name:</label>
                    <input
                      className="resume-input"
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
                    <label>Description:</label>
                    <textarea
                      className="resume-textarea"
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
                    <label>Technologies:</label>
                    <input
                      className="resume-input"
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

                <button className="resume-save-btn" onClick={handleSave}>
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ResumeForm;
