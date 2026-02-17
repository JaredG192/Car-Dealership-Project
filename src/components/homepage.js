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
                image: `${base}/index/cars.jpg`,
                title: "Affordable Cars for College Students",
                subtitle: "Browse reliable used vehicles + get personalized buying advice.",
                ctas: [
                  { label: "Browse Inventory", href: "/inventory", variant: "primary" },
                  { label: "Get Consultation", href: "/consultation", variant: "secondary" },
                ],
              },
              {
                image: `${base}/index/rightcar.jpg`,
                title: "Find the Right Car Fast",
                subtitle: "Filter by budget, mileage, and your needs.",
                ctas: [{ label: "View Cars", href: "/inventory", variant: "primary" }],
              },
              {
                image: `${base}/index/guide.jpg`,
                title: "Student Friendly Guidance",
                subtitle: "We help you choose a car that fits your life and your budget.",
                ctas: [{ label: "Book Consultation", href: "/consultation", variant: "primary" }],
              },
            ]}
            height={isMobile ? "420px" : "620px"}
          />
        </div>
      </section>

      {/* CENTERED CONTENT (below hero) */}
      <div style={styles.content}>
        {/* DEALERSHIP INTRO */}
        <section style={styles.sectionCard}>
          <h2 style={styles.sectionTitle}>Welcome to CampusCars</h2>

          <p style={styles.cardText}>
            Your go-to spot for affordable, reliable used cars near San Bernardino.
          </p>

          <p style={styles.introText}>
            We help students find budget-friendly vehicles with flexible financing, easy trade-ins,
            and personalized guidance every step of the way. Our goal is to make car buying clear
            and approachable, especially if it is your first time navigating the process.
          </p>

          <p style={styles.introText}>
            Whether it is your first car or an upgrade, we make the experience simple, stress-free,
            and built around your lifestyle. From understanding your budget to choosing a reliable model
            that fits your daily commute, classes, work schedule, or weekend plans, we are here to help
            you drive away with confidence.
          </p>

          <p style={styles.introText}>
            Visit us today to explore our inventory and experience a modern, student-friendly car-buying experience.
          </p>
        </section>
      </div>

      {/* FULL-WIDTH VEHICLE TYPES (edge-to-edge) */}
      <section style={styles.fullWidthSection}>
        <div style={styles.fullWidthInner}>
          <h2 style={styles.sectionTitle}>Browse by Vehicle Type</h2>

          <div style={styles.grid2Full}>
            <div style={styles.typeCard}>
              <h3 style={styles.cardTitle}>Sedans</h3>
              <p style={styles.cardText}>
                Comfortable, fuel-efficient, and perfect for daily commuting.
              </p>
              <Link to="/inventory" style={styles.cardLink}>View Sedans →</Link>
            </div>

            <div style={styles.typeCard}>
              <h3 style={styles.cardTitle}>Coupes</h3>
              <p style={styles.cardText}>
                Sporty designs for drivers who want style and performance.
              </p>
              <Link to="/inventory" style={styles.cardLink}>View Coupes →</Link>
            </div>

            <div style={styles.typeCard}>
              <h3 style={styles.cardTitle}>SUVs</h3>
              <p style={styles.cardText}>
                Spacious and reliable for road trips, friends, and campus life.
              </p>
              <Link to="/inventory" style={styles.cardLink}>View SUVs →</Link>
            </div>

            <div style={styles.typeCard}>
              <h3 style={styles.cardTitle}>Trucks</h3>
              <p style={styles.cardText}>
                Powerful vehicles for work, hauling, and heavy-duty needs.
              </p>
              <Link to="/inventory" style={styles.cardLink}>View Trucks →</Link>
            </div>

            <div style={styles.typeCard}>
              <h3 style={styles.cardTitle}>Hatchbacks</h3>
              <p style={styles.cardText}>
                Compact, affordable, and easy to park on campus.
              </p>
              <Link to="/inventory" style={styles.cardLink}>View Hatchbacks →</Link>
            </div>

            <div style={styles.typeCard}>
              <h3 style={styles.cardTitle}>Minivans</h3>
              <p style={styles.cardText}>
                Extra space for families, group trips, and moving days.
              </p>
              <Link to="/inventory" style={styles.cardLink}>View Minivans →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* BACK TO CENTERED CONTENT */}
      <div style={styles.content}>
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

          <div style={styles.dropdownRow}>
            <label style={styles.dropdownLabel} htmlFor="makeSelect">Shop by:</label>

            <select
              id="makeSelect"
              value={selectedMake}
              onChange={handleMakeChange}
              style={styles.select}
            >
              <option value="">Select a brand</option>
              {manufacturers.map((m) => (
                <option key={m.name} value={m.link}>{m.name}</option>
              ))}
            </select>
          </div>

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

  /* Full-width hero banner */
  heroBanner: {
    width: "100%",
    marginTop: 0,
  },

  heroSliderFullWidth: {
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    borderRadius: 0,
  },

  /* Centered content wrapper */
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

  introText: {
    color: "rgba(15, 23, 42, 0.80)",
    fontWeight: 500,
    lineHeight: 1.6,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 0,
  },

  /* FULL-WIDTH SECTION */
  fullWidthSection: {
    width: "100vw",
    marginLeft: "calc(-50vw + 50%)",
    background: "#ffffff",
    padding: "36px 0",
    borderTop: "1px solid rgba(0,0,0,0.06)",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
  },

  fullWidthInner: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 24px",
  },

  grid2Full: {
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)", // 6 per row on desktop
  gap: 24,

  /* Responsive fallback */
  "@media (max-width: 1200px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },

  "@media (max-width: 700px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  "@media (max-width: 480px)": {
    gridTemplateColumns: "1fr",
  },
},


  typeCard: {
    borderRadius: 16,
    padding: 18,
    background: "rgba(15, 23, 42, 0.03)",
    border: "1px solid rgba(0,0,0,0.08)",
  },

  cardTitle: {
    marginTop: 0,
    marginBottom: 8,
    fontWeight: 900,
    fontSize: 18,
  },

  cardText: {
    color: "rgba(15, 23, 42, 0.75)",
    fontWeight: 600,
    margin: "8px 0 12px 0",
    lineHeight: 1.5,
  },

  cardLink: {
    color: "#0ea5e9",
    fontWeight: 900,
    textDecoration: "none",
  },

  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 14,
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
