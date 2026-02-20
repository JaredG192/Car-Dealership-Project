import "./footer.css";
export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <div className="footer-grid" style={styles.grid}>
          <div>
            <div style={styles.title}>BRAND INDEX</div>
            <ul style={styles.list}>
              {["Chevrolet", "Ford", "Honda", "Kia", "Mazda", "Nissan", "Subaru", "Toyota"].map((b) => (
                <li key={b} style={styles.li}>{b}</li>
              ))}
            </ul>
          </div>

          <div>
            <div style={styles.title}>LOCATE US</div>
            <div style={styles.text}>5500 University Pkwy</div>
            <div style={styles.text}>San Bernardino, CA 92407</div>
            <div style={styles.text}>Sales: <b>(909) 555-0123</b></div>
          </div>

          <div>
            <div style={styles.title}>HOURS</div>
            <div style={styles.text}>Mon–Thu: 9:00 AM – 6:00 PM</div>
            <div style={styles.text}>Fri: 9:00 AM – 5:00 PM</div>
            <div style={styles.text}>Sat: 10:00 AM – 3:00 PM</div>
            <div style={styles.text}>Sun: Closed</div>
          </div>

          <div>
            <div style={styles.title}>CONTACT US</div>
            <div style={styles.text}>Email: <b>campuscars@csusb.edu</b></div>
            <div style={styles.text}>Phone: <b>(909) 555-0123</b></div>
          </div>
        </div>

        <div style={styles.bottom}>
          <div style={styles.muted}>© {new Date().getFullYear()} CampusCars. All Rights Reserved.</div>
          <div style={styles.muted}>Powered by CampusCars</div>
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
  text: { fontSize: 14, lineHeight: 1.7, opacity: 0.95 },
  list: { listStyle: "none", padding: 0, margin: 0 },
  li: { fontSize: 14, lineHeight: 1.9, opacity: 0.95 },

  bottom: {
    marginTop: 22,
    paddingTop: 14,
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  muted: { fontSize: 13, opacity: 0.8 },
};