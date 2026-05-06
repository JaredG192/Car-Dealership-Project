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

  if (
    !form.firstName.trim() ||
    !form.lastName.trim() ||
    !form.email.trim() ||
    !form.phone.trim() ||
    !form.vehicleType.trim() ||
    !form.budget.trim() ||
    !form.make.trim() ||
    !form.message.trim()
  ) {
    alert("Please fill out all fields.");
    return;
  }

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
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    required
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
                    required
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
                 <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  required
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
                <input
                  name="make"
                  value={form.make}
                  onChange={handleChange}
                  placeholder="Toyota, Honda, Nissan..."
                  required
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
                  required
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