import React from "react";

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
      <h3 style={{ color: "white" }}>{name}</h3>
      <p style={{ color: "white" }}>{description}</p>

      <a href={link}>
        <img src={image} alt={name} width={width} height={height} />
      </a>

      <hr />
    </div>
  );
}
