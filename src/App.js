import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";

import HeaderNav from "./components/headNav";
import MainLayout from "./components/MainLayout";
import Homepage from "./components/homepage";
import Inventory from "./components/Inventory";

/**
 * App.js
 * - Uses HashRouter for GitHub Pages compatibility
 * - HeaderNav is global (always visible)
 * - MainLayout wraps pages that should include the Footer
 */

const makes = [
  { name: "Nissan", link: "/nissan" },
  { name: "Toyota", link: "/toyota" },
  { name: "Honda", link: "/honda" },
  { name: "Subaru", link: "/subaru" },
  { name: "Mazda", link: "/mazda" },
  { name: "Kia", link: "/kia" },
  { name: "Ford", link: "/ford" },
  { name: "Chevrolet", link: "/chevrolet" },
].sort((a, b) => a.name.localeCompare(b.name));

function ComingSoon({ title }) {
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h2>{title}</h2>
      <p>🚧 This page is coming soon.</p>
      <p>
        <Link to="/" style={{ color: "#0ea5e9", fontWeight: 700 }}>
          ← Back to Homepage
        </Link>
      </p>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <HeaderNav makes={makes} />

      <Routes>
        {/* PAGES WITH FOOTER */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/inventory" element={<Inventory />} />

          <Route path="/consultation" element={<ComingSoon title="Consultation" />} />
          <Route path="/about" element={<ComingSoon title="About Us" />} />
          <Route path="/contact" element={<ComingSoon title="Contact Us" />} />

          {/* Manufacturer routes */}
          <Route path="/nissan" element={<ComingSoon title="Nissan" />} />
          <Route path="/toyota" element={<ComingSoon title="Toyota" />} />
          <Route path="/honda" element={<ComingSoon title="Honda" />} />
          <Route path="/subaru" element={<ComingSoon title="Subaru" />} />
          <Route path="/mazda" element={<ComingSoon title="Mazda" />} />
          <Route path="/kia" element={<ComingSoon title="Kia" />} />
          <Route path="/ford" element={<ComingSoon title="Ford" />} />
          <Route path="/chevrolet" element={<ComingSoon title="Chevrolet" />} />

          <Route path="*" element={<ComingSoon title="Page Not Found" />} />
        </Route>

        {/* PAGES WITHOUT FOOTER (admin / internal) */}
        <Route path="/login" element={<ComingSoon title="Employee Login" />} />
        <Route path="/dashboard" element={<ComingSoon title="Dashboard" />} />
      </Routes>
    </HashRouter>
  );
}