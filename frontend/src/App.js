import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import HeaderNav from "./components/headNav";
import MainLayout from "./components/MainLayout";
import Homepage from "./components/homepage";
import Inventory from "./components/Inventory";
import CarDetails from "./components/CarDetails";
import EmployeeLogin from "./components/EmployeeLogin";
import ContactUs from "./components/ContactUs";
import Consultation from "./components/Consultation";
import AboutUs from "./components/AboutUs";
import EmployeeDashboard from "./components/EmployeeDashboard";

/**
 * App.js
 * - Uses HashRouter for GitHub Pages compatibility
 * - HeaderNav is global (always visible)
 * - MainLayout wraps pages that should include the Footer
 */

// Header "Shop by Make" links
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

// Placeholder page
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
      <ScrollToTop />
      <HeaderNav makes={makes} />

      <Routes>
        {/* PAGES WITH FOOTER */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Manufacturer routes */}
          <Route
            path="/nissan"
            element={<Inventory defaultMake="Nissan" hideMakeFilter />}
          />
          <Route
            path="/toyota"
            element={<Inventory defaultMake="Toyota" hideMakeFilter />}
          />
          <Route
            path="/honda"
            element={<Inventory defaultMake="Honda" hideMakeFilter />}
          />
          <Route
            path="/subaru"
            element={<Inventory defaultMake="Subaru" hideMakeFilter />}
          />
          <Route
            path="/mazda"
            element={<Inventory defaultMake="Mazda" hideMakeFilter />}
          />
          <Route
            path="/kia"
            element={<Inventory defaultMake="Kia" hideMakeFilter />}
          />
          <Route
            path="/ford"
            element={<Inventory defaultMake="Ford" hideMakeFilter />}
          />
          <Route
            path="/chevrolet"
            element={<Inventory defaultMake="Chevrolet" hideMakeFilter />}
          />

          <Route path="*" element={<ComingSoon title="Page Not Found" />} />
        </Route>

        {/* PAGES WITHOUT FOOTER (internal / employee) */}
        <Route path="/login" element={<EmployeeLogin />} />

        {/*Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            JSON.parse(localStorage.getItem("user"))
              ? <EmployeeDashboard />
              : <ComingSoon title="Unauthorized" />
          }
        />
      </Routes>
    </HashRouter>
  );
}