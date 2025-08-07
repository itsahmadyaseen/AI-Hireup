"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    // TODO: send reset to backend
    alert("Password reset successful (stub). Redirecting to login.");
    router.push("/login");
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ margin: 0, fontSize: "26px", color: "#2563eb" }}>Reset Password</h2>
        <p style={{ marginTop: "8px", color: "#555" }}>
          Enter and confirm your new password.
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ position: "relative" }}>
            <label style={label}>New Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter new password"
              style={input}
            />
          </div>

          <div style={{ position: "relative" }}>
            <label style={label}>Confirm Password</label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              required
              placeholder="Confirm new password"
              style={input}
            />
          </div>

          {error && <div style={{ color: "crimson", fontSize: "14px" }}>{error}</div>}

          <button type="submit" style={submitBtn}>
            Reset Password
          </button>
        </form>

        <div style={{ marginTop: "12px", fontSize: "14px" }}>
          <button
            onClick={() => router.push("/login")}
            style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", padding: 0 }}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

// Styles
const container: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to bottom right, #e0f2fe, #f0f9ff)",
  padding: "20px",
};

const card: React.CSSProperties = {
  background: "#fff",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.1)",
  maxWidth: "500px",
  width: "100%",
};

const label: React.CSSProperties = {
  display: "block",
  fontSize: "14px",
  marginBottom: "6px",
  fontWeight: 500,
  color: "#374151",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  fontSize: "14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  outline: "none",
  boxSizing: "border-box",
};

const submitBtn: React.CSSProperties = {
  padding: "12px",
  background: "#2563eb",
  color: "#fff",
  fontWeight: 600,
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "background 0.3s",
};
