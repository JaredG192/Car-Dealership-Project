import React, { useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./headNav.css";

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
      {/* Main nav */}
      <div style={styles.navRow}>
        {/* Logo */}
        <Link to="/" style={styles.logoWrap} onClick={() => setOpen(false)}>
          <span style={styles.logoA}>Campus</span>
          <span style={styles.logoB}>Cars</span>
        </Link>

        {/* Desktop nav */}
        <nav className="navLinksDesktop" style={styles.navLinks}>
          <NavLink to="/inventory" active={isActive("/inventory")}>
            Inventory
          </NavLink>

          <NavLink to="/consultation" active={isActive("/consultation")}>
            Consultation
          </NavLink>

          <NavLink to="/about" active={isActive("/about")}>
            About Us
          </NavLink>

          {/* Make dropdown */}
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

        {/* Mobile hamburger */}
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

      {/* Mobile dropdown */}
      {open && (
        <div className="mobilePanel" style={styles.mobilePanel}>
          <MobileLink to="/inventory" setOpen={setOpen}>
            Inventory
          </MobileLink>

          <MobileLink to="/consultation" setOpen={setOpen}>
            Consultation
          </MobileLink>

          <MobileLink to="/about" setOpen={setOpen}>
            About Us
          </MobileLink>

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

/* Helper components */

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      style={{
        ...styles.navLink,
        ...(active ? styles.active : {}),
      }}
    >
      {children}
    </Link>
  );
}

function MobileLink({ to, setOpen, children }) {
  return (
    <Link to={to} style={styles.mobileLink} onClick={() => setOpen(false)}>
      {children}
    </Link>
  );
}

/* Styles */

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(8px)",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  },

  navRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
  },

  logoWrap: {
    textDecoration: "none",
    display: "flex",
    gap: 2,
  },

  logoA: { fontWeight: 900, fontSize: 28, color: "#0ea5e9" },
  logoB: { fontWeight: 900, fontSize: 28, color: "#f43f5e" },

  navLinks: {
    display: "flex",
    gap: 16,
    alignItems: "center",
  },

  navLink: {
    textDecoration: "none",
    color: "rgba(0,0,0,0.8)",
    fontWeight: 800,
    fontSize: 14,
  },

  active: {
    textDecoration: "underline",
  },

  makeWrap: { display: "flex", gap: 8 },

  makeSelect: {
    borderRadius: 999,
    padding: "6px 10px",
    border: "1px solid rgba(0,0,0,0.15)",
  },

  navCta: {
    textDecoration: "none",
    padding: "8px 14px",
    borderRadius: 999,
    background: "#000",
    color: "white",
    fontWeight: 900,
    fontSize: 13,
  },

  mobileBtn: {
    display: "none",
    border: "1px solid rgba(0,0,0,0.15)",
    background: "white",
    borderRadius: 8,
    padding: "6px 10px",
    fontSize: 18,
    cursor: "pointer",
  },

  mobilePanel: {
    display: "none",
    padding: "12px 16px",
    background: "white",
  },

  mobileLink: {
    display: "block",
    padding: "10px 0",
    fontWeight: 900,
    textDecoration: "none",
    color: "#000",
  },

  mobileMakeRow: {
    display: "flex",
    gap: 8,
    padding: "10px 0",
    alignItems: "center",
  },

  mobileLabel: { fontWeight: 900 },

  mobileSelect: {
    flex: 1,
    padding: "8px",
    borderRadius: 8,
  },

  mobileCta: {
    display: "block",
    marginTop: 10,
    textAlign: "center",
    padding: "10px",
    background: "#000",
    color: "white",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 900,
  },
};
