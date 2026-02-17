// Homepage.js

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ManufacturerCard from "./ManufacturerCard";
import HeroSlider from "./heroSlider"; // change to "./HeroSlider" if file is HeroSlider.js

export default function Homepage() {
  const base = process.env.PUBLIC_URL;

  const [isMobile, setIsMobile] = useState(false);
  const [selectedMake, setSelectedMake] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);

    setIsMobile(mq.matches);

    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }

    // Fallback for older Safari
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);

  // Manufacturer list (student-friendly brands)
  const manufacturers = [
    { name: "Nissan", description: "Browse Nissan models in our inventory.", image: `${base}/index/Nissan.png`, link: "/nissan" },
    { name: "Toyota", description: "Browse Toyota models in our inventory.", image: `${base}/index/Toyota.png`, link: "/toyota" },
    { name: "Honda", description: "Browse Honda models in our inventory.", image: `${base}/index/Honda.png`, link: "/honda" },
    { name: "Subaru", description: "Browse Subaru models in our inventory.", image: `${base}/index/Subaru.png`, link: "/subaru" },
    { name: "Mazda", description: "Browse Mazda models in our inventory.", image: `${base}/index/Mazda.png`, link: "/mazda" },
    { name: "Kia", description: "Browse Kia models in our inventory.", image: `${base}/index/Kia.png`, link: "/kia" },
    { name: "Ford", description: "Browse Ford models in our inventory.", image: `${base}/index/Ford.png`, link: "/ford" },
    { name: "Chevrolet", description: "Browse Chevrolet models in our inventory.", image: `${base}/index/Chevrolet.png`, link: "/chevrolet" },
  ];

  // Dropdown navigation (React Router safe)
  const handleMakeChange = (e) => {
    const value = e.target.value;
    setSelectedMake(value);
    if (value) navigate(value);
  };

  return (
    <div style={styles.page}>
      {/* Background */}
      <div
        style={{
          ...styles.background,
          backgroundImage: `url(${base}/index/cars.jpeg)`,
        }}
      />

      {/* Content */}
      <div style={styles.content}>
        {/* HERO */}
        <section style={{ ...styles.hero, ...(isMobile ? {} : styles.glass) }}>
          <h1 style={styles.title}>CampusCars</h1>

          <p style={styles.subtitle}>
            Affordable, student-friendly used cars + personalized purchase consultation.
          </p>

          {/* CarFam-style hero banner slider */}
          <div style={styles.heroSliderWrap}>
            <HeroSlider
              slides={[
                {
                  image: `${base}/index/hero1.jpg`,
                  title: "Affordable Cars for College Students",
                  subtitle:
                    "Browse reliable used vehicles + get personalized buying advice.",
                  ctas: [
                    { label: "Browse Inventory", href: "/inventory", variant: "primary" },
                    { label: "Get Consultation", href: "/consultation", variant: "secondary" },
                  ],
                },
                {
                  image: `${base}/index/hero2.jpg`,
                  title: "Find the Right Car Fast",
                  subtitle: "Filter by budget, mileage, and your needs.",
                  ctas: [{ label: "View Cars", href: "/inventory", variant: "primary" }],
                },
                {
                  image: `${base}/index/hero3.jpg`,
                  title: "Student-Friendly Guidance",
                  subtitle: "We help you choose a car that fits your life and your budget.",
                  ctas: [{ label: "Book Consultation", href: "/consultation", variant: "primary" }],
                },
              ]}
              height="clamp(300px, 55vw, 520px)"
            />
          </div>

          {/* Employee notice */}
          <div style={styles.notice}>
            <strong>For Employees:</strong>{" "}
            <Link to="/login" style={styles.inlineLink}>
              Login
            </Link>{" "}
            to manage vehicles, consultations, and reports.
          </div>
        </section>

        {/* PORTALS */}
        <section style={{ ...styles.section, ...(isMobile ? {} : styles.glass) }}>
          <h2 style={styles.sectionTitle}>Portals</h2>

          <div style={styles.grid2}>
            {/* Student */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Student Portal</h3>

              <ul style={styles.list}>
                <li>Browse used vehicles</li>
                <li>Filter by budget and mileage</li>
                <li>Book consultations</li>
                <li>Get recommendations</li>
              </ul>

              <div style={styles.cardButtons}>
                <Link to="/inventory" style={{ ...styles.button, ...styles.primary }}>
                  View Cars
                </Link>

                <Link to="/consultation" style={{ ...styles.button, ...styles.secondary }}>
                  Book Consultation
                </Link>
              </div>
            </div>

            {/* Employee */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Employee Portal</h3>

              <ul style={styles.list}>
                <li>Manage inventory</li>
                <li>Track consultations</li>
                <li>View reports</li>
                <li>Admin controls</li>
              </ul>

              <div style={styles.cardButtons}>
                <Link to="/login" style={{ ...styles.button, ...styles.primary }}>
                  Employee Login
                </Link>

                <Link to="/dashboard" style={{ ...styles.button, ...styles.secondary }}>
                  Dashboard
                </Link>
              </div>

              <p style={styles.smallText}>
                *Dashboard access will depend on your clearance level.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ ...styles.section, ...(isMobile ? {} : styles.glass) }}>
          <h2 style={styles.sectionTitle}>How it Works</h2>

          <div style={styles.grid3}>
            {["Browse", "Match", "Consult"].map((step, i) => (
              <div key={i} style={styles.stepCard}>
                <div style={styles.stepNum}>{i + 1}</div>

                <h4 style={styles.stepTitle}>{step}</h4>

                <p style={styles.stepText}>
                  {step === "Browse" && "Explore vehicles and compare options."}
                  {step === "Match" &&
                    "Tell us your budget and needs for student-friendly recommendations."}
                  {step === "Consult" &&
                    "Book a consultation/test drive with a dealership consultant."}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* MANUFACTURERS */}
        <section style={{ ...styles.section, ...(isMobile ? {} : styles.glass) }}>
          <h2 style={styles.sectionTitle}>Browse by Manufacturer</h2>

          {/* Dropdown */}
          <div style={styles.dropdownRow}>
            <label style={styles.dropdownLabel} htmlFor="makeSelect">
              Shop by:
            </label>

            <select
              id="makeSelect"
              value={selectedMake}
              onChange={handleMakeChange}
              style={styles.select}
            >
              <option value="">Select a brand</option>
              {manufacturers.map((m) => (
                <option key={m.name} value={m.link}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Cards */}
          <div style={styles.manuWrap}>
            {manufacturers.map((m) => (
              <div key={m.name} style={styles.manuCard}>
                <ManufacturerCard {...m} />
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <small>
            Official sites:{" "}
            <a href="https://www.nissanusa.com/" target="_blank" rel="noreferrer" style={styles.inlineLink}>
              Nissan
            </a>
            ,{" "}
            <a href="https://www.toyota.com/" target="_blank" rel="noreferrer" style={styles.inlineLink}>
              Toyota
            </a>
            ,{" "}
            <a href="https://automobiles.honda.com/" target="_blank" rel="noreferrer" style={styles.inlineLink}>
              Honda
            </a>
          </small>
        </footer>
      </div>
    </div>
  );
}

/* ================== STYLES ================== */

const styles = {
  page: {
    position: "relative",
    minHeight: "100dvh",
    overflowX: "hidden",
  },

  background: {
    position: "fixed",
    inset: 0,
    filter: "brightness(0.60)",
    pointerEvents: "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  content: {
    position: "relative",
    zIndex: 1,
    padding: "clamp(14px, 4vw, 28px)",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  hero: {
    padding: "22px",
    borderRadius: "14px",
    background: "rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.12)",
    marginBottom: "22px",
  },

  title: {
    color: "white",
    margin: 0,
    fontSize: "clamp(28px, 6vw, 44px)",
    fontWeight: 900,
    textShadow: "0 4px 20px rgba(0,0,0,0.6)",
  },

  subtitle: {
    color: "rgba(255,255,255,0.9)",
    marginTop: "10px",
    lineHeight: 1.4,
  },

  heroSliderWrap: {
    marginTop: "14px",
    borderRadius: "12px",
    overflow: "hidden",
  },

  button: {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: "10px",
    fontWeight: 800,
    textDecoration: "none",
  },

  primary: { background: "white", color: "black" },

  secondary: {
    background: "rgba(255,255,255,0.16)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.25)",
  },

  notice: { marginTop: "14px", color: "rgba(255,255,255,0.92)" },

  inlineLink: { color: "white", textDecoration: "underline" },

  section: {
    marginTop: "18px",
    padding: "18px",
    borderRadius: "14px",
    background: "rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.12)",
  },

  sectionTitle: { color: "white", marginTop: 0, marginBottom: "12px" },

  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: "14px",
  },

  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "14px",
  },

  card: {
    borderRadius: "12px",
    padding: "14px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
  },

  cardTitle: { color: "white", marginTop: 0 },

  list: { color: "rgba(255,255,255,0.92)", margin: "10px 0 0 18px" },

  cardButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "12px",
    flexWrap: "wrap",
  },

  smallText: { color: "rgba(255,255,255,0.8)", marginTop: "10px", fontSize: "12px" },

  stepCard: {
    borderRadius: "12px",
    padding: "14px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
  },

  stepNum: {
    width: "32px",
    height: "32px",
    background: "white",
    color: "black",
    fontWeight: 900,
    display: "grid",
    placeItems: "center",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  stepTitle: { color: "white", margin: "0 0 6px 0" },

  stepText: { color: "rgba(255,255,255,0.9)", margin: 0 },

  manuWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "14px",
  },

  manuCard: {
    borderRadius: "12px",
    padding: "10px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
  },

  dropdownRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
    flexWrap: "wrap",
  },

  dropdownLabel: {
    color: "white",
    fontWeight: 800,
  },

  select: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(0,0,0,0.35)",
    color: "white",
    fontWeight: 800,
    outline: "none",
  },

  glass: {
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  },

  footer: {
    marginTop: "18px",
    color: "rgba(255,255,255,0.85)",
  },
};
