import React, { useState } from "react";
import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import "../styles/MySkillAndResume.css";

const MySkillAndResume = ({ skills = [], experience = [] }) => {
  const [expList, setExpList] = useState(experience);
  const [skillList, setSkillList] = useState(skills);
  const [newSkill, setNewSkill] = useState("");
  const [newExperience, setNewExperience] = useState({ company: "", role: "", years: "" });

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkillList([...skillList, newSkill]);
      setNewSkill("");
    }
  };

  const addExperience = () => {
    if (newExperience.company && newExperience.role && newExperience.years) {
      setExpList([...expList, newExperience]);
      setNewExperience({ company: "", role: "", years: "" });
    }
  };

  return (
    <div className="dashboard-container">
      {/* Skills Section */}
      <div className="skills-section">
        <h2>Skills</h2>
        <div className="skill-tags">
          {skillList.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
        <div className="skill-input">
          <input
            type="text"
            placeholder="Add a skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button onClick={addSkill}><FaPlus /></button>
        </div>
      </div>

      {/* Experience Section */}
      <div className="experience-section">
        <h2>Experience</h2>
        {expList.map((exp, index) => (
          <div key={index} className="experience-card">
            <div>
              <h3>{exp.company}</h3>
              <p><strong>Role:</strong> {exp.role}</p>
              <p><strong>Years:</strong> {exp.years}</p>
            </div>
            <div className="experience-actions">
              <FaPencilAlt className="edit-icon" />
              <FaTrash className="delete-icon" onClick={() => {
                setExpList(expList.filter((_, i) => i !== index));
              }} />
            </div>
          </div>
        ))}
        <div className="experience-input">
          <input
            type="text"
            placeholder="Company"
            value={newExperience.company}
            onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            value={newExperience.role}
            onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
          />
          <input
            type="number"
            placeholder="Years"
            value={newExperience.years}
            onChange={(e) => setNewExperience({ ...newExperience, years: e.target.value })}
          />
          <button onClick={addExperience}><FaPlus /></button>
        </div>
      </div>
    </div>
  );
};

export default MySkillAndResume;
