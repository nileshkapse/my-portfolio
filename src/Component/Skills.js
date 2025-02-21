import React, { useState } from "react";
import "../styles/Skills.css";

const experiencesData = [
  {
    role: "Software Engineer",
    company: "Musafir.com",
    skillsUsed: ["ReactJS", "AWS"],
    description:
      "Developed Infra-services Web App and optimized UI/UX using ReactJS and AWS.",
  },
  {
    role: "Software Engineer Intern",
    company: "Musafir.com",
    skillsUsed: ["Flask", "AWS"],
    description:
      "Built backend APIs and automation scripts using Flask and AWS.",
  },
  {
    role: "Backend Developer",
    company: "Freelance",
    skillsUsed: ["NodeJS", "JavaScript"],
    description:
      "Implemented API endpoints and backend logic for various web applications.",
  },
];

const projectsData = [
  {
    name: "OTP Sending and Verification System",
    skillsUsed: ["Python", "Flask", "AWS"],
    description: "Secure OTP system using Flask API, AWS, and Redis.",
  },
  {
    name: "Musafir.com Infra-services Web App",
    skillsUsed: ["ReactJS", "AWS"],
    description:
      "Automated cloud infrastructure management using ReactJS and AWS.",
  },
  {
    name: "Vehicle Finance Management System",
    skillsUsed: ["JavaScript", "NodeJS"],
    description: "Built backend logic and UI for vehicle finance tracking.",
  },
];
const skills = {
  languages: [
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "Python",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "TypeScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "Java",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
  ],
  technologies: [
    {
      name: "ReactJS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "AWS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    },
    {
      name: "Flask",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    },
    {
      name: "NodeJS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Docker",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "Terraform",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
    },
  ],
  tools: ["Git", "GitHub", "BitBucket", "Postman", "SourceTree"],
  softSkills: [
    "Problem-Solving",
    "Team Collaboration",
    "Agile Methodologies",
    "Effective Communication",
    "Critical Thinking",
    "Debugging/Troubleshooting",
    "Data Structures & Algorithms",
    "OOPs Concepts",
  ],
};

function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [relatedExperiences, setRelatedExperiences] = useState([]);

  const handleSkillClick = (skillName) => {
    const filteredProjects = projectsData.filter((project) =>
      project.skillsUsed.includes(skillName)
    );
    const filteredExperiences = experiencesData.filter((exp) =>
      exp.skillsUsed.includes(skillName)
    );
    setSelectedSkill(skillName);
    setRelatedProjects(filteredProjects);
    setRelatedExperiences(filteredExperiences);
  };

  return (
    <section id="skills" className="skills">
      <h2 className="section-title">Skills</h2>
      <div className="skills-container">
        {Object.entries(skills).map(([category, skillList], index) => (
          <div className="skills-category" key={index}>
            <h3>{category.replace(/([A-Z])/g, " $1").trim()}</h3>
            <div
              className={
                Array.isArray(skillList[0]) ? "skills-grid" : "soft-skills-list"
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
                      <strong>{project.name}:</strong> {project.description}
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
                        {exp.role} at {exp.company}:
                      </strong>{" "}
                      {exp.description}
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
