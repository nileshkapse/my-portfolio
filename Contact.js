// src/components/Contact.js
import React, { useState } from "react";
import "../styles/Contact.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaPaperPlane,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

function Contact(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // emailjs
    //   .send(
    //     "service_yz2lgll", // Replace with your EmailJS Service ID
    //     "template_0vhi8hm", // Replace with your EmailJS Template ID
    //     {
    //       from_name: formData.name,
    //       from_email: formData.email,
    //       phone: formData.phone,
    //       message: formData.message,
    //     },
    //     "_CgICdkLfamIrpPyI" // Replace with your EmailJS Public Key
    //   )
    //   .then(
    //     (response) => {
    //       console.log("SUCCESS!", response.status, response.text);
    //       setSubmitted(true);
    //       setTimeout(() => setSubmitted(false), 3000);
    //     },
    //     (error) => {
    //       console.error("FAILED...", error);
    //     }
    //   );
  };

  return (
    <section id="contact" className="contact">
      <h2 className="section-title">Contact Me</h2>
      <p>
        Interested in collaborating, hiring, or discussing a project? Feel free
        to reach out for job opportunities, freelance work, or professional
        inquiries!
      </p>
      <div className="contact-section">
        <div className="contact-details">
          <p>
            <FaEnvelope /> {props.userData.user_details.email}
          </p>
          <p>
            <FaPhone /> {props.userData.user_details.phone}
          </p>
          <p>
            <FaLinkedin />{" "}
            <a
              href={props.userData.user_details.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.userData.user_details.linkedin.replace(
                /(^\w+:|^)\/\//,
                ""
              )}
            </a>
          </p>
          <p>
            <FaGithub />{" "}
            <a
              href={props.userData.user_details.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.userData.user_details.github.replace(/(^\w+:|^)\/\//, "")}
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <FaPhone className="icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="submit-btn">
            <FaPaperPlane /> Send Message
          </button>
          {submitted && (
            <p className="success-message">Message Sent Successfully!</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
