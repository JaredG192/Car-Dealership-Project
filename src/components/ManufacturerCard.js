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

export default function ManufacturerCard({
  name,
  description,
  image,
  link,
}) {
  return (
    <div
      style={{
        marginBottom: 20,
        textAlign: "center",
      }}
    >
      {/* Manufacturer name */}
      <h3 style={{ color: "white", marginBottom: 6 }}>{name}</h3>

      {/* Short description */}
      <p
        style={{
          color: "rgba(255,255,255,0.9)",
          fontSize: "14px",
          marginBottom: 10,
        }}
      >
        {description}
      </p>

      {/* Clickable image (React Router navigation) */}
      <Link to={link} style={{ display: "inline-block" }}>
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            maxWidth: "180px",
            height: "auto",
            objectFit: "contain",
            margin: "0 auto",
            display: "block",
          }}
        />
      </Link>

      {/* Divider */}
      <hr
        style={{
          marginTop: 14,
          borderColor: "rgba(255,255,255,0.2)",
        }}
      />
    </div>
  );
}
