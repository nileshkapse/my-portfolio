import React from "react";
import "../styles/Experience.css";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

// Function to format start and end date
const formatDateRange = (start, end) => {
  const startDate = new Date(start).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  const isOngoing =
    !end ||
    end === "Present" ||
    new Date(end).toDateString() === new Date().toDateString();

  const endDate = isOngoing
    ? "Present"
    : new Date(end).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });

  return `${startDate} - ${endDate}`;
};

// Function to calculate duration in months from start to end date
const getDurationInMonths = (startDate, endDate) => {
  const start = new Date(startDate);
  const end =
    !endDate ||
    endDate === "Present" ||
    new Date(endDate).toDateString() === new Date().toDateString()
      ? new Date()
      : new Date(endDate);

  return (
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth())
  );
};

// Convert months to "X years Y months" format
const formatDuration = (totalMonths) => {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return `${years} years ${months} months`;
};

// Function to format description into bullet points
const formatDescription = (descriptionArray) => {
  return descriptionArray
    .join(" ") // Join array elements into a single string
    .replace(/•/g, "") // Remove bullet points if present
    .split(". ") // Split at full stops followed by a space
    .filter((sentence) => sentence.trim().length > 0) // Remove empty entries
    .map((sentence, index) => (
      <li key={index}>
        <FaCheckCircle className="bullet-icon" /> {sentence.trim()}.
      </li>
    ));
};

// Group experiences by company and calculate total duration
const groupAndSortExperiences = (experiences) => {
  const grouped = {};

  experiences.forEach((exp) => {
    const { company, location, role, start_date, end_date, description } = exp;

    if (!grouped[company]) {
      grouped[company] = {
        company,
        location,
        positions: [],
        totalMonths: 0, // Initialize total experience duration in months
      };
    }

    const isOngoing =
      !end_date ||
      end_date === "Present" ||
      new Date(end_date).toDateString() === new Date().toDateString();

    const startDate = new Date(start_date);
    const endDate = isOngoing ? null : new Date(end_date);
    const duration = getDurationInMonths(startDate, endDate);

    grouped[company].positions.push({
      role,
      startDate,
      endDate,
      isCurrent: isOngoing,
      displayDuration: formatDateRange(start_date, end_date),
      description,
      duration,
    });

    grouped[company].totalMonths += duration;
  });

  return Object.values(grouped)
    .map((company) => ({
      ...company,
      positions: company.positions.sort((a, b) => {
        if (a.isCurrent && !b.isCurrent) return -1;
        if (!a.isCurrent && b.isCurrent) return 1;
        return b.startDate - a.startDate;
      }),
      totalExperience: formatDuration(company.totalMonths),
    }))
    .sort((a, b) => b.positions[0].startDate - a.positions[0].startDate);
};

const getCompanyLogo = (companyName, website) => {
  if (website) {
    return `https://logo.clearbit.com/${website}`;
  }

  // If website is not available, use Google Favicon API
  return `https://www.google.com/s2/favicons?sz=64&domain=${companyName
    .toLowerCase()
    .replace(/\s+/g, "")}`;
};

function Experience(props) {
  const groupedExperiences = groupAndSortExperiences(props.userData.experience);

  return (
    <section id="experience" className="experience">
      <h2 className="section-title">Experience</h2>
      {groupedExperiences.map((exp, index) => (
        <div className="experience-card" key={index}>
          <img
            src={getCompanyLogo(exp.company, exp.website)}
            alt={exp.company}
            className="company-logo"
            onError={(e) => (e.target.src = "/default-logo.png")} // Fallback image
          />

          <h3>
            <FaBriefcase /> {exp.company}
          </h3>
          <p className="experience-total">
            <FaCalendarAlt /> {exp.totalExperience}
          </p>
          <p className="experience-location">
            <FaMapMarkerAlt /> {exp.location}
          </p>
          {exp.positions.map((position, idx) => (
            <div key={idx} className="position-card">
              <h4>{position.role}</h4>
              <p className="experience-display-duration">
                <FaCalendarAlt /> {position.displayDuration} (
                {formatDuration(position.duration)})
              </p>
              <ul>{formatDescription(position.description)}</ul>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

export default Experience;
