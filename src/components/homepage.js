// Homepage.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HeroSlider from "./heroSlider"; // change to "./HeroSlider" if file is HeroSlider.js

export default function Homepage() {
  const base = process.env.PUBLIC_URL;
  const [isMobile, setIsMobile] = useState(false);

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
                subtitle:
                  "Browse reliable used vehicles + get personalized buying advice.",
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
        <section style={styles.flatSection}>
          <h2 style={styles.sectionTitle}>Welcome to CampusCars</h2>

          <p style={styles.cardText}>
            Your go-to spot for affordable, reliable used cars near San Bernardino.
          </p>

          <p style={styles.introText}>
            We help students find budget-friendly vehicles with flexible financing,
            easy trade-ins, and personalized guidance every step of the way. Our goal
            is to make car buying clear and approachable, especially if it is your
            first time navigating the process.
          </p>

          <p style={styles.introText}>
            Whether it is your first car or an upgrade, we make the experience simple,
            stress-free, and built around your lifestyle. From understanding your budget
            to choosing a reliable model that fits your daily commute, classes, work
            schedule, or weekend plans, we are here to help you drive away with confidence.
          </p>

          <p style={styles.introText}>
            Visit us today to explore our inventory and experience a modern, student-friendly
            car-buying experience.
          </p>
        </section>
      </div>

      {/* FULL-WIDTH VEHICLE TYPES (edge-to-edge) */}
      <section style={styles.fullWidthSection}>
        <div style={styles.fullWidthInner}>
          <h2 style={styles.sectionTitleSmall}>Browse by Vehicle Type</h2>

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

            {[
              { title: "Sedans", img: `${base}/index/sedan.png`, to: "/inventory?type=sedan" },
              { title: "Coupes", img: `${base}/index/coupe.png`, to: "/inventory?type=coupe" },
              { title: "SUVs", img: `${base}/index/suv.png`, to: "/inventory?type=suv" },
              { title: "Trucks", img: `${base}/index/truck.png`, to: "/inventory?type=truck" },
              { title: "Hatchbacks", img: `${base}/index/hatchback.png`, to: "/inventory?type=hatchback" },
              { title: "Minivans", img: `${base}/index/minivan.png`, to: "/inventory?type=minivan" },
            ].map((t) => (
              <div key={t.title} style={styles.typeCard}>
                <h3 style={styles.cardTitle}>{t.title}</h3>

                {/* IMAGE replaces description */}
                <img src={t.img} alt={t.title} style={styles.typeImage} />

                <Link to={t.to} style={styles.cardLink}>
                  View {t.title} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-WIDTH DEALERSHIP ACTION GRID */}
      <section style={styles.fullWidthSection}>
        <div style={styles.fullWidthInner}>

          <div style={styles.actionGrid}>
            
          
              {[
                {
                  title: "Browse Inventory",
                  btn: "View Cars",
                  img: `${base}/index/browse.jpg`,
                  link: "/inventory",
                },
                {
                  title: "Book Consultation",
                  btn: "Schedule Now",
                  img: `${base}/index/book.jpg`,
                  link: "/consultation",
                },
                {
                  title: "About Us",
                  btn: "Learn More",
                  img: `${base}/index/us.jpg`,
                  link: "/about",
                },
                {
                  title: "Contact Us",
                  btn: "Get in Touch",
                  img: `${base}/index/contact.jpg`,
                  link: "/contact",
                },
              ].map((item) => (
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

      {/* BACK TO CENTERED CONTENT */}
      <div style={styles.content}>
       {/* VISIT US (Location + Hours) */}
<section style={styles.sectionCard}>
  <h2 style={styles.visitTitle}>Visit Us Today</h2>
  

  <div style={styles.visitGrid}>
    {/* LEFT: Info + Hours */}
    <div style={styles.visitLeft}>
      <div style={styles.visitCard}>
        <div style={styles.visitPin}>📍</div>
        <h3 style={styles.visitName}>CampusCars • CSUSB</h3>

        <div style={styles.visitInfo}>
          <div style={styles.visitLabel}>Address</div>
          <div style={styles.visitValue}>
            5500 University Pkwy<br />
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


        {/* FOOTER */}
        <footer style={styles.siteFooter}>
  <div style={styles.footerInner}>
    {/* BRAND INDEX */}
    <div style={styles.footerCol}>
      <div style={styles.footerHeading}>BRAND INDEX</div>
      <ul style={styles.footerList}>
        {["Nissan", "Toyota", "Honda", "Subaru", "Mazda", "Kia", "Ford", "Chevrolet"].map((make) => (
          <li key={make} style={styles.footerItem}>
            <span style={styles.footerText}>{make}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* LOCATE US */}
    <div style={styles.footerCol}>
      <div style={styles.footerHeading}>LOCATE US</div>

      <div style={styles.footerTextBlock}>
        5500 University Pkwy
        <br />
        San Bernardino, CA 92407
      </div>

      <div style={styles.footerTextBlock}>
        Sales:{" "}
        <span style={styles.footerAccent}>(909) 555-0123</span>
      </div>

     <div style={styles.footerTextBlock}>
  <strong>Hours:</strong>
</div>

<div style={styles.footerTextBlock}>
  Monday – Thursday: 9:00 AM – 6:00 PM
</div>

<div style={styles.footerTextBlock}>
  Friday: 9:00 AM – 5:00 PM
</div>

<div style={styles.footerTextBlock}>
  Saturday: 10:00 AM – 3:00 PM
</div>

<div style={styles.footerTextBlock}>
  Sunday: Closed
</div>

    </div>

    {/* CONTACT US (replaces FOLLOW US) */}
    <div style={styles.footerCol}>
      <div style={styles.footerHeading}>CONTACT US</div>

      <div style={styles.footerTextBlock}>
        Email: <span style={styles.footerAccent}>campuscars@csusb.edu</span>
      </div>

      <div style={styles.footerTextBlock}>
        Phone: <span style={styles.footerAccent}>(909) 555-0123</span>
      </div>

    </div>
  </div>

  {/* Bottom bar */}
  <div style={styles.footerBottom}>
    <div style={styles.footerBottomInner}>
      <span>© {new Date().getFullYear()} CampusCars. All Rights Reserved.</span>
      <span style={styles.footerBottomRight}>Powered by CampusCars</span>
    </div>
  </div>
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

  flatSection: {
    padding: "36px 0 40px",
    background: "transparent",
    border: "none",
    boxShadow: "none",
    textAlign: "center",
  },

  /* Big centered title (Welcome) */
  sectionTitle: {
    margin: "0 0 14px 0",
    fontSize: 32,
    fontWeight: 900,
    letterSpacing: "-0.3px",
  },

  /* Smaller section titles (other blocks) */
  sectionTitleSmall: {
    margin: "0 0 12px 0",
    fontSize: 22,
    fontWeight: 900,
  },

  introText: {
    color: "rgba(15, 23, 42, 0.78)",
    fontWeight: 500,
    lineHeight: 1.7,
    fontSize: 17,
    margin: "12px auto 0",
    maxWidth: 850,
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

  /* Vehicle types grid (kept 6 across on desktop) */
  grid2Full: {
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gap: 24,
},


  typeCard: {
  borderRadius: 16,
  padding: 18,
  background: "rgba(15, 23, 42, 0.03)",
  border: "1px solid rgba(0,0,0,0.08)",
  scrollSnapAlign: "start",   
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

  /* ACTION GRID (Get Started) */
  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 20,
  },

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

  actionTitle: {
    fontSize: 24,
    fontWeight: 900,
    margin: "0 0 10px 0",
  },

  actionBtn: {
    background: "#ffffff",
    color: "#000",
    borderRadius: 999,
    padding: "8px 20px",
    fontWeight: 800,
  },

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

  /* VISIT US (Location + Hours) */
visitTitle: {
  margin: "0 0 6px 0",
  fontSize: 30,
  fontWeight: 900,
  textAlign: "center",
},

visitSub: {
  margin: "0 auto 18px auto",
  maxWidth: 850,
  textAlign: "center",
  color: "rgba(15, 23, 42, 0.75)",
  fontWeight: 600,
  lineHeight: 1.6,
},

visitGrid: {
  display: "flex",
  gap: 18,
  alignItems: "stretch",
  flexWrap: "wrap",
},

visitLeft: {
  flex: "1 1 340px",
  minWidth: 280,
  display: "flex",
},

visitRight: {
  flex: "1 1 420px",
  minWidth: 280,
  display: "flex",
},


visitCard: {
  width: "100%",
  borderRadius: 18,
  border: "1px solid rgba(0,0,0,0.10)",
  background: "#ffffff",
  padding: 18,
},

visitPin: {
  fontSize: 22,
  marginBottom: 6,
},

visitName: {
  margin: "0 0 12px 0",
  fontSize: 18,
  fontWeight: 900,
},

visitInfo: {
  marginBottom: 12,
},

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


hoursHeader: {
  marginTop: 8,
  marginBottom: 8,
  fontWeight: 900,
  fontSize: 14,
},

hoursTable: {
  borderTop: "1px solid rgba(0,0,0,0.08)",
},

hoursRow: {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  padding: "10px 0",
  borderBottom: "1px solid rgba(0,0,0,0.08)",
  fontWeight: 700,
},

hoursDay: {
  color: "rgba(15, 23, 42, 0.85)",
},

hoursTime: {
  color: "rgba(15, 23, 42, 0.70)",
},

visitActions: {
  display: "flex",
  gap: 10,
  marginTop: 14,
  flexWrap: "wrap",
},

directionsBtn: {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: 12,
  background: "#0ea5e9",
  color: "#fff",
  textDecoration: "none",
  fontWeight: 900,
},

secondaryBtn: {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.16)",
  background: "#fff",
  color: "rgba(15, 23, 42, 0.90)",
  textDecoration: "none",
  fontWeight: 900,
},

mapWrap: {
  width: "100%",
  borderRadius: 18,
  overflow: "hidden",
  border: "1px solid rgba(0,0,0,0.10)",
  minHeight: 380,

},

mapFrame: {
  width: "100%",
  height: "100%",
  border: 0,
},

siteFooter: {
  width: "100vw",
  marginLeft: "calc(-50vw + 50%)",
  background: "#0b1220", // dark footer like the real site
  color: "rgba(255,255,255,0.78)",
  marginTop: 30,
},

footerInner: {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "34px 24px",
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 36,
},

footerCol: {
  minWidth: 0,
},

footerHeading: {
  color: "#0ea5e9", // same blue as your links / “car” color
  fontWeight: 900,
  letterSpacing: "0.6px",
  fontSize: 13,
  marginBottom: 12,
},

footerList: {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "grid",
  gap: 8,
},

footerItem: {
  margin: 0,
  padding: 0,
},

footerText: {
  color: "rgba(255,255,255,0.78)",
  fontWeight: 600,
  fontSize: 14,
},

footerTextBlock: {
  color: "rgba(255,255,255,0.78)",
  fontWeight: 600,
  fontSize: 14,
  lineHeight: 1.6,
  marginBottom: 10,
},

footerAccent: {
  color: "#0ea5e9",
  fontWeight: 800,
},

footerLink: {
  color: "#0ea5e9",
  fontWeight: 800,
  textDecoration: "none",
},

footerBottom: {
  borderTop: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.25)",
},

footerBottomInner: {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "14px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
  fontSize: 13,
  fontWeight: 700,
  color: "rgba(255,255,255,0.70)",
},

footerBottomRight: {
  color: "rgba(255,255,255,0.70)",
},


};

