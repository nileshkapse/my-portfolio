import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import { FaMoon, FaSun } from "react-icons/fa";
import { Navigate, redirect, useNavigate } from "react-router-dom";

const Header = (props) => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme to body
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          currentSection = section.getAttribute("id");
        }
      });
      setActiveSection(currentSection);
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo" data-theme="light" onClick={() => navigate("/")}>
        <span className="logo-text">
          <span className="instant">Instant</span>
          <span className={`portfolio ${scrolled ? "scrolled" : ""}`}>
            Portfolio
          </span>
        </span>
      </div>

      {/* Mobile Menu Button */}

      <div className="nav-container">
        <div
          className="mobile-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </div>
        {!props.isMainPage && (
          <nav className={`nav-links ${mobileMenuOpen ? "show" : ""}`}>
            {Object.keys(props).length <= 0 && (
              <>
                <a
                  href="#about"
                  className={`${activeSection === "about" ? "active" : ""}  ${
                    scrolled ? "scrolled" : ""
                  } `}
                >
                  About
                </a>
                <a
                  href="#skills"
                  className={`${activeSection === "skills" ? "active" : ""} ${
                    scrolled ? "scrolled" : ""
                  }`}
                >
                  Skills
                </a>
                <a
                  href="#experience"
                  className={`${
                    activeSection === "experience" ? "active" : ""
                  } ${scrolled ? "scrolled" : ""}`}
                >
                  Experience
                </a>
                <a
                  href="#projects"
                  className={`${activeSection === "projects" ? "active" : ""} ${
                    scrolled ? "scrolled" : ""
                  }`}
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  className={`${activeSection === "contact" ? "active" : ""} ${
                    scrolled ? "scrolled" : ""
                  } `}
                >
                  Contact
                </a>
                <a
                  href="#resume"
                  className={`${activeSection === "resume" ? "active" : ""} ${
                    scrolled ? "scrolled" : ""
                  } `}
                >
                  Resume
                </a>
              </>
            )}
            {props.profile_link ? (
              <>
                <img
                  src={props.profile_link || "https://via.placeholder.com/120"}
                  alt="Profile"
                  className="profile-picture"
                  onClick={() => setShowPopup(!showPopup)}
                />
              </>
            ) : null}
            {showPopup && (
              <div className="profile-settings-popup">
                <img
                  src={props.profile_link || "https://via.placeholder.com/120"}
                  alt="Profile"
                  className="profile-settings-picture"
                />
              </div>
            )}
          </nav>
        )}

        <button className="themeToggle" onClick={toggleTheme}>
          {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
