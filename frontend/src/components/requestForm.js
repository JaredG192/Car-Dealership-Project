import React, { useState } from "react";
import { addRequest } from "../services/requestService";

export default function RequestForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    type: "consultation"
  });

 const handleSubmit = (e) => {
  e.preventDefault();

  console.log("Submitting:", form); // 👈 ADD THIS

  addRequest(form);

  console.log("Saved to localStorage:", localStorage.getItem("requests")); // 👈 ADD THIS

  alert("Request submitted!");
};

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Contact / Consultation</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="consultation">Consultation</option>
          <option value="question">Question</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}