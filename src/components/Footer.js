import "./footer.css";
import { Link } from "react-router-dom";

const BRAND_INDEX = [
  "Chevrolet",
  "Ford",
  "Honda",
  "Kia",
  "Mazda",
  "Nissan",
  "Subaru",
  "Toyota",
];

export default function Footer() {
  return (
    <footer style={styles.footer} aria-label="Site footer">
      <div style={styles.inner}>
        {/* Main footer grid (stacks on mobile via footer.css) */}
        <div className="footer-grid" style={styles.grid}>
          {/* Brand Index */}
          <section aria-label="Brand index">
            <div style={styles.title}>BRAND INDEX</div>
           <ul style={styles.list}>
  {BRAND_INDEX.map((brand) => (
    <li key={brand} style={styles.li}>
      <Link
        to={`/${brand.toLowerCase()}`}
        style={styles.footerLink}
      >
        {brand}
      </Link>
    </li>
  ))}
</ul>
          </section>

          {/* Location */}
          <section aria-label="Location">
            <div style={styles.title}>LOCATE US</div>
            <address style={styles.address}>
              <div style={styles.text}>5500 University Pkwy</div>
              <div style={styles.text}>San Bernardino, CA 92407</div>
              <div style={styles.text}>
                Sales:{" "}
                <a style={styles.link} href="tel:+19095550123">
                  (909) 555-0123
                </a>
              </div>
            </address>
          </section>

          {/* Hours */}
          <section aria-label="Business hours">
            <div style={styles.title}>HOURS</div>
            <div style={styles.text}>Mon–Thu: 9:00 AM – 6:00 PM</div>
            <div style={styles.text}>Fri: 9:00 AM – 5:00 PM</div>
            <div style={styles.text}>Sat: 10:00 AM – 3:00 PM</div>
            <div style={styles.text}>Sun: Closed</div>
          </section>

          {/* Contact */}
          <section aria-label="Contact information">
            <div style={styles.title}>CONTACT US</div>
            <div style={styles.text}>
              Email:{" "}
              <a style={styles.link} href="mailto:campuscars@csusb.edu">
                campuscars@csusb.edu
              </a>
            </div>
            <div style={styles.text}>
              Phone:{" "}
              <a style={styles.link} href="tel:+19095550123">
                (909) 555-0123
              </a>
            </div>
          </section>
        </div>

        {/* Footer bottom bar */}
        <div style={styles.bottom}>
          <div style={styles.muted}>
            © {new Date().getFullYear()} CampusCars. All Rights Reserved.
          </div>
          <div className="footer-powered" style={styles.powered}>
  <span>Powered by Coyote Labs</span>
  <img
    src={`${process.env.PUBLIC_URL}/logos/coyote-labs.png`}
    alt="Coyote Labs Logo"
    style={styles.poweredLogo}
  />
</div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#071423",
    color: "#e8eef6",
    marginTop: 40,
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },

  inner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "28px 18px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 24,
  },

  title: {
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: 800,
    color: "#2bb3ff",
    marginBottom: 10,
    textTransform: "uppercase",
  },

  text: {
    fontSize: 14,
    lineHeight: 1.7,
    opacity: 0.95,
  },

  /* Lists */
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  li: {
    fontSize: 14,
    lineHeight: 1.9,
    opacity: 0.95,
  },

  /* Address */
  address: {
    fontStyle: "normal",
    margin: 0,
  },

  /* Default footer links */
  link: {
    color: "#e8eef6",
    fontWeight: 700,
    textDecoration: "none",
    borderBottom: "1px solid rgba(255,255,255,0.25)",
    paddingBottom: 1,
  },

  /* Brand index links (slightly stronger underline) */
  footerLink: {
    color: "rgba(255,255,255,0.85)",
    textDecoration: "underline",
    textUnderlineOffset: "4px",
    fontWeight: 600,
    transition: "color 0.2s ease",
  },

  bottom: {
    marginTop: 22,
    paddingTop: 14,
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },

  muted: {
    fontSize: 13,
    opacity: 0.8,
  },

  powered: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    fontSize: 13,
    opacity: 0.85,
  },

  poweredLogo: {
    height: 60,
    width: "auto",
    objectFit: "contain",
  },
};
