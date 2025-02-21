import React from "react";
import "../styles/Experience.css";
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

const calculateExperience = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years > 0 ? years + ' year' + (years > 1 ? 's ' : ' ') : ''}${months > 0 ? months + ' month' + (months > 1 ? 's ' : ' ') : ''}${days > 0 ? days + ' day' + (days > 1 ? 's' : '') : ''}`.trim();
};

const experiences = [
  {
    company: "Musafir.com",
    logo: "https://in.musafir.com/Resource/Image/Logo/Musafir.svg",
    location: "Pune, Maharashtra, India",
    totalExperience: "2 years 2 months",
    positions: [
      {
        role: "Software Engineer",
        startDate: "2023-07-01",
        endDate: null,
        displayDuration: "Jul 2023 - Present",
        description: [
          "Implemented disaster recovery using Terraform for backup instances.",
          "Integrated and optimized OTP authentication system for security.",
          "Developed B2B & Leisure services using ReactJS, enhancing UI/UX.",
          "Proactively resolved technical challenges to streamline operations."
        ]
      },
      {
        role: "Software Engineer Intern",
        startDate: "2023-01-01",
        endDate: "2023-06-30",
        displayDuration: "Jan 2023 - Jun 2023",
        description: [
          "Developed an internal services project using ReactJS, AWS, and JavaScript.",
          "Implemented image upload to S3 bucket for efficient storage.",
          "Gained experience in team collaboration and Scrum processes.",
          "Participated in code reviews and troubleshooting, enhancing development skills."
        ]
      }
    ]
  }
];

function Experience() {
  return (
    <section id="experience" className="experience">
      <h2 className="section-title">Experience</h2>
      {experiences.map((exp, index) => (
        <div className="experience-card" key={index}>
          <img src={exp.logo} alt={exp.company} className="company-logo" />
          <h3>
            <FaBriefcase /> {exp.company}
          </h3>
          <p className="experience-location">
            <FaMapMarkerAlt /> {exp.location}
          </p>
          <p className="experience-total">
            <FaCalendarAlt /> {exp.totalExperience}
          </p>
          {exp.positions.map((position, idx) => (
            <div key={idx} className="position-card">
              <h4>{position.role}</h4>
              <p className="experience-display-duration">
                <FaCalendarAlt /> {position.displayDuration} (
                {calculateExperience(position.startDate, position.endDate)})
              </p>
              <ul>
                {position.description.map((point, id) => (
                  <li key={id}>
                    <FaCheckCircle className="bullet-icon" /> {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

export default Experience;