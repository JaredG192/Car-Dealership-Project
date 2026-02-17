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
      {/* FULL-WIDTH HERO SLIDER (top of page) */}
      <section style={styles.heroBanner}>
        <div style={styles.heroSliderFullWidth}>
          <HeroSlider
            slides={[
              {
                image: `${base}/index/hero1.jpg`,
                title: "Affordable Cars for College Students",
                subtitle: "Browse reliable used vehicles + get personalized buying advice.",
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
            height={isMobile ? "420px" : "620px"}
          />
        </div>
      </section>

      {/* EMPLOYEE NOTICE (centered under hero) */}
      <div style={styles.noticeWrap}>
        <div style={styles.container}>
          <div style={styles.notice}>
            <strong>For Employees:</strong>{" "}
            <Link to="/login" style={styles.inlineLink}>
              Login
            </Link>{" "}
            to manage vehicles, consultations, and reports.
          </div>
        </div>
      </div>

      {/* CONTENT (centered sections below) */}
      <div style={styles.content}>
        {/* PORTALS */}
        <section style={styles.sectionCard}>
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
        <section style={styles.sectionCard}>
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
        <section style={styles.sectionCard}>
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
            <a href="https://www.nissanusa.com/" target="_blank" rel="noreferrer" style={styles.footerLink}>
              Nissan
            </a>
            ,{" "}
            <a href="https://www.toyota.com/" target="_blank" rel="noreferrer" style={styles.footerLink}>
              Toyota
            </a>
            ,{" "}
            <a href="https://automobiles.honda.com/" target="_blank" rel="noreferrer" style={styles.footerLink}>
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
    background: "#ffffff",
    color: "#0f172a",
  },

  container: {
    width: "min(1100px, calc(100% - 32px))",
    margin: "0 auto",
  },

  /* Full-width hero banner */
  heroBanner: {
    width: "100%",
    marginTop: 0,
  },

  heroSliderFullWidth: {
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    borderRadius: 0, // full-width look
  },

  noticeWrap: {
    padding: "14px 0 0 0",
  },

  notice: {
    padding: "12px 14px",
    borderRadius: 14,
    background: "rgba(2, 132, 199, 0.08)",
    border: "1px solid rgba(2, 132, 199, 0.20)",
    color: "rgba(15, 23, 42, 0.9)",
    fontWeight: 600,
  },

  inlineLink: {
    color: "#0ea5e9",
    fontWeight: 900,
    textDecoration: "underline",
    textUnderlineOffset: 3,
  },

  content: {
    width: "min(1100px, calc(100% - 32px))",
    margin: "0 auto",
    padding: "18px 0 40px 0",
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },

  sectionCard: {
    borderRadius: 18,
    border: "1px solid rgba(0,0,0,0.10)",
    background: "#ffffff",
    boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
    padding: 18,
  },

  sectionTitle: {
    margin: "0 0 12px 0",
    fontSize: 22,
    fontWeight: 900,
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: 14,
  },

  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 14,
  },

  card: {
    borderRadius: 16,
    padding: 16,
    background: "rgba(15, 23, 42, 0.03)",
    border: "1px solid rgba(0,0,0,0.08)",
  },

  cardTitle: {
    marginTop: 0,
    marginBottom: 8,
    fontWeight: 900,
    fontSize: 18,
  },

  list: {
    margin: "10px 0 0 18px",
    color: "rgba(15, 23, 42, 0.80)",
    fontWeight: 600,
  },

  cardButtons: {
    display: "flex",
    gap: 10,
    marginTop: 12,
    flexWrap: "wrap",
  },

  button: {
    display: "inline-block",
    padding: "12px 16px",
    borderRadius: 999,
    fontWeight: 900,
    textDecoration: "none",
    border: "1px solid rgba(0,0,0,0.12)",
  },

  primary: {
    background: "rgba(0,0,0,0.88)",
    color: "white",
    borderColor: "rgba(0,0,0,0.88)",
  },

  secondary: {
    background: "white",
    color: "rgba(0,0,0,0.86)",
  },

  smallText: {
    marginTop: 10,
    color: "rgba(15, 23, 42, 0.65)",
    fontSize: 12,
    fontWeight: 600,
  },

  stepCard: {
    borderRadius: 16,
    padding: 16,
    background: "rgba(15, 23, 42, 0.03)",
    border: "1px solid rgba(0,0,0,0.08)",
  },

  stepNum: {
    width: 34,
    height: 34,
    background: "rgba(0,0,0,0.88)",
    color: "white",
    fontWeight: 900,
    display: "grid",
    placeItems: "center",
    borderRadius: 12,
    marginBottom: 10,
  },

  stepTitle: { margin: "0 0 6px 0", fontWeight: 900 },
  stepText: { margin: 0, color: "rgba(15, 23, 42, 0.80)", fontWeight: 600 },

  manuWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: 14,
  },

  manuCard: {
    borderRadius: 16,
    padding: 10,
    background: "rgba(15, 23, 42, 0.02)",
    border: "1px solid rgba(0,0,0,0.08)",
  },

  dropdownRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    flexWrap: "wrap",
  },

  dropdownLabel: {
    fontWeight: 900,
    color: "rgba(15, 23, 42, 0.85)",
  },

  select: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.16)",
    background: "white",
    color: "rgba(0,0,0,0.85)",
    fontWeight: 900,
    outline: "none",
  },

  footer: {
    paddingTop: 4,
    color: "rgba(15, 23, 42, 0.60)",
    fontWeight: 600,
  },

  footerLink: {
    color: "#0ea5e9",
    textDecoration: "underline",
    textUnderlineOffset: 3,
    fontWeight: 800,
  },
};
