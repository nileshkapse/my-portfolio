import React from "react";
import "../styles/About.css";

function About(props) {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <img
          src="https://avatars.githubusercontent.com/u/42781320?v=4"
          alt="Nilesh Prakash Kapse"
          className="profile-pic"
        />
        <div className="about-content">
          <h2>About Me</h2>
          {/* <p className="about-description">
            <strong>Dynamic and results-driven</strong>{" "}
            <span className="highlight">Software Development Engineer</span>{" "}
            with
            <strong> 2+ years of expertise</strong> in{" "}
            <span className="highlight">Frontend, Backend, and DevOps</span>.
            Specializing in{" "}
            <span className="highlight">
              ReactJS, AWS (Amazon Web Services), Flask, and NodeJS
            </span>
            , adept at
            <strong>enhancing user experience</strong> through{" "}
            <strong>scalable and high-performance applications</strong>. Proven
            ability in{" "}
            <span className="highlight">
              proactive problem-solving, deep debugging, and agile methodologies
            </span>
            , ensuring <strong>efficient, high-quality solutions</strong> that
            drive{" "}
            <span className="highlight">
              business growth and operational excellence
            </span>
            .
          </p> */}
          <p className="about-description">
            {props.userData.user_details.summary}
          </p>
          <h3>Education</h3>
          {props.userData.education.map((edu) => (
            <p key={edu.id}>
              <strong>
                {edu.college}, {edu.location}
              </strong>{" "}
              - {edu.degree} | CGPA: {edu.cgpa} (
              {edu.start_date
                ? new Date(edu.start_date).toLocaleString("en-US", {
                    month: "short",
                    year: "numeric",
                  })
                : "Start"}{" "}
              -{" "}
              {new Date(edu.end_date).toLocaleString("en-US", {
                month: "short",
                year: "numeric",
              })}
              )
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
