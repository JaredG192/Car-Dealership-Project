// Homepage.js
// Purpose:
// - Main landing page for the Car Dealership system (student-facing + employee-facing)
// - Highlights the "personalized consultation for college students" requirement
// - Provides navigation entry points for inventory, consultation, login, and dashboard
// - Renders manufacturers dynamically using a reusable ManufacturerCard component
//
// Note on GitHub Pages:
// - We use process.env.PUBLIC_URL for all images so they load correctly when the app
//   is hosted at https://username.github.io/repo-name/ (subpath hosting).

import React, { useEffect, useState } from "react";
import ManufacturerCard from "./ManufacturerCard";

export default function Homepage() {
  // PUBLIC_URL ensures correct asset paths in production (especially GitHub Pages).
  // Example deployed base:
  // https://JaredG192.github.io/Car-Dealership-Project
  const base = process.env.PUBLIC_URL;

  // Detect mobile screens so background can be "contain" on phones and "cover" on desktop
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);

    setIsMobile(mq.matches); // initial

    // Modern browsers
    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }

    // Fallback for older Safari
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);

  // Manufacturer data used to render brand cards dynamically.
  // Later: replace this with backend inventory/manufacturer endpoints if desired.
  const manufacturers = [
    {
      name: "Nissan",
      description: "Browse Nissan models in our inventory.",
      image: `${base}/index/Nissan.png`,
      link: "/nissan", // Later: route to Nissan page or filtered inventory
    },
    {
      name: "Porsche",
      description: "Browse Porsche models in our inventory.",
      image: `${base}/index/Porsche.png`,
      link: "/porsche",
    },
    {
      name: "Toyota",
      description: "Browse Toyota models in our inventory.",
      image: `${base}/index/Toyota.png`,
      link: "/toyota",
    },
  ];

  return (
    <div style={styles.page}>
      {/* Background layer (darkened for readability) */}
      <div
        style={{
          ...styles.background,
          backgroundImage: `url(${base}/index/cars.jpeg)`,
          backgroundSize: isMobile ? "contain" : "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "black",
        }}
      />

      {/* Foreground content */}
      <div style={styles.content}>
        {/* HERO: what this system is + primary calls-to-action */}
        <section style={{ ...styles.hero, ...(isMobile ? {} : styles.glass) }}>
          <h1 style={styles.title}>Car Dealership</h1>
          <p style={styles.subtitle}>
            Student-friendly used cars + personalized purchase consultation.
          </p>

          {/* Primary actions for the student-facing side */}
          <div style={styles.heroButtons}>
            <a href="/inventory" style={{ ...styles.button, ...styles.primary }}>
              Browse Inventory
            </a>
            <a href="/consultation" style={{ ...styles.button, ...styles.secondary }}>
              Get Consultation
            </a>
          </div>

          {/* Employee-facing entry point (role-based access happens after login) */}
          <div style={styles.notice}>
            <strong>For Employees:</strong>{" "}
            <a href="/login" style={styles.inlineLink}>
              Login
            </a>{" "}
            to manage vehicles, consultations, and reports.
          </div>
        </section>

        {/* PORTALS: explicitly connects to your thesis requirements */}
        <section style={{ ...styles.section, ...(isMobile ? {} : styles.glass) }}>
          <h2 style={styles.sectionTitle}>Portals</h2>

          <div style={styles.grid2}>
            {/* Student Portal card */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Student Portal</h3>
              <ul style={styles.list}>
                <li>Browse used vehicles</li>
                <li>Filter by budget, mileage, and needs</li>
                <li>Book a consultation or test drive</li>
                <li>Get recommendations based on your preferences</li>
              </ul>

              <div style={styles.cardButtons}>
                <a href="/inventory" style={{ ...styles.button, ...styles.primary }}>
                  View Cars
                </a>
                <a href="/consultation" style={{ ...styles.button, ...styles.secondary }}>
                  Book Consultation
                </a>
              </div>
            </div>

            {/* Employee Portal card */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Employee Portal</h3>
              <ul style={styles.list}>
                <li>Role-based access (Sales / Manager / Admin)</li>
                <li>Manage inventory and vehicle details</li>
                <li>Track consultations and customer requests</li>
                <li>View reports and analytics</li>
              </ul>

              <div style={styles.cardButtons}>
                <a href="/login" style={{ ...styles.button, ...styles.primary }}>
                  Employee Login
                </a>
                <a href="/dashboard" style={{ ...styles.button, ...styles.secondary }}>
                  Dashboard
                </a>
              </div>

              <p style={styles.smallText}>
                *Dashboard access will depend on your clearance level.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS: makes the user flow obvious for presentations */}
       <section style={{ ...styles.section, ...(isMobile ? {} : styles.glass) }}>
          <h2 style={styles.sectionTitle}>How it works</h2>

          <div style={styles.grid3}>
            <div style={styles.stepCard}>
              <div style={styles.stepNum}>1</div>
              <h4 style={styles.stepTitle}>Browse</h4>
              <p style={styles.stepText}>
                Explore used vehicles and compare options.
              </p>
            </div>

            <div style={styles.stepCard}>
              <div style={styles.stepNum}>2</div>
              <h4 style={styles.stepTitle}>Match</h4>
              <p style={styles.stepText}>
                Tell us your budget and needs to get personalized recommendations.
              </p>
            </div>

            <div style={styles.stepCard}>
              <div style={styles.stepNum}>3</div>
              <h4 style={styles.stepTitle}>Consult</h4>
              <p style={styles.stepText}>
                Book a consultation/test drive with a dealership consultant.
              </p>
            </div>
          </div>
        </section>

        {/* MANUFACTURERS: shows "browse by brand" and demonstrates reusable components */}
        <section style={{ ...styles.section, ...(isMobile ? {} : styles.glass) }}>
          <h2 style={styles.sectionTitle}>Browse by manufacturer</h2>

          <div style={styles.manuWrap}>
            {manufacturers.map((m) => (
              <div key={m.name} style={styles.manuCard}>
                <ManufacturerCard
                  name={m.name}
                  description={m.description}
                  image={m.image}
                  link={m.link}
                />
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER: external links (kept from your original HTML concept) */}
        <footer style={styles.footer}>
          <small>
            Visit official sites for more info:{" "}
            <a
              href="https://www.nissanusa.com/"
              target="_blank"
              rel="noreferrer"
              style={styles.inlineLink}
            >
              Nissan
            </a>
            ,{" "}
            <a
              href="https://www.porsche.com/"
              target="_blank"
              rel="noreferrer"
              style={styles.inlineLink}
            >
              Porsche
            </a>
            ,{" "}
            <a
              href="https://www.toyota.com/"
              target="_blank"
              rel="noreferrer"
              style={styles.inlineLink}
            >
              Toyota
            </a>
          </small>
        </footer>
      </div>
    </div>
  );
}

// Inline styles for quick iteration.
// Later: you can move these into a CSS file or CSS modules if your team prefers.
const styles = {
  page: {
    position: "relative",
    minHeight: "100dvh",
    overflowX: "hidden",
  },

  // Background image layer (separate from content so we can darken it)
  background: {
  position: "fixed",          // <-- fixed is more stable on iOS than absolute here
  inset: 0,
  filter: "brightness(0.55)",
  pointerEvents: "none",      // <-- IMPORTANT: background can't “steal” touches
  transform: "none",          // <-- IMPORTANT: remove transforms (iOS scroll bug)
},


  // Main content container
  content: {
    position: "relative",
    zIndex: 1,
    padding: "clamp(14px, 4vw, 28px)",
    paddingBottom: "90px",
    maxWidth: "1100px",
    width: "min(1100px, 100%)",
    margin: "0 auto",
  },

  // Hero section
  hero: {
    padding: "clamp(18px, 5vw, 28px)",
    borderRadius: "14px",
    background: "rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.12)",
    marginBottom: "22px",
    backdropFilter: "none",

  },
  title: {
    color: "white",
    margin: 0,
    fontSize: "clamp(28px, 6vw, 44px)",
    fontWeight: 800,
    lineHeight: 1.1,
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
    marginTop: "10px",
    fontSize: "clamp(14px, 2.6vw, 18px)",
    lineHeight: 1.4,
  },

  // Buttons
  heroButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
    flexWrap: "wrap",
  },
  button: {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: "10px",
    fontWeight: 700,
    textDecoration: "none",
  },
  primary: { background: "white", color: "black" },
  secondary: {
    background: "rgba(255,255,255,0.16)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.25)",
  },

  notice: { marginTop: "14px", color: "rgba(255,255,255,0.9)" },
  inlineLink: { color: "white", textDecoration: "underline" },

  // General sections
  section: {
    marginTop: "18px",
    padding: "18px",
    borderRadius: "14px",
    background: "rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "none",
  },
  sectionTitle: { color: "white", marginTop: 0, marginBottom: "12px" },

  // Layout grids
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "14px",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
  },

  // Portal cards
  card: {
    borderRadius: "12px",
    padding: "14px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
  },
  cardTitle: { color: "white", marginTop: 0 },
  list: { color: "rgba(255,255,255,0.92)", margin: "10px 0 0 18px" },
  cardButtons: { display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" },
  smallText: { color: "rgba(255,255,255,0.8)", marginTop: "10px", fontSize: "12px" },

  // Steps
  stepCard: {
    borderRadius: "12px",
    padding: "14px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
  },
  stepNum: {
    width: "32px",
    height: "32px",
    borderRadius: "10px",
    display: "grid",
    placeItems: "center",
    background: "white",
    color: "black",
    fontWeight: 900,
    marginBottom: "10px",
  },
  stepTitle: { color: "white", margin: "0 0 6px 0" },
  stepText: { color: "rgba(255,255,255,0.9)", margin: 0 },

  // Manufacturer cards wrapper
  manuWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "14px",
  },
  manuCard: {
    borderRadius: "12px",
    padding: "10px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
  },

  glass: {
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)", // Safari support
  },


  // Footer
  footer: { marginTop: "18px", color: "rgba(255,255,255,0.85)" },
};
