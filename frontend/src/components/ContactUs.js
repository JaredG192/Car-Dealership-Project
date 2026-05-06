import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ContactUs.css";
import { addRequest } from "../services/serviceRequests";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "General Question",
    message: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setForm({
      ...form,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      name: form.name,
      email: form.email,
      message: `
Phone: ${form.phone}
Topic: ${form.topic}

${form.message}
      `,
      type: "question"
    };

    addRequest(requestData);

    console.log("Saved:", requestData);
    alert("Message sent!");

    setForm({
      name: "",
      email: "",
      phone: "",
      topic: "General Question",
      message: ""
    });
  };

  return (
    <section className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <Link to="/" className="contact-back-btn">
            ← Home
          </Link>
          <h1>Contact Us</h1>
          <div className="contact-underline"></div>
          <p>
            Have a question about a vehicle, financing, or scheduling a visit?
            Reach out and our team will get back to you.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-card contact-info-card">
            <h2>Get in Touch</h2>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="contact-label">Phone</span>
                <span>(909) 555-0123</span>
              </div>
              <div className="contact-info-item">
                <span className="contact-label">Email</span>
                <span>sales@campuscars.com</span>
              </div>
              <div className="contact-info-item">
                <span className="contact-label">Address</span>
                <span>
                  5500 University Pkwy
                  <br />
                  San Bernardino, CA 92407
                </span>
              </div>
              <div className="contact-info-item">
                <span className="contact-label">Hours</span>
                <span>
                  Mon - Thurs: 9:00 AM - 6:00 PM<br />
                  Fri: 9:00 AM - 5:00 PM<br />
                  Sat: 10:00 AM - 3:00 PM<br />
                  Sun: Closed
                </span>
              </div>
            </div>
          </div>

          <div className="contact-card contact-form-card">
            <h2>Send a Message</h2>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label>Full Name</label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="contact-form-group">
                  <label>Email</label>
                  <input
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label>Phone</label>
                  <input
                    id="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="contact-form-group">
                  <label>Topic</label>
                  <select
                    id="topic"
                    value={form.topic}
                    onChange={handleChange}
                  >
                    <option>General Question</option>
                    <option>Vehicle Inquiry</option>
                    <option>Financing</option>
                    <option>Trade-In</option>
                    <option>Test Drive</option>
                  </select>
                </div>
              </div>

              <div className="contact-form-group">
                <label>Message</label>
                <textarea
                  id="message"
                  rows="6"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help"
                ></textarea>
              </div>

              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
}