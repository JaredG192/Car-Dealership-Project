import React from "react";
import { Link } from "react-router-dom";
import "./EmployeeLogin.css";

export default function EmployeeLogin() {
  return (
    <section className="employee-login-page">
      <div className="employee-login-container">
        <div className="employee-login-card">
          <div className="employee-login-header">

            {/* Back to homepage */}
          <div className="employee-login-top">
  <Link to="/" className="back-home-btn">
    ← Back to Home
  </Link>

  <div className="employee-login-pill">Internal Access</div>
</div>

            <h1>Employee Login</h1>

            <div className="employee-login-underline"></div>

            <p>Sign in to access the employee dashboard.</p>
          </div>

          {/* Login form */}
          <form className="employee-login-form">

            <div className="employee-form-group">
              <label htmlFor="employee-email">Email</label>
              <input
                id="employee-email"
                type="email"
                placeholder="Enter your work email"
              />
            </div>

            <div className="employee-form-group">
              <label htmlFor="employee-password">Password</label>
              <input
                id="employee-password"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <div className="employee-login-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="employee-login-btn">
              Sign In
            </button>

          </form>

          <p className="employee-login-note">
            Employee access only
          </p>
        </div>
      </div>
    </section>
  );
}