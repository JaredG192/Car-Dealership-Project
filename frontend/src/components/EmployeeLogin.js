import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EmployeeLogin.css";

const accounts = [
  {
    email: "manager@test.com",
    password: "manager123",
    role: "manager",
  },
  {
    email: "employee@test.com",
    password: "employee123",
    role: "employee",
  },
];

export default function EmployeeLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = (e) => {
  e.preventDefault();

  const foundUser = accounts.find(
    (acc) =>
      acc.email === email &&
      acc.password === password
  );

  if (!foundUser) {
    alert("Invalid email or password");
    return;
  }

  localStorage.setItem(
    "user",
    JSON.stringify(foundUser)
  );

  navigate("/dashboard");
};
  return (
    <section className="employee-login-page">
      <div className="employee-login-container">
        <div className="employee-login-card">

          <div className="employee-login-header">
            <div className="employee-login-top">
              <Link to="/" className="back-home-btn">
                ← Back to Home
              </Link>

              <div className="employee-login-pill">
                Internal Access
              </div>
            </div>

            <h1>Employee Login</h1>
            <div className="employee-login-underline"></div>
            <p>Sign in to access the employee dashboard.</p>
          </div>

          <form className="employee-login-form" onSubmit={handleLogin}>

            <div className="employee-form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="employee-form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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