import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-page">
      <div className="about-container">
        {/* Page title */}
        <div className="about-left">
          <h1>About Us</h1>
          <div className="title-accent" /></div>
          <p className="about-text">
          CampusCars is dedicated to helping students in San Bernardino find
          affordable, reliable vehicles. We focus on making the car search
          process simple, transparent, and tailored to student needs.
          </p>
        <div className="about-info-grid">
          <div className="about-card">
            <h3>Our Mission</h3>
            <p>
              CampusCars helps students in San Bernardino find affordable
              and reliable cars. Our platform makes searching, filtering,
              and consulting easy.
            </p>
          </div>

          <div className="about-card">
            <h3>Our Story</h3>
            <p>
              CampusCars was created to support students navigating campus
              life and transportation needs. We aim to simplify car shopping
              with transparency and helpful resources.
            </p>
          </div>

          <div className="about-card">
            <h3>Why Choose Us?</h3>
            <p>
              Easy-to-use platform, clear pricing, and direct consultation
              requests ensure students have a smooth experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;