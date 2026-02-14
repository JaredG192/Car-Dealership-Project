/*
  Header.js

  Purpose:
  - Displays the main title/banner for the Car Dealership system
  - Appears at the top of the homepage and other pages
  - Provides consistent branding across the application

  Project:
  Car Dealership Management System

  Author: Jared Gonzalez
  Role: Frontend Developer
*/

import React from "react";

// Header component
// Renders the main title of the website
function Header() {
  return (
    <header>
      {/* Main website title */}
      <h1 style={{ color: "white" }}>Car Dealership</h1>
    </header>
  );
}

export default Header;
