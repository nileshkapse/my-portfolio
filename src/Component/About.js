import React from "react";
import "../styles/About.css";

function About() {
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
          <p className="about-description">
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
          </p>
          <h3>Education</h3>
          <p>
            <strong>VIIT, Pune</strong> - B.Tech. in Computer Engineering |
            CGPA: 9.63 (Aug 2020 - Jun 2023)
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
