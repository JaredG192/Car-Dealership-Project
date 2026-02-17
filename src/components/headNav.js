import React, { useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function HeaderNav({ makes = [] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const makeOptions = useMemo(() => makes.filter(Boolean), [makes]);

  const onMakeSelect = (e) => {
    const value = e.target.value;
    if (!value) return;
    setOpen(false);
    navigate(value);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header style={styles.header}>
      {/* Top bar */}
      <div style={styles.topBar}>
        <div style={styles.topLeft}>
          <span style={styles.topItem}>📞 (909) 543-1450</span>
          <span style={styles.dot}>•</span>
          <button type="button" style={styles.langBtn}>
            🌐 Select Language ▾
          </button>
        </div>

        <div style={styles.topRight}>
          <span style={styles.topItem}>📍 1731 South Cactus Ave, Rialto, CA 92316</span>
        </div>
      </div>

      {/* Main nav row */}
      <div style={styles.navRow}>
        {/* Logo */}
        <Link to="/" style={styles.logoWrap} onClick={() => setOpen(false)}>
          <span style={styles.logoA}>Campus</span>
          <span style={styles.logoB}>Cars</span>
        </Link>

        {/* Desktop nav */}
        <nav className="navLinksDesktop" style={styles.navLinks}>
          <Link to="/inventory" style={{ ...styles.navLink, ...(isActive("/inventory") ? styles.active : {}) }}>
            Inventory
          </Link>

          <Link to="/finance" style={{ ...styles.navLink, ...(isActive("/finance") ? styles.active : {}) }}>
            Finance
          </Link>

          <Link
            to="/consultation"
            style={{ ...styles.navLink, ...(isActive("/consultation") ? styles.active : {}) }}
          >
            Consultation
          </Link>

          <Link to="/about" style={{ ...styles.navLink, ...(isActive("/about") ? styles.active : {}) }}>
            About Us
          </Link>

          <Link
            to="/customers"
            style={{ ...styles.navLink, ...(isActive("/customers") ? styles.active : {}) }}
          >
            Our Customers
          </Link>

          {/* Shop by Make dropdown */}
          <div style={styles.makeWrap}>
            <span style={styles.navLink}>Shop by Make</span>
            <select defaultValue="" onChange={onMakeSelect} style={styles.makeSelect}>
              <option value="">Select</option>
              {makeOptions.map((m) => (
                <option key={m.name} value={m.link}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <Link to="/login" style={styles.navCta}>
            Employee Login
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="mobileBtn"
          type="button"
          onClick={() => setOpen((v) => !v)}
          style={styles.mobileBtn}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="mobilePanel" style={styles.mobilePanel}>
          <Link to="/inventory" style={styles.mobileLink} onClick={() => setOpen(false)}>
            Inventory
          </Link>
          <Link to="/finance" style={styles.mobileLink} onClick={() => setOpen(false)}>
            Finance
          </Link>
          <Link to="/consultation" style={styles.mobileLink} onClick={() => setOpen(false)}>
            Consultation
          </Link>
          <Link to="/about" style={styles.mobileLink} onClick={() => setOpen(false)}>
            About Us
          </Link>
          <Link to="/customers" style={styles.mobileLink} onClick={() => setOpen(false)}>
            Our Customers
          </Link>

          <div style={styles.mobileMakeRow}>
            <span style={styles.mobileLabel}>Shop by Make:</span>
            <select defaultValue="" onChange={onMakeSelect} style={styles.mobileSelect}>
              <option value="">Select</option>
              {makeOptions.map((m) => (
                <option key={m.name} value={m.link}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <Link to="/login" style={styles.mobileCta} onClick={() => setOpen(false)}>
            Employee Login
          </Link>
        </div>
      )}
    </header>
  );
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: "8px 16px",
    fontSize: 12,
    color: "rgba(0,0,0,0.72)",
    background: "rgba(0,0,0,0.03)",
  },
  topLeft: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" },
  topRight: { display: "flex", alignItems: "center" },
  topItem: { whiteSpace: "nowrap" },
  dot: { opacity: 0.5 },
  langBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "rgba(0,0,0,0.72)",
    padding: 0,
    fontSize: 12,
  },

  navRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    padding: "12px 16px",
  },

  logoWrap: { textDecoration: "none", display: "flex", alignItems: "baseline", gap: 2 },
  logoA: { fontWeight: 900, fontSize: 28, color: "#0ea5e9", letterSpacing: -0.5 },
  logoB: { fontWeight: 900, fontSize: 28, color: "#f43f5e", letterSpacing: -0.5 },

  navLinks: { display: "flex", alignItems: "center", gap: 16 },

  navLink: {
    textDecoration: "none",
    color: "rgba(0,0,0,0.78)",
    fontWeight: 800,
    fontSize: 14,
  },

  active: {
    textDecoration: "underline",
    textUnderlineOffset: 6,
  },

  makeWrap: { display: "flex", alignItems: "center", gap: 8 },
  makeSelect: {
    borderRadius: 999,
    padding: "8px 10px",
    border: "1px solid rgba(0,0,0,0.15)",
    background: "white",
    fontWeight: 800,
    fontSize: 13,
    cursor: "pointer",
  },

  navCta: {
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: 999,
    background: "rgba(0,0,0,0.86)",
    color: "white",
    fontWeight: 900,
    fontSize: 13,
    whiteSpace: "nowrap",
  },

  mobileBtn: {
    display: "none",
    border: "1px solid rgba(0,0,0,0.15)",
    background: "white",
    borderRadius: 10,
    padding: "8px 10px",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 900,
  },

  mobilePanel: {
    display: "none",
    padding: "12px 16px 16px 16px",
    borderTop: "1px solid rgba(0,0,0,0.08)",
    background: "rgba(255,255,255,0.98)",
  },

  mobileLink: {
    display: "block",
    padding: "10px 0",
    textDecoration: "none",
    color: "rgba(0,0,0,0.78)",
    fontWeight: 900,
  },

  mobileMakeRow: { display: "flex", gap: 10, alignItems: "center", padding: "10px 0" },
  mobileLabel: { fontWeight: 900, color: "rgba(0,0,0,0.72)" },
  mobileSelect: {
    flex: 1,
    borderRadius: 12,
    padding: "10px 12px",
    border: "1px solid rgba(0,0,0,0.15)",
    background: "white",
    fontWeight: 800,
  },

  mobileCta: {
    display: "inline-block",
    marginTop: 8,
    textDecoration: "none",
    padding: "12px 14px",
    borderRadius: 12,
    background: "rgba(0,0,0,0.86)",
    color: "white",
    fontWeight: 900,
  },
};
