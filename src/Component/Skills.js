import React, { useState } from "react";
import "../styles/Skills.css";

function Skills(props) {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [relatedExperiences, setRelatedExperiences] = useState([]);

  const normalizeTechName = (tech) => {
    if (typeof tech !== "string") return ""; // Ensure it's a string
    return tech.toLowerCase().replace(/\s+|\.|-/g, "");
  };

  const handleSkillClick = (skillName) => {
    const normalizedSkill = normalizeTechName(skillName);

    // ✅ Filter Projects (Already Working Fine)
    const filteredProjects = props.userData.projects.filter((project) =>
      project.technologies?.some((tech) => {
        const normalizedTech = normalizeTechName(tech);
        return normalizedTech.includes(normalizedSkill);
      })
    );

    const filteredExperience = props.userData.experience.filter((exp) => {
      // Join all description lines into one string
      const experienceText = exp.description.join(" ").toLowerCase();

      // Check if the normalized skill exists in the description
      return experienceText.includes(normalizedSkill);
    });

    // ✅ Update State
    setSelectedSkill(skillName);
    setRelatedProjects(filteredProjects);
    setRelatedExperiences(filteredExperience);
  };

  const getLogoUrl = (skillName) => {
    // Define custom mappings for skills with non-standard URLs
    const customLogos = {
      reactjs: "react",
      aws: "amazonwebservices",
      html: "html5",
      css: "css3",
      nodejs: "nodejs",
      flask: "flask",
      terraform: "terraform",
      docker: "docker",
      java: "java",
      javascript: "javascript",
      typescript: "typescript",
      python: "python",
      git: "git",
      github: "github",
      bitbucket: "bitbucket",
      postman: "postman",
      sourcetree: "sourcetree",
      ec2: "amazonwebservices",
      s3: "amazonwebservices",
      lambda: "amazonwebservices",
    };

    // Format name: lowercase, remove spaces, handle special cases
    const formattedName = skillName.toLowerCase().replace(/\s+/g, "");

    // Get mapped name if exists, otherwise use formatted name
    const logoName = customLogos[formattedName] || formattedName;

    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${logoName}/${logoName}-original.svg`;
  };

  const mappedSkills = {
    languages: props.userData.skills[0].languages.length
      ? props.userData.skills[0].languages.map((name) => ({
          name,
          logo: getLogoUrl(name),
        }))
      : null,
    technologies: props.userData.skills[0].technologies.length
      ? props.userData.skills[0].technologies
          .filter((name) => !["Skills", "Technologies :"].includes(name)) // Remove unwanted labels
          .map((name) => ({
            name,
            logo: getLogoUrl(name),
          }))
      : null,
    tools: props.userData.skills[0].tools.length
      ? props.userData.skills[0].tools
      : null,
    softSkills: props.userData.skills[0].other.length
      ? props.userData.skills[0].other
      : null,
  };

  return (
    <section id="skills" className="skills">
      <h2 className="section-title">Skills</h2>
      <div className="skills-container">
        {Object.entries(mappedSkills)
          .filter(([_, skillList]) => skillList) // 🔹 Show only non-empty categories
          .map(([category, skillList], index) => (
            <div className="skills-category" key={index}>
              <h3>{category.replace(/([A-Z])/g, " $1").trim()}</h3>
              <div
                className={
                  Array.isArray(skillList[0])
                    ? "skills-grid"
                    : "soft-skills-list"
                }
              >
                {skillList.map((skill, idx) =>
                  typeof skill === "string" ? (
                    <li key={idx} className="soft-skill">
                      {skill}
                    </li>
                  ) : (
                    <div
                      className="skill-card"
                      key={idx}
                      onClick={() => handleSkillClick(skill.name)}
                    >
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="skill-logo"
                      />
                      <p>{skill.name}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
      </div>
      {selectedSkill && (
        <div className="skill-popup" onClick={() => setSelectedSkill(null)}>
          <div className="skill-popup-content">
            <h3>{selectedSkill}</h3>
            <div className="popup-section">
              <h4>Used in Projects:</h4>
              <ul>
                {relatedProjects.length > 0 ? (
                  relatedProjects.map((project, index) => (
                    <li key={index} className="popup-item">
                      <strong>{project.name}</strong>
                    </li>
                  ))
                ) : (
                  <p>No related projects found.</p>
                )}
              </ul>
            </div>
            <div className="popup-section">
              <h4>Used in Experience:</h4>
              <ul>
                {relatedExperiences.length > 0 ? (
                  relatedExperiences.map((exp, index) => (
                    <li key={index} className="popup-item">
                      <strong>
                        {exp.role} at {exp.company}
                      </strong>{" "}
                      {/* {exp.description} */}
                    </li>
                  ))
                ) : (
                  <p>No related experiences found.</p>
                )}
              </ul>
            </div>
            <button
              className="popup-close"
              onClick={() => setSelectedSkill(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Skills;
