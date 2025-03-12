import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../styles/MainPage.css";
import { FaMoon, FaSun } from "react-icons/fa";

const MainPage = () => {
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

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="landingContainer">
      {/* Theme Toggle */}
      <button className="themeToggle" onClick={toggleTheme}>
      {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
    </button>

      {/* Hero Section */}
      <header className="heroSection">
        <h1 className="heroTitle">Instant Resume to Portfolio</h1>
        <p className="heroText">
          Upload your resume, fill in details, and get your portfolio live
          instantly.
        </p>
        <button className="ctaButton" onClick={handleGetStarted}>
          Get Started for Free
        </button>
      </header>

      {/* Video Demo Section */}
      <section className="videoDemo">
        <h2 className="sectionTitle">See It in Action</h2>
        <video controls className="demoVideo">
          <source src="/InstantPortfolio.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* How It Works */}
      <section className="howItWorks">
        <h2 className="sectionTitle">How It Works</h2>
        <div className="steps">
          {["Upload Resume", "Customize Details", "Publish & Share"].map(
            (step, index) => (
              <div className="step" key={index}>
                <h3 className="stepTitle">
                  {index + 1}. {step}
                </h3>
                <p className="stepText">
                  {step === "Upload Resume"
                    ? "Upload your resume in PDF or DOC format."
                    : step === "Customize Details"
                    ? "Fill in your personal and professional details."
                    : "Your portfolio site goes live instantly!"}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2 className="sectionTitle">Why Choose Us?</h2>
        <div className="featureList">
          {[
            {
              icon: "🚀",
              title: "Instant Publishing",
              text: "No waiting—your site goes live immediately.",
            },
            {
              icon: "🎨",
              title: "Custom Themes",
              text: "Choose from multiple modern designs.",
            },
            {
              icon: "🔗",
              title: "Share Anywhere",
              text: "Share your portfolio link with recruiters easily.",
            },
          ].map((feature, index) => (
            <div className="feature" key={index}>
              <h3 className="featureTitle">
                {feature.icon} {feature.title}
              </h3>
              <p className="featureText">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2 className="sectionTitle">What Users Say</h2>
        <div className="testimonialList">
          <blockquote className="testimonial">
            "This platform helped me create my portfolio in minutes!" — Aniket Giri
          </blockquote>
          <blockquote className="testimonial">
            "An absolute game-changer for job seekers!" — Nilesh Kapse
          </blockquote>
        </div>
      </section>

      {/* FAQs */}
      <section className="faq">
        <h2 className="sectionTitle">Frequently Asked Questions</h2>
        <details>
          <summary>Is this service free?</summary>
          <p>Yes! You can create your portfolio for free.</p>
        </details>
        <details>
          <summary>Can I edit my portfolio later?</summary>
          <p>Absolutely! You can update it anytime.</p>
        </details>
      </section>

      {/* CTA */}
      <section className="ctaSection">
        <h2 className="ctaTitle">Create Your Free Portfolio Now!</h2>
        <button className="ctaButton" onClick={handleGetStarted}>
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footerText">
          &copy; 2025 InstantPortfolio. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default MainPage;
