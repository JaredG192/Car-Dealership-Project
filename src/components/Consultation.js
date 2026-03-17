import "./Consultation.css";
import { Link } from "react-router-dom";
import "./Consultation.css";
export default function Consultation() {
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
              and your preferences. Our team will help match you with options
              that fit your lifestyle.
            </p>

            <div className="consultation-info-grid">
              <div className="consultation-info-card">
                <h3>Call Us</h3>
                <p>(909) 555-0123</p>
              </div>

              <div className="consultation-info-card">
                <h3>Email</h3>
                <p>contact@campuscars.com</p>
              </div>
            </div>

            <div className="consultation-why-card">
              <h3>Why book with CampusCars?</h3>
              <ul>
                <li>Student-friendly vehicle options</li>
                <li>Help finding cars within your budget</li>
                <li>Guidance on features, style, and practicality</li>
              </ul>
            </div>
          </div>

          <div className="consultation-card">
            <h2>Schedule Your Consultation</h2>
            <p>Fill out the form below and our team will reach out shortly.</p>

            <form className="consultation-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="John" />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Doe" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="you@example.com" />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" placeholder="(555) 123-4567" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Vehicle Type</label>
                  <select>
                    <option>Select a type</option>
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
                  <select>
                    <option>Select a range</option>
                    <option>Under $10,000</option>
                    <option>$10,000 - $20,000</option>
                    <option>$20,000 - $30,000</option>
                    <option>$30,000+</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Preferred Make</label>
                <input type="text" placeholder="Toyota, Honda, Nissan..." />
              </div>

              <div className="form-group">
                <label>What are you looking for?</label>
                <textarea
                  rows="5"
                  placeholder="Tell us about the kind of car you want, important features, mileage, or anything else..."
                ></textarea>
              </div>

              <div className="checkbox-row">
                <input type="checkbox" id="contactConsent" />
                <label htmlFor="contactConsent">
                  I agree to be contacted by CampusCars regarding my vehicle inquiry.
                </label>
              </div>

              <button type="submit" className="consultation-btn">
                Schedule Now
              </button>
            </form>
          </div>
        </div>

        <div className="consultation-bottom">
          <div className="consultation-feature-card">
            <h3>Affordable Options</h3>
            <p>
              Browse vehicles that fit student budgets without giving up quality
              and reliability.
            </p>
          </div>

          <div className="consultation-feature-card">
            <h3>Personalized Help</h3>
            <p>
              Get recommendations based on your needs, preferences, and daily
              lifestyle.
            </p>
          </div>

          <div className="consultation-feature-card">
            <h3>Simple Process</h3>
            <p>
              We make it easy to explore inventory, ask questions, and find your
              next car with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}