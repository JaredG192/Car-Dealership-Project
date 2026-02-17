/*
  Header.js

  Purpose:
  - CarFam-style header for CampusCars
  - Sticky top header with top info bar + navigation
  - React Router <Link> navigation (GitHub Pages friendly)
  - Mobile hamburger menu

  Author: Jared Gonzalez
*/

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header style={styles.header}>
      {/* Top thin bar (phone / language / location) */}
      <div style={styles.topBar}>
        <div style={styles.topLeft}>
          <span style={styles.topItem}>☎ (909) 555-1234</span>
          <span style={styles.dot}>•</span>
          <span style={styles.topItem}>Select Language ▾</span>
        </div>

        <div style={styles.topRight}>
          <span style={styles.topItem}>📍 123 Campus Ave, Your City, CA</span>
        </div>
      </div>

      {/* Main row: logo + nav */}
      <div style={styles.navRow}>
        {/* Logo */}
        <Link to="/" style={styles.logoWrap} onClick={() => setOpen(false)}>
          <span style={styles.logoCampus}>Campus</span>
          <span style={styles.logoCars}>Cars</span>
        </Link>

        {/* Desktop nav */}
        <nav style={styles.navDesktop}>
          <Link style={styles.navLink} to="/inventory">
            Inventory ▾
          </Link>
          <Link style={styles.navLink} to="/finance">
            Finance ▾
          </Link>
          <Link style={styles.navLink} to="/consultation">
            Consultation
          </Link>
          <Link style={styles.navLink} to="/about">
            About Us ▾
          </Link>
          <Link style={styles.navLink} to="/customers">
            Our Customers
          </Link>
          <Link style={styles.navLink} to="/login">
            Employee Login
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          style={styles.burger}
          aria-label="Open menu"
        >
          <div style={styles.burgerLine} />
          <div style={styles.burgerLine} />
          <div style={styles.burgerLine} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={styles.mobilePanel}>
          <Link style={styles.mobileLink} to="/inventory" onClick={() => setOpen(false)}>
            Inventory
          </Link>
          <Link style={styles.mobileLink} to="/finance" onClick={() => setOpen(false)}>
            Finance
          </Link>
          <Link
            style={styles.mobileLink}
            to="/consultation"
            onClick={() => setOpen(false)}
          >
            Consultation
          </Link>
          <Link style={styles.mobileLink} to="/about" onClick={() => setOpen(false)}>
            About Us
          </Link>
          <Link style={styles.mobileLink} to="/customers" onClick={() => setOpen(false)}>
            Our Customers
          </Link>
          <Link style={styles.mobileLink} to="/login" onClick={() => setOpen(false)}>
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
    zIndex: 999,
    background: "white",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 18px",
    fontSize: "12px",
    color: "rgba(0,0,0,0.65)",
    background: "rgba(0,0,0,0.03)",
    gap: "10px",
  },
  topLeft: { display: "flex", alignItems: "center", gap: "10px" },
  topRight: { display: "flex", alignItems: "center", gap: "10px" },
  topItem: { whiteSpace: "nowrap" },
  dot: { opacity: 0.5 },

  navRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 18px",
    gap: "16px",
  },

  // Logo like CarFam (two-tone)
  logoWrap: {
    textDecoration: "none",
    display: "flex",
    alignItems: "baseline",
    gap: "4px",
    fontWeight: 900,
    letterSpacing: "-0.5px",
  },
  logoCampus: { fontSize: "28px", color: "#0ea5e9" },
  logoCars: { fontSize: "28px", color: "#ec4899" },

  navDesktop: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
  },
  navLink: {
    textDecoration: "none",
    color: "rgba(0,0,0,0.78)",
    fontWeight: 700,
    fontSize: "14px",
    padding: "8px 6px",
  },

  burger: {
    display: "none",
    background: "transparent",
    border: "none",
    padding: "8px",
    cursor: "pointer",
  },
  burgerLine: {
    width: "24px",
    height: "2px",
    background: "rgba(0,0,0,0.7)",
    margin: "5px 0",
    borderRadius: "2px",
  },

  mobilePanel: {
    display: "none",
    padding: "10px 18px 16px 18px",
    borderTop: "1px solid rgba(0,0,0,0.08)",
    background: "white",
  },
  mobileLink: {
    display: "block",
    padding: "10px 0",
    textDecoration: "none",
    color: "rgba(0,0,0,0.8)",
    fontWeight: 800,
  },
};

