import "./Consultation.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addRequest } from "../services/serviceRequests";

export default function Consultation() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicleType: "",
    budget: "",
    make: "",
    message: "",
    consent: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      message: `
Phone: ${form.phone}
Vehicle: ${form.vehicleType}
Budget: ${form.budget}
Make: ${form.make}

${form.message}
      `,
      type: "consultation"
    };

    addRequest(formData);

    console.log("Saved:", formData);
    alert("Consultation submitted!");

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      vehicleType: "",
      budget: "",
      make: "",
      message: "",
      consent: false
    });
  };

  return (
    <div className="consultation-page">
      <div className="consultation-container">
        <div className="consultation-grid">
          <div className="consultation-left">
            <Link to="/" className="consultation-pill">← Home</Link>

            <h1>Find the right car for your needs</h1>
            <div className="title-accent"></div>

            <p className="consultation-text">
              Tell us what kind of vehicle you are looking for, your budget,
              and your preferences.
            </p>
          </div>

          <div className="consultation-card">
            <h2>Schedule Your Consultation</h2>

            <form className="consultation-form" onSubmit={handleSubmit}>
              
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="John"
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Vehicle Type</label>
                  <select
                    name="vehicleType"
                    value={form.vehicleType}
                    onChange={handleChange}
                  >
                    <option value="">Select a type</option>
                    <option>Sedan</option>
                    <option>Coupe</option>
                    <option>SUV</option>
                    <option>Truck</option>
                    <option>Hatchback</option>
                    <option>Minivan</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Budget Range</label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select a range</option>
                    <option>Under $10,000</option>
                    <option>$10,000 - $20,000</option>
                    <option>$20,000 - $30,000</option>
                    <option>$30,000+</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Preferred Make</label>
                <input
                  name="make"
                  value={form.make}
                  onChange={handleChange}
                  placeholder="Toyota, Honda, Nissan..."
                />
              </div>

              <div className="form-group">
                <label>What are you looking for?</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us about the kind of car you want..."
                />
              </div>

              <button type="submit" className="consultation-btn">
                Schedule Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}