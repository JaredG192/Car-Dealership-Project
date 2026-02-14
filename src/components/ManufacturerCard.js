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
  - width (number): Image width (default: 200)
  - height (number): Image height (default: 200)

  This component is reusable and dynamically rendered
  on the homepage using mapped data.
*/
export default function ManufacturerCard({
  name,
  description,
  image,
  link,
  width = 200,
  height = 200,
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      {/* Manufacturer name */}
      <h3 style={{ color: "white" }}>{name}</h3>

      {/* Short description of available models */}
      <p style={{ color: "white" }}>{description}</p>

      {/* Clickable image linking to manufacturer page */}
      <a href={link}>
        <img
          src={image}
          alt={name} // Accessibility: describes image content
          width={width}
          height={height}
        />
      </a>

      {/* Divider line between cards */}
      <hr />
    </div>
  );
}
