/*
  ManufacturerCard.js

  Purpose:
  - Reusable UI component for displaying car manufacturers
  - Shows brand name, description, and logo/image
  - Acts as a clickable link to brand-specific pages or filters

  Project:
  Car Dealership Management System

  Author: Jared Gonzalez
  Role: Frontend Developer
*/

import React from "react";

/*
  ManufacturerCard Component

  Props:
  - name (string): Manufacturer name (e.g., Nissan, Toyota)
  - description (string): Short description of the brand inventory
  - image (string): Path/URL to the brand logo
  - link (string): URL to navigate when clicked

  Note:
  - Image is responsive (no fixed width/height)
  - Scales correctly on mobile devices

  This component is reusable and dynamically rendered
  on the homepage using mapped data.
*/
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

      {/* Short description of available models */}
      <p
        style={{
          color: "rgba(255,255,255,0.9)",
          fontSize: "14px",
          marginBottom: 10,
        }}
      >
        {description}
      </p>

      {/* Clickable image linking to manufacturer page */}
      <a href={link} style={{ display: "inline-block" }}>
        <img
          src={image}
          alt={name} // Accessibility: describes image content
          style={{
            width: "100%",
            maxWidth: "180px",
            height: "auto",
            objectFit: "contain",
            margin: "0 auto",
            display: "block",
          }}
        />
      </a>

      {/* Divider line between cards */}
      <hr
        style={{
          marginTop: 14,
          borderColor: "rgba(255,255,255,0.2)",
        }}
      />
    </div>
  );
}
