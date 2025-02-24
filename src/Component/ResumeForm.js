import React, { useState } from "react";
import "../styles/ResumeForm.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const indianDegrees = [
  "Bachelor of Engineering (B.E.)",
  "Bachelor of Technology (B.Tech)",
  "Master of Technology (M.Tech)",
  "Bachelor of Science (B.Sc.)",
  "Master of Science (M.Sc.)",
  "Bachelor of Commerce (B.Com)",
  "Master of Commerce (M.Com)",
  "Bachelor of Arts (B.A.)",
  "Master of Arts (M.A.)",
  "Bachelor of Business Administration (BBA)",
  "Master of Business Administration (MBA)",
  "Other",
];

const ResumeForm = () => {
  const [resumeData, setResumeData] = useState(null);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [profilelink, setProfileLink] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showOtherSections, setShowOtherSections] = useState(false);
  const [showSections, setShowSections] = useState({
    experience: true,
    education: true,
    projects: true,
    skills: true,
    certifications: false,
    achievements: false,
    otherSections: false,
    profile: false,
  });

  const toggleSection = (section) => {
    setShowSections({ ...showSections, [section]: !showSections[section] });
  };

  const deleteItem = (section, index) => {
    const updatedSection = [...resumeData[section]];
    updatedSection.splice(index, 1);
    setResumeData({ ...resumeData, [section]: updatedSection });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:5000/upload-resume", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setResumeData(result.data);
      } else {
        setErrorMessage(
          "Failed to parse resume. Please enter details manually."
        );
        setResumeData({
          summary: "",
          skills: { languages: [], technologies: [], tools: [], other: [] },
          experience: [],
          education: [],
          certifications: [],
          projects: [],
          achievements: [],
          otherSections: [], // Ensure this exists
        });
      }
    } catch (error) {
      setErrorMessage("Error uploading resume.");
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/save-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, ...resumeData }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Resume saved successfully!");
        setShowPopup(false);
      } else {
        alert("Error saving resume.");
      }
    } catch (error) {
      alert("Server error while saving.");
    }
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        { company: "", role: "", startDate: "", endDate: "", description: [] },
      ],
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { college: "", degree: "", startDate: "", endDate: "" },
      ],
    });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        { name: "", description: [], technologies: [] },
      ],
    });
  };

  const addCertification = () => {
    setResumeData({
      ...resumeData,
      certifications: [
        ...resumeData.certifications,
        { name: "", description: "", link: "" },
      ],
    });
  };

  const updateCertification = (index, field, value) => {
    const updatedCertifications = [...resumeData.certifications];
    updatedCertifications[index][field] = value;
    setResumeData({ ...resumeData, certifications: updatedCertifications });
  };

  const addOtherSection = () => {
    setShowOtherSections(true);
    setResumeData({
      ...resumeData,
      otherSections: [
        ...resumeData?.otherSections,
        { name: "", subsections: [] },
      ],
    });
  };

  const addSubsection = (index) => {
    const updatedSections = [...resumeData.otherSections];
    updatedSections[index].subsections.push({ name: "", description: "" });
    setResumeData({ ...resumeData, otherSections: updatedSections });
  };

  // Function to add a new achievement entry
  const addAchievement = () => {
    setResumeData({
      ...resumeData,
      achievements: [...resumeData.achievements, { name: "", description: "" }],
    });
  };

  // Function to update achievements
  const updateAchievement = (index, field, value) => {
    const updatedAchievements = [...resumeData.achievements];
    updatedAchievements[index][field] = value;
    setResumeData({ ...resumeData, achievements: updatedAchievements });
  };

  const [availability, setAvailability] = useState(null);
  const [error, setError] = useState("");

  const validateUsername = (value) => {
    const usernameRegex = /^[a-zA-Z0-9_.]{4,16}$/;
    return usernameRegex.test(value);
  };

  const checkUsername = async (value) => {
    if (value.length < 4) {
      setAvailability(null);
      setError("Username must be at least 4 characters.");
      return;
    }

    if (!validateUsername(value)) {
      setAvailability(null);
      setError("Username can only contain letters, numbers, '_', and '.'.");
      return;
    }

    setError("");

    // Call backend after 3+ characters
    if (value.length >= 3) {
      try {
        const response = await fetch(
          `http://localhost:5000/check-username/${value}`
        );
        const data = await response.json();
        setAvailability(data.available);
      } catch (error) {
        console.error("Error checking username:", error);
        setAvailability(null);
      }
    }
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
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </div>
            ) : (
              <div className="resume-form">
                <div className="resume-form-section">
                  <label>Username:</label>
                  <input
                    className="resume-input"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      checkUsername(e.target.value);
                    }}
                  />
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {availability !== null && (
                    <p style={{ color: availability ? "green" : "red" }}>
                      {availability
                        ? "✅ Username is available"
                        : "❌ Username is taken"}
                    </p>
                  )}
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
                <div className="resume-accordion">
                  <div
                    className="accordion-header"
                    onClick={() => toggleSection("profile")}
                  >
                    <h3>Profile details</h3>
                    {showSections.profile ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  {showSections.profile && (
                    <div className="resume-section-form">
                      <div className="resume-form-section">
                        <label>Profile Photo Link:</label>
                        <input
                          className="resume-input"
                          value={resumeData.contact?.profilePhoto || ""}
                          onChange={(e) =>
                            setResumeData({
                              ...resumeData,
                              contact: {
                                ...resumeData.contact,
                                profilePhoto: e.target.value,
                              },
                            })
                          }
                        />
                      </div>

                      <div className="resume-form-section">
                        <label>Mobile Number:</label>
                        <input
                          className="resume-input"
                          value={resumeData.contact?.phone || ""}
                          onChange={(e) =>
                            setResumeData({
                              ...resumeData,
                              contact: {
                                ...resumeData.contact,
                                phone: e.target.value,
                              },
                            })
                          }
                        />
                      </div>

                      <div className="resume-form-section">
                        <label>Email Address:</label>
                        <input
                          className="resume-input"
                          value={resumeData.contact?.email || ""}
                          onChange={(e) =>
                            setResumeData({
                              ...resumeData,
                              contact: {
                                ...resumeData.contact,
                                email: e.target.value,
                              },
                            })
                          }
                        />
                      </div>

                      <div className="resume-form-section">
                        <label>GitHub Profile:</label>
                        <input
                          className="resume-input"
                          value={resumeData.contact?.github || ""}
                          onChange={(e) =>
                            setResumeData({
                              ...resumeData,
                              contact: {
                                ...resumeData.contact,
                                github: e.target.value,
                              },
                            })
                          }
                        />
                      </div>

                      <div className="resume-form-section">
                        <label>LinkedIn Profile:</label>
                        <input
                          className="resume-input"
                          value={resumeData.contact?.linkedin || ""}
                          onChange={(e) =>
                            setResumeData({
                              ...resumeData,
                              contact: {
                                ...resumeData.contact,
                                linkedin: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="resume-accordion">
                  <div
                    className="accordion-header"
                    onClick={() => toggleSection("skills")}
                  >
                    <h3>Skills</h3>
                    {showSections.skills ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  {showSections.skills && (
                    <div className="resume-section-form">
                      {Object.entries(resumeData.skills).map(
                        ([category, skills], index) => (
                          <div key={index} className="resume-skill-category">
                            <h4>
                              {category.charAt(0).toUpperCase() +
                                category.slice(1)}
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
                    </div>
                  )}
                </div>

                <div className="resume-accordion">
                  <div
                    className="accordion-header"
                    onClick={() => toggleSection("experience")}
                  >
                    <h3>Experience</h3>
                    {showSections.experience ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </div>
                  {showSections.experience && (
                    <div className="resume-section-form">
                      {resumeData.experience.map((exp, index) => {
                        // Convert startDate to a valid format (if needed)
                        let formattedStartDate = exp.startDate
                          ? new Date(exp.startDate).toISOString().split("T")[0]
                          : "";

                        // Handle "Present" as empty value for endDate
                        let formattedEndDate =
                          exp.endDate.toLowerCase() === "present"
                            ? new Date().toISOString().split("T")[0]
                            : new Date(exp.endDate).toISOString().split("T")[0];

                        return (
                          <div key={index} className="resume-experience-card">
                            <button
                              className="delete-btn"
                              onClick={() => deleteItem("experience", index)}
                            >
                              🗑
                            </button>

                            <label>Company:</label>
                            <input
                              className="resume-input"
                              value={exp.company}
                              onChange={(e) => {
                                const updatedExperience = [
                                  ...resumeData.experience,
                                ];
                                updatedExperience[index].company =
                                  e.target.value;
                                setResumeData({
                                  ...resumeData,
                                  experience: updatedExperience,
                                });
                              }}
                            />

                            <label>Location:</label>
                            <input
                              className="resume-input"
                              value={exp.location}
                              onChange={(e) => {
                                const updatedExperience = [
                                  ...resumeData.experience,
                                ];
                                updatedExperience[index].location =
                                  e.target.value;
                                setResumeData({
                                  ...resumeData,
                                  experience: updatedExperience,
                                });
                              }}
                            />

                            <label>Role:</label>
                            <input
                              className="resume-input"
                              value={exp.role}
                              onChange={(e) => {
                                const updatedExperience = [
                                  ...resumeData.experience,
                                ];
                                updatedExperience[index].role = e.target.value;
                                setResumeData({
                                  ...resumeData,
                                  experience: updatedExperience,
                                });
                              }}
                            />

                            <label>Start Date:</label>
                            <input
                              type="date"
                              className="resume-input"
                              value={formattedStartDate}
                              onChange={(e) => {
                                const updatedExperience = [
                                  ...resumeData.experience,
                                ];
                                updatedExperience[index].startDate =
                                  e.target.value;
                                setResumeData({
                                  ...resumeData,
                                  experience: updatedExperience,
                                });
                              }}
                            />

                            <label>End Date:</label>
                            <input
                              type="date"
                              className="resume-input"
                              value={formattedEndDate}
                              onChange={(e) => {
                                const updatedExperience = [
                                  ...resumeData.experience,
                                ];
                                updatedExperience[index].endDate =
                                  e.target.value;
                                setResumeData({
                                  ...resumeData,
                                  experience: updatedExperience,
                                });
                              }}
                            />
                          </div>
                        );
                      })}
                      <button onClick={addExperience} className="add-btn">
                        + Add Experience
                      </button>
                    </div>
                  )}
                </div>

                <div className="resume-accordion">
                  <div
                    className="accordion-header"
                    onClick={() => toggleSection("education")}
                  >
                    <h3>Education</h3>
                    {showSections.education ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </div>
                  {showSections.education && (
                    <div className="resume-section-form">
                      {resumeData.education.map((edu, index) => {
                        // ✅ Function to safely parse dates
                        const parseDate = (dateStr) => {
                          if (
                            !dateStr ||
                            dateStr.toLowerCase().includes("present")
                          ) {
                            return ""; // Leave blank for "Present"
                          }
                          const parsedDate = Date.parse(dateStr);
                          return isNaN(parsedDate)
                            ? ""
                            : new Date(parsedDate).toISOString().split("T")[0];
                        };

                        return (
                          <div key={index} className="resume-education-card">
                            <button
                              className="delete-btn"
                              onClick={() => deleteItem("education", index)}
                            >
                              🗑
                            </button>

                            <label>College:</label>
                            <input
                              className="resume-input"
                              value={edu.college}
                              onChange={(e) => {
                                const updatedEducation = [
                                  ...resumeData.education,
                                ];
                                updatedEducation[index].college =
                                  e.target.value;
                                setResumeData({
                                  ...resumeData,
                                  education: updatedEducation,
                                });
                              }}
                            />

                            <label>Location:</label>
                            <input
                              className="resume-input"
                              value={edu.location}
                              onChange={(e) => {
                                const updatedEducation = [
                                  ...resumeData.education,
                                ];
                                updatedEducation[index].location =
                                  e.target.value;
                                setResumeData({
                                  ...resumeData,
                                  education: updatedEducation,
                                });
                              }}
                            />

                            <label>Degree:</label>
                            <select
                              className="resume-input"
                              value={edu.degree}
                              onChange={(e) => {
                                const updatedEducation = [
                                  ...resumeData.education,
                                ];
                                updatedEducation[index].degree = e.target.value;
                                setResumeData({
                                  ...resumeData,
                                  education: updatedEducation,
                                });
                              }}
                            >
                              {indianDegrees.map((deg, i) => (
                                <option key={i} value={deg}>
                                  {deg}
                                </option>
                              ))}
                            </select>

                            <label>Start Date:</label>
                            <input
                              type="date"
                              className="resume-input"
                              value={parseDate(edu.startDate)}
                              onChange={(e) => {
                                const updatedEducation = [
                                  ...resumeData.education,
                                ];
                                updatedEducation[index].startDate =
                                  e.target.value;
                                setResumeData({
                                  ...resumeData,
                                  education: updatedEducation,
                                });
                              }}
                            />

                            <label>End Date:</label>
                            <input
                              type="date"
                              className="resume-input"
                              value={parseDate(edu.endDate)}
                              onChange={(e) => {
                                const updatedEducation = [
                                  ...resumeData.education,
                                ];
                                updatedEducation[index].endDate =
                                  e.target.value;
                                setResumeData({
                                  ...resumeData,
                                  education: updatedEducation,
                                });
                              }}
                            />
                          </div>
                        );
                      })}
                      <button onClick={addEducation} className="add-btn">
                        + Add Education
                      </button>
                    </div>
                  )}
                </div>

                <div className="resume-accordion">
                  <div
                    className="accordion-header"
                    onClick={() => toggleSection("projects")}
                  >
                    <h3>Projects</h3>
                    {showSections.projects ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </div>
                  {showSections.projects && (
                    <div className="resume-section-form">
                      {resumeData.projects.map((project, index) => (
                        <div key={index} className="resume-project-card">
                          <button
                            className="delete-btn"
                            onClick={() => deleteItem("projects", index)}
                          >
                            🗑
                          </button>
                          <label>Project Name:</label>
                          <input
                            className="resume-input"
                            value={project.name}
                          />
                          <label>Description:</label>
                          <textarea
                            className="resume-textarea"
                            value={project.description.join("\n")}
                          />
                          <label>Technologies:</label>
                          <input
                            className="resume-input"
                            value={project.technologies.join(", ")}
                          />
                        </div>
                      ))}
                      <button onClick={addProject} className="add-btn">
                        + Add Project
                      </button>
                    </div>
                  )}
                </div>

                <button onClick={addOtherSection} className="add-btn">
                  + Add Other Section
                </button>

                {showOtherSections && (
                  <>
                    <div className="resume-accordion">
                      <div
                        className="accordion-header"
                        onClick={() => toggleSection("certifications")}
                      >
                        <h3>Certifications</h3>
                        {showSections.certifications ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </div>
                      {showSections.certifications && (
                        <div className="resume-section-form">
                          {resumeData.certifications.map((cert, index) => (
                            <div
                              key={index}
                              className="resume-certification-card"
                            >
                              <button
                                className="delete-btn"
                                onClick={() =>
                                  deleteItem("certification", index)
                                }
                              >
                                🗑
                              </button>
                              <label>Certificate Name:</label>
                              <input
                                className="resume-input"
                                value={cert.name}
                                onChange={(e) =>
                                  updateCertification(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                              />

                              <label>Description:</label>
                              <textarea
                                className="resume-textarea"
                                value={cert.description}
                                onChange={(e) =>
                                  updateCertification(
                                    index,
                                    "description",
                                    e.target.value
                                  )
                                }
                              />

                              <label>Certificate Link:</label>
                              <input
                                className="resume-input"
                                value={cert.link}
                                onChange={(e) =>
                                  updateCertification(
                                    index,
                                    "link",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          ))}
                          <button
                            onClick={addCertification}
                            className="add-btn"
                          >
                            + Add Certification
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="resume-accordion">
                      <div
                        className="accordion-header"
                        onClick={() => toggleSection("certifications")}
                      >
                        <h3>Achievements</h3>
                        {showSections.certifications ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </div>
                      {showSections.certifications && (
                        <div className="resume-section-form">
                          {resumeData.achievements.map((ach, index) => (
                            <div
                              key={index}
                              className="resume-achievement-card"
                            >
                              <button
                                className="delete-btn"
                                onClick={() =>
                                  deleteItem("achievements", index)
                                }
                              >
                                🗑
                              </button>
                              <label>Achievement Name:</label>
                              <input
                                className="resume-input"
                                value={ach.name}
                                onChange={(e) =>
                                  updateAchievement(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                              />

                              <label>Description:</label>
                              <textarea
                                className="resume-textarea"
                                value={ach.description}
                                onChange={(e) =>
                                  updateAchievement(
                                    index,
                                    "description",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          ))}
                          <button onClick={addAchievement} className="add-btn">
                            + Add Achievement
                          </button>
                        </div>
                      )}
                    </div>

                    <h3>Other Sections</h3>
                    {resumeData?.otherSections?.map((section, index) => (
                      <div key={index} className="resume-other-section">
                        <label>Section Name:</label>
                        <input
                          className="resume-input"
                          value={section.name}
                          onChange={(e) => {
                            const updatedSections = [
                              ...resumeData.otherSections,
                            ];
                            updatedSections[index].name = e.target.value;
                            setResumeData({
                              ...resumeData,
                              otherSections: updatedSections,
                            });
                          }}
                        />
                        <button
                          onClick={() => addSubsection(index)}
                          className="add-btn"
                        >
                          + Add Subsection
                        </button>

                        {section.subsections.map((sub, subIndex) => (
                          <div key={subIndex} className="resume-subsection">
                            <label>Subsection Name:</label>
                            <input className="resume-input" value={sub.name} />
                            <label>Description:</label>
                            <textarea
                              className="resume-textarea"
                              value={sub.description}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </>
                )}

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
