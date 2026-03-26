/*
  ManufacturerCard.js

  Purpose:
  - Reusable UI component for displaying car manufacturers
  - Shows brand name, description, and logo/image
  - Uses React Router <Link> for navigation (no page reload)

  Author: Jared Gonzalez
*/

import React from "react";
import { Link } from "react-router-dom";

/**
 * Props:
 * - name (string)        → Manufacturer name
 * - description (string) → Short brand description
 * - image (string)       → Logo/image URL
 * - link (string)        → Route path
 * - showDivider (bool)   → Optional divider under card
 */
export default function ManufacturerCard({
  name = "",
  description = "",
  image = "",
  link = "/",
  showDivider = true,
}) {
  return (
    <div style={styles.card}>
      {/* Manufacturer name */}
      <h3 style={styles.title}>{name}</h3>

      {/* Description */}
      {description && <p style={styles.description}>{description}</p>}

      {/* Clickable image */}
      <Link
        to={link}
        style={styles.imageLink}
        aria-label={`View ${name} inventory`}
      >
        <img
          src={image}
          alt={name}
          style={styles.image}
        />
      </Link>

      {/* Optional Divider */}
      {showDivider && <hr style={styles.divider} />}
    </div>
  );
}

const styles = {
  card: {
    marginBottom: 20,
    textAlign: "center",
    transition: "transform 200ms ease",
  },

  title: {
    color: "white",
    marginBottom: 6,
    fontWeight: 900,
  },

  description: {
    color: "rgba(255,255,255,0.9)",
    fontSize: "14px",
    marginBottom: 10,
  },

  imageLink: {
    display: "inline-block",
  },

  image: {
    width: "100%",
    maxWidth: "180px",
    height: "auto",
    objectFit: "contain",
    margin: "0 auto",
    display: "block",
    transition: "transform 200ms ease",
  },

  divider: {
    marginTop: 14,
    borderColor: "rgba(255,255,255,0.2)",
  },
};
