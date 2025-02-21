
import React, { useState, useEffect } from "react";
import "../styles/Header.css";

function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

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
      <div className="logo">Hi, I'm Nilesh</div>
      <nav className="nav-links">
        <a href="#about" className={activeSection === "about" ? "active" : ""}>About</a>
        <a href="#skills" className={activeSection === "skills" ? "active" : ""}>Skills</a>
        <a href="#experience" className={activeSection === "experience" ? "active" : ""}>Experience</a>
        <a href="#projects" className={activeSection === "projects" ? "active" : ""}>Projects</a>
        <a href="#contact" className={activeSection === "contact" ? "active" : ""}>Contact</a>
        <a href="#resume" className={activeSection === "resume" ? "active" : ""}>Resume</a>
      </nav>
    </header>
  );
}

export default Header;