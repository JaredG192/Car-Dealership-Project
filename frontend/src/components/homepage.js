import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HeroSlider from "./heroSlider"; // change to "./HeroSlider" if your filename is HeroSlider.js

/**
 * Homepage
 * Landing page for CampusCars.
 *
 * NOTE: Footer is intentionally NOT rendered here.
 * The footer is shown only on Inventory + selected pages via MainLayout.
 */
export default function Homepage() {
  const base = process.env.PUBLIC_URL;
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile layout (supports older Safari too)
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

  // Hero slides
  const slides = useMemo(
    () => [
      {
        image: `${base}/index/cars.jpg`,
        showText: false,
        noOverlay: true,
        // Slightly offset on mobile so your image-only hero shows more of the right side.
        bgPosition: isMobile ? "10% center" : "center 35%",
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
        subtitle:
          "We help you choose a car that fits your life and your budget.",
        ctas: [
          { label: "Book Consultation", href: "/consultation", variant: "primary" },
        ],
      },
    ],
    [base, isMobile]
  );

  // Vehicle types shown below the hero
  const vehicleTypes = useMemo(
    () => [
      { title: "Sedans", img: `${base}/index/sedan.png`, to: "/inventory?type=sedan" },
      { title: "Coupes", img: `${base}/index/coupe.png`, to: "/inventory?type=coupe" },
      { title: "SUVs", img: `${base}/index/suv.png`, to: "/inventory?type=suv" },
      { title: "Trucks", img: `${base}/index/truck.png`, to: "/inventory?type=truck" },
      {
        title: "Hatchbacks",
        img: `${base}/index/hatchback.png`,
        to: "/inventory?type=hatchback",
      },
      { title: "Minivans", img: `${base}/index/minivan.png`, to: "/inventory?type=minivan" },
    ],
    [base]
  );

  // Action cards (quick links)
  const actions = useMemo(
    () => [
      { title: "Browse Inventory", btn: "View Cars", img: `${base}/index/browse.jpg`, link: "/inventory" },
      { title: "Book Consultation", btn: "Schedule Now", img: `${base}/index/book.jpg`, link: "/consultation" },
      { title: "About Us", btn: "Learn More", img: `${base}/index/us.jpg`, link: "/about" },
      { title: "Contact Us", btn: "Get in Touch", img: `${base}/index/contact.jpg`, link: "/contact" },
    ],
    [base]
  );

  return (
    <div style={styles.page}>
      {/* FULL-WIDTH HERO SLIDER */}
      <section style={styles.heroBanner}>
        <div style={styles.heroSliderFullWidth}>
          <HeroSlider slides={slides} height={isMobile ? "420px" : "620px"} />
        </div>
      </section>

      {/* CENTERED CONTENT (below hero) */}
      <div style={styles.content}>
        <section style={styles.flatSection}>
          <h2 style={styles.welcomeTitle}>Welcome to CampusCars</h2>
          <div style={styles.accentLine} />

          <p style={styles.cardText}>
            Your go-to spot for affordable, reliable used cars near San Bernardino.
          </p>

          <p style={styles.introText}>
            We help students find budget-friendly vehicles with flexible financing, easy
            trade-ins, and personalized guidance every step of the way. Our goal is to
            make car buying clear and approachable, especially if it is your first time
            navigating the process.
          </p>

          <p style={styles.introText}>
            Whether it is your first car or an upgrade, we make the experience simple,
            stress-free, and built around your lifestyle. From understanding your budget
            to choosing a reliable model that fits your daily commute, classes, work
            schedule, or weekend plans, we are here to help you drive away with
            confidence.
          </p>

          <p style={styles.introText}>
            Visit us today to explore our inventory and experience a modern,
            student-friendly car-buying experience.
          </p>
        </section>
      </div>

      {/* FULL-WIDTH VEHICLE TYPES */}
      <section style={styles.fullWidthSection}>
        <div style={styles.fullWidthInner}>
          <h2 style={styles.sectionTitle}>Browse by Vehicle Type</h2>

          {/* Mobile: horizontal scroll | Desktop: full grid */}
          <div
            style={
              isMobile
                ? {
                    display: "grid",
                    gridAutoFlow: "column",
                    gridAutoColumns: "78%",
                    gap: 14,
                    overflowX: "auto",
                    paddingBottom: 10,
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                  }
                : styles.grid2Full
            }
          >
            {vehicleTypes.map((t) => (
              <div key={t.title} style={styles.typeCard}>
                <h3 style={styles.cardTitle}>{t.title}</h3>
                <img src={t.img} alt={t.title} style={styles.typeImage} />
                <Link to={t.to} style={styles.cardLink}>
                  View {t.title} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-WIDTH ACTION GRID */}
      <section style={styles.fullWidthSection}>
        <div style={styles.fullWidthInner}>
          <h2 style={styles.sectionTitle}>Explore CampusCars</h2>

          <div style={styles.actionGrid}>
            {actions.map((item) => (
              <Link key={item.title} to={item.link} style={styles.actionCard}>
                <img src={item.img} alt={item.title} style={styles.actionImg} />
                <div style={styles.actionOverlay}>
                  <h3 style={styles.actionTitle}>{item.title}</h3>
                  <div style={styles.actionBtn}>{item.btn}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Background image ONLY behind the Visit section */}
      <div style={styles.visitBgSection}>
        <div style={styles.content}>
          <section style={styles.sectionCard}>
            <h2 style={styles.sectionTitle}>Visit Us Today</h2>

            <div style={styles.visitGrid}>
              {/* LEFT: Info + Hours */}
              <div style={styles.visitLeft}>
                <div style={styles.visitCard}>
                  <div style={styles.visitPin}>📍</div>
                  <h3 style={styles.visitName}>CampusCars • CSUSB</h3>

                  <div style={styles.visitInfo}>
                    <div style={styles.visitLabel}>Address</div>
                    <div style={styles.visitValue}>
                      5500 University Pkwy
                      <br />
                      San Bernardino, CA 92407
                    </div>
                  </div>

                  <div style={styles.visitInfo}>
                    <div style={styles.visitLabel}>Phone</div>
                    <div style={styles.visitValue}>(909) 555-0123</div>
                  </div>

                  <div style={styles.hoursHeader}>Business Hours</div>
                  <div style={styles.hoursTable}>
                    {[
                      ["Monday", "9:00 AM – 6:00 PM"],
                      ["Tuesday", "9:00 AM – 6:00 PM"],
                      ["Wednesday", "9:00 AM – 6:00 PM"],
                      ["Thursday", "9:00 AM – 6:00 PM"],
                      ["Friday", "9:00 AM – 5:00 PM"],
                      ["Saturday", "10:00 AM – 3:00 PM"],
                      ["Sunday", "Closed"],
                    ].map(([day, time]) => (
                      <div key={day} style={styles.hoursRow}>
                        <div style={styles.hoursDay}>{day}</div>
                        <div style={styles.hoursTime}>{time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT: Map */}
              <div style={styles.visitRight}>
                <div style={{ ...styles.mapWrap, minHeight: isMobile ? 280 : 380 }}>
                  <iframe
                    title="CSUSB Map"
                    style={styles.mapFrame}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=California%20State%20University%20San%20Bernardino%205500%20University%20Pkwy%20San%20Bernardino%20CA%2092407&output=embed"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Footer intentionally omitted on Homepage */}
        </div>
      </div>
    </div>
  );
}

/* ================== STYLES ================== */

const styles = {
  page: {
    background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
    color: "#0f172a",
  },

  accentLine: {
    width: 86,
    height: 4,
    background: "linear-gradient(to right, #0ea5e9, #f43f5e)",
    borderRadius: 999,
    margin: "10px auto 16px",
  },

  heroBanner: { width: "100%", marginTop: 0 },

  heroSliderFullWidth: {
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    borderRadius: 0,
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

  flatSection: {
    padding: "36px 0 40px",
    background: "transparent",
    border: "none",
    boxShadow: "none",
    textAlign: "center",
  },

  sectionTitle: {
    margin: "0 0 14px 0",
    fontSize: 32,
    fontWeight: 900,
    letterSpacing: "-0.3px",
    textAlign: "left", 
  },

  introText: {
    color: "rgba(15, 23, 42, 0.78)",
    fontWeight: 500,
    lineHeight: 1.7,
    fontSize: 17,
    margin: "12px auto 0",
    maxWidth: 850,
  },

  fullWidthSection: {
    width: "100vw",
    marginLeft: "calc(-50vw + 50%)",
    padding: "38px 0",
    borderTop: "1px solid rgba(0,0,0,0.06)",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    background:
      "linear-gradient(135deg, rgba(14,165,233,0.06), rgba(244,63,94,0.05))",
  },

  fullWidthInner: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 24px",
  },

  grid2Full: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 24,
  },

  typeCard: {
    borderRadius: 18,
    padding: 18,
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.10)",
    boxShadow: "0 12px 26px rgba(0,0,0,0.08)",
    scrollSnapAlign: "start",
  },

  cardTitle: { marginTop: 0, marginBottom: 8, fontWeight: 900, fontSize: 18 },

  cardText: {
    color: "rgba(15, 23, 42, 0.75)",
    fontWeight: 600,
    margin: "8px 0 12px 0",
    lineHeight: 1.5,
    textAlign: "center",
  },

  cardLink: { color: "#0ea5e9", fontWeight: 900, textDecoration: "none" },

  typeImage: {
    width: "100%",
    height: 95,
    objectFit: "contain",
    padding: 10,
    borderRadius: 12,
    margin: "8px 0 12px 0",
    border: "1px solid rgba(0,0,0,0.08)",
    background: "#fff",
  },

  actionGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 },

  actionCard: {
    position: "relative",
    display: "block",
    borderRadius: 18,
    overflow: "hidden",
    height: 230,
    textDecoration: "none",
    border: "1px solid rgba(0,0,0,0.10)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  },

  actionImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  actionOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    textAlign: "center",
    padding: 20,
  },

  actionTitle: { fontSize: 24, fontWeight: 900, margin: "0 0 10px 0" },

  actionBtn: {
    background: "#0ea5e9",
    color: "#fff",
    borderRadius: 999,
    padding: "9px 20px",
    fontWeight: 900,
    boxShadow: "0 10px 20px rgba(14,165,233,0.25)",
  },

  // Background image ONLY behind the Visit section area
  visitBgSection: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${process.env.PUBLIC_URL}/index/csusb.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "60px 0",
  },

  visitGrid: {
    display: "flex",
    gap: 18,
    alignItems: "stretch",
    flexWrap: "wrap",
  },

  visitLeft: { flex: "1 1 340px", minWidth: 280, display: "flex" },
  visitRight: { flex: "1 1 420px", minWidth: 280, display: "flex" },

  visitCard: {
    width: "100%",
    borderRadius: 18,
    border: "1px solid rgba(0,0,0,0.10)",
    background: "#ffffff",
    padding: 18,
  },

  visitPin: { fontSize: 22, marginBottom: 6 },
  visitName: { margin: "0 0 12px 0", fontSize: 18, fontWeight: 900 },

  visitInfo: { marginBottom: 12 },

  visitLabel: {
    fontSize: 12,
    fontWeight: 900,
    color: "rgba(15, 23, 42, 0.60)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: 4,
  },

  visitValue: {
    fontWeight: 700,
    color: "rgba(15, 23, 42, 0.85)",
    lineHeight: 1.4,
    overflowWrap: "anywhere",
    wordBreak: "break-word",
  },

  hoursHeader: { marginTop: 8, marginBottom: 8, fontWeight: 900, fontSize: 14 },
  hoursTable: { borderTop: "1px solid rgba(0,0,0,0.08)" },

  hoursRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: "10px 0",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    fontWeight: 700,
  },

  hoursDay: { color: "rgba(15, 23, 42, 0.85)" },
  hoursTime: { color: "rgba(15, 23, 42, 0.70)" },

  mapWrap: {
    width: "100%",
    borderRadius: 18,
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.10)",
    minHeight: 380,
    background: "#fff",
  },

  mapFrame: { width: "100%", height: "100%", border: 0 },

  welcomeTitle: {
  fontSize: "32px",
  fontWeight: "800",
  marginBottom: "12px",
  textAlign: "center",
},
};