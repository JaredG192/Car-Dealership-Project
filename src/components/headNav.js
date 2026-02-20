import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./headNav.css";

/**
 * HeaderNav
 *
 * Global top navigation used across the site.
 * - Desktop nav links + "Shop by Make" dropdown
 * - Mobile hamburger menu
 *
 * Props:
 * - makes: [{ name: "Toyota", link: "/toyota" }, ...]
 */
export default function HeaderNav({ makes = [] }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  // Clean list of make options (removes null/undefined)
  const makeOptions = useMemo(() => makes.filter(Boolean), [makes]);

  // Close the mobile menu whenever the route changes (professional UX)
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const onMakeSelect = (e) => {
    const value = e.target.value;
    if (!value) return;

    // Navigate to the selected make page
    navigate(value);

    // Reset dropdown back to default option on mobile/desktop
    e.target.value = "";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header style={styles.header}>
      <div style={styles.navRow}>
        {/* Logo */}
        <Link to="/" style={styles.logoWrap} aria-label="Go to homepage">
          <span style={styles.logoA}>Campus</span>
          <span style={styles.logoB}>Cars</span>
        </Link>

        {/* Desktop nav */}
        <nav className="navLinksDesktop" style={styles.navLinks} aria-label="Primary navigation">
          <NavLink to="/inventory" active={isActive("/inventory")}>
            Inventory
          </NavLink>

          <NavLink to="/consultation" active={isActive("/consultation")}>
            Consultation
          </NavLink>

          <NavLink to="/about" active={isActive("/about")}>
            About Us
          </NavLink>

          {/* Shop by Make */}
          <div style={styles.makeWrap}>
            <label htmlFor="makeSelectDesktop" style={styles.navLink}>
              Shop by Make
            </label>

            <select
              id="makeSelectDesktop"
              defaultValue=""
              onChange={onMakeSelect}
              style={styles.makeSelect}
              aria-label="Shop by Make"
            >
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
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="mobilePanel" style={styles.mobilePanel} aria-label="Mobile navigation">
          <MobileLink to="/inventory">Inventory</MobileLink>
          <MobileLink to="/consultation">Consultation</MobileLink>
          <MobileLink to="/about">About Us</MobileLink>

          <div style={styles.mobileMakeRow}>
            <label htmlFor="makeSelectMobile" style={styles.mobileLabel}>
              Shop by Make:
            </label>

            <select
              id="makeSelectMobile"
              defaultValue=""
              onChange={onMakeSelect}
              style={styles.mobileSelect}
              aria-label="Shop by Make (mobile)"
            >
              <option value="">Select</option>
              {makeOptions.map((m) => (
                <option key={m.name} value={m.link}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <Link to="/login" style={styles.mobileCta}>
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

function MobileLink({ to, children }) {
  return (
    <Link to={to} style={styles.mobileLink}>
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
  active: { textDecoration: "underline" },

  makeWrap: { display: "flex", gap: 8, alignItems: "center" },
  makeSelect: {
    borderRadius: 999,
    padding: "6px 10px",
    border: "1px solid rgba(0,0,0,0.15)",
    background: "#fff",
    fontWeight: 800,
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
    border: "1px solid rgba(0,0,0,0.15)",
    background: "#fff",
    fontWeight: 800,
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