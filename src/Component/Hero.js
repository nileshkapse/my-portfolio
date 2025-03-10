import React from "react";
import "../styles/Hero.css";

function Hero(props) {
  return (
    <section className="hero">
      <h1 className="hero-title">Hi, I'm {props.userData.user_details.name}</h1>
      <p className="hero-subtitle">
        {props.userData.user_details.profileheading}
      </p>
    </section>
  );
}

export default Hero;
