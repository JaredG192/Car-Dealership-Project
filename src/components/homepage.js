import React from "react";
import ManufacturerCard from "./ManufacturerCard"; // make sure this file exists

export default function Homepage() {
  const manufacturers = [
    {
      name: "Nissan",
      description: "Browse Nissan models in our inventory.",
      image: "/index/Nissan.png",
      link: "/nissan", // later you can create this route/page
      width: 200,
      height: 200,
    },
    {
      name: "Porsche",
      description: "Browse Porsche models in our inventory.",
      image: "/index/Porsche.png",
      link: "/porsche",
      width: 230,
      height: 230,
    },
    {
      name: "Toyota",
      description: "Browse Toyota models in our inventory.",
      image: "/index/Toyota.png",
      link: "/toyota",
      width: 200,
      height: 200,
    },
  ];

  return (
    <div style={styles.page}>
      {/* Background */}
      <div style={styles.background} />

      {/* Content */}
      <div style={styles.content}>
        {/* HERO */}
        <section style={styles.hero}>
          <h1 style={styles.title}>Car Dealership</h1>
          <p style={styles.subtitle}>
            Student-friendly used cars + personalized purchase consultation.
          </p>

          <div style={styles.heroButtons}>
            <a href="/inventory" style={{ ...styles.button, ...styles.primary }}>
              Browse Inventory
            </a>
            <a href="/consultation" style={{ ...styles.button, ...styles.secondary }}>
              Get Consultation
            </a>
          </div>

          <div style={styles.notice}>
            <strong>For Employees:</strong>{" "}
            <a href="/login" style={styles.inlineLink}>
              Login
            </a>{" "}
            to manage vehicles, consultations, and reports.
          </div>
        </section>

        {/* PORTALS */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Portals</h2>

          <div style={styles.grid2}>
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
                <a
                  href="/consultation"
                  style={{ ...styles.button, ...styles.secondary }}
                >
                  Book Consultation
                </a>
              </div>
            </div>

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

        {/* HOW IT WORKS */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>How it works</h2>
          <div style={styles.grid3}>
            <div style={styles.stepCard}>
              <div style={styles.stepNum}>1</div>
              <h4 style={styles.stepTitle}>Browse</h4>
              <p style={styles.stepText}>Explore used vehicles and compare options.</p>
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

        {/* MANUFACTURERS */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Browse by manufacturer</h2>
          <div style={styles.manuWrap}>
            {manufacturers.map((m) => (
              <div key={m.name} style={styles.manuCard}>
                <ManufacturerCard
                  name={m.name}
                  description={m.description}
                  image={m.image}
                  link={m.link}
                  width={m.width}
                  height={m.height}
                />
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
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

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  background: {
    position: "absolute",
    inset: 0,
    backgroundImage: "url('/index/cars.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(0.55)",
    transform: "scale(1.02)",
  },
  content: {
    position: "relative",
    zIndex: 1,
    padding: "28px",
    maxWidth: "1100px",
  },

  hero: {
    padding: "22px 18px",
    borderRadius: "14px",
    background: "rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.12)",
    marginBottom: "22px",
    backdropFilter: "blur(4px)",
  },
  title: { color: "white", margin: 0, fontSize: "44px", fontWeight: 800 },
  subtitle: { color: "rgba(255,255,255,0.9)", marginTop: "10px", fontSize: "18px" },

  heroButtons: { display: "flex", gap: "12px", marginTop: "16px", flexWrap: "wrap" },
  button: {
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: "10px",
    fontWeight: 700,
    textDecoration: "none",
  },
  primary: { background: "white", color: "black" },
  secondary: { background: "rgba(255,255,255,0.16)", color: "white", border: "1px solid rgba(255,255,255,0.25)" },

  notice: { marginTop: "14px", color: "rgba(255,255,255,0.9)" },
  inlineLink: { color: "white", textDecoration: "underline" },

  section: {
    marginTop: "18px",
    padding: "18px",
    borderRadius: "14px",
    background: "rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(4px)",
  },
  sectionTitle: { color: "white", marginTop: 0, marginBottom: "12px" },

  grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" },
  grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" },

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

  manuWrap: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" },
  manuCard: {
    borderRadius: "12px",
    padding: "10px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
  },

  footer: { marginTop: "18px", color: "rgba(255,255,255,0.85)" },
};
