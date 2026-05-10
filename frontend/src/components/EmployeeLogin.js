import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EmployeeLogin.css";
import { supabase } from "../supabaseClient";

export default function EmployeeLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
//Sign in with Supabase Auth
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    //Get the employee's role from employee_profiles
    const { data: profile } = await supabase
      .from("employee_profiles")
      .select("role, full_name")
      .eq("id", data.user.id)
      .single();

    const role = profile?.role || "employee";
    const fullName = profile?.full_name || email;

    //Save user info to localStorage
    localStorage.setItem("user", JSON.stringify({
      id: data.user.id,
      email: data.user.email,
      role: role,
      fullName: fullName
    }));

    setLoading(false);
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

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button
              type="submit"
              className="employee-login-btn"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
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