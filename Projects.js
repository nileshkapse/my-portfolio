// src/components/Projects.js
import React, { useState } from "react";
import "../styles/Projects.css";
import { FaCheckCircle } from "react-icons/fa";

const projects = [
  {
    name: "OTP Sending and Verification System",
    shortDescription: "Secure OTP system using ReactJS, Flask, AWS, and Redis.",
    fullDescription: [
      "Developed a secure system for sending and verifying OTPs via email.",
      "Created a Flask API for OTP generation, email sending with SMTP, and verification, storing OTPs in Redis for efficient retrieval.",
      "Implemented frontend forms to send API calls, handle OTP input, and manage login based on the response.",
      "Enhanced user authentication by distinguishing legitimate users from dummy accounts.",
    ],
    impact: "Enhanced user authentication security",
    github: "https://github.com/nileshkapse/otp-verification",
    image: "",
  },
  {
    name: "Musafir.com Infra-services Web App",
    shortDescription: "Automated cloud infrastructure management.",
    fullDescription: [
      "Developed an application that automates the process of uploading images to the cloud (S3 bucket).",
      "Managed server instances and other infrastructure-related functionalities using ReactJS, AWS, and PostgreSQL.",
      "Improved cloud management efficiency through better resource allocation.",
      "Implemented real-time monitoring and alerts for system performance.",
    ],
    impact: "Improved cloud management efficiency",
    github: "https://github.com/nileshkapse/infra-services",
    image: "",
  },
  {
    name: "Vehicle Finance Management System",
    shortDescription: "Platform for managing vehicle finance and allocations.",
    fullDescription: [
      "Developed a website for an industry-sponsored project where the client manages finance bank vehicle data and allocates it to the seizures.",
      "Built using ReactJS, NodeJS, and MSSQL, it streamlines the vehicle finance process.",
      "Implemented secure authentication and role-based access control.",
      "Optimized performance for handling large-scale financial data.",
    ],
    impact: "Optimized finance tracking and resource allocation",
    github: "https://github.com/nileshkapse/vehicle-finance",
    image: "",
  },
];

function Projects(props) {
  const [expandedProject, setExpandedProject] = useState(null);

  const toggleReadMore = (index) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <section id="projects" className="projects">
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {props.userData.projects.map((project, index) => (
          <div className="project-card" key={index}>
            {project.image && project.image.trim() !== "" && (
              <img
                src={project.image}
                alt={project.name}
                className="project-image"
              />
            )}
            <h3>{project.name}</h3>
            {expandedProject === index ? (
              <ul className="project-details">
                {project.description.map((point, idx) => (
                  <li key={idx}>
                    <FaCheckCircle className="bullet-icon" /> {point}
                  </li>
                ))}
              </ul>
            ) : (
              <p>{project.shortdescription}</p>
            )}
            <p className="project-impact">{project.impact}</p>
            <div className="project-buttons">
              <button
                onClick={() => toggleReadMore(index)}
                className="read-more-btn"
              >
                {expandedProject === index ? "Read Less" : "Read More"}
              </button>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
