import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    setFormData({ firstName: "", lastName: "", email: "", phone: "" });
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <div style={{ padding: 24, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", borderRadius: 8 }}>
        <h2 style={{ textAlign: "center", marginTop: 0 }}>User Details Form</h2>

        <hr style={{ margin: "16px 0" }} />

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={{ display: "flex", flexDirection: "column" }}>
            First Name
            <input name="firstName" value={formData.firstName} onChange={handleChange} required style={{ padding: 8, marginTop: 6 }} />
          </label>

          <label style={{ display: "flex", flexDirection: "column" }}>
            Last Name
            <input name="lastName" value={formData.lastName} onChange={handleChange} required style={{ padding: 8, marginTop: 6 }} />
          </label>

          <label style={{ display: "flex", flexDirection: "column" }}>
            Email
            <input name="email" type="email" value={formData.email} onChange={handleChange} required style={{ padding: 8, marginTop: 6 }} />
          </label>

          <label style={{ display: "flex", flexDirection: "column" }}>
            Phone Number
            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required style={{ padding: 8, marginTop: 6 }} />
          </label>

          <button type="submit" style={{ padding: 10, background: "#1976d2", color: "white", border: "none", borderRadius: 4, cursor: "pointer", width: 120 }}>
            Submit
          </button>
        </form>

        {submittedData && (
          <div style={{ marginTop: 24, padding: 16, background: "#f6f6f6", borderRadius: 6 }}>
            <h3 style={{ marginTop: 0 }}>Submitted Details</h3>
            <div style={{ borderTop: "1px solid #ddd", paddingTop: 12 }}>
              <p style={{ margin: 6 }}><strong>First Name:</strong> {submittedData.firstName}</p>
              <p style={{ margin: 6 }}><strong>Last Name:</strong> {submittedData.lastName}</p>
              <p style={{ margin: 6 }}><strong>Email:</strong> {submittedData.email}</p>
              <p style={{ margin: 6 }}><strong>Phone Number:</strong> {submittedData.phone}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;