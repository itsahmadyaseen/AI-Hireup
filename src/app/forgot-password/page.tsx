"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"enterEmail" | "enterOtp">("enterEmail");
  const [otp, setOtp] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // In real app: send OTP to email here.
    setMessage(`An OTP has been sent to ${email}.`);
    setShowOtpPopup(true);
    setStep("enterOtp");
  };

const handleOtpSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (otp.trim() === "") return;
  // TODO: real OTP verification
  // Simulate success then navigate:
  setShowOtpPopup(false);
  router.push("/reset-password");
};


  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ margin: 0, fontSize: "26px", color: "#2563eb" }}>Forgot Password</h2>
        <p style={{ marginTop: "8px", color: "#555" }}>
          Enter your professional email to receive an OTP and reset your password.
        </p>

        {step === "enterEmail" && (
          <form onSubmit={handleEmailSubmit} style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <label style={labelStyle}>Professional Email</label>
            <input
              type="email"
              placeholder="your@workemail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <button type="submit" style={submitBtn}>
              Submit
            </button>
          </form>
        )}

        {step === "enterOtp" && !showOtpPopup && (
          <p style={{ marginTop: "20px", color: "#333" }}>
            {message} If you didn't receive it, you can retry.
          </p>
        )}

        {/* OTP Popup */}
        {showOtpPopup && (
          <div style={overlay}>
            <div style={popup}>
              <h3 style={{ marginTop: 0 }}>Enter OTP</h3>
              <p style={{ marginTop: 4, color: "#555" }}>Check your email ({email}) for the one-time code.</p>
              <form onSubmit={handleOtpSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  style={inputStyle}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="submit" style={{ ...submitBtn, flex: 1 }}>
                    Verify
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowOtpPopup(false);
                      setStep("enterEmail");
                    }}
                    style={{
                      ...submitBtn,
                      flex: 1,
                      backgroundColor: "#ccc",
                      color: "#222",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div style={{ marginTop: "16px", fontSize: "14px" }}>
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
  position: "relative",
};

const labelStyle: React.CSSProperties = {
  fontSize: "14px",
  marginBottom: "4px",
  fontWeight: 500,
  color: "#374151",
};

const inputStyle: React.CSSProperties = {
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

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  zIndex: 1000,
};

const popup: React.CSSProperties = {
  background: "#fff",
  borderRadius: "15px",
  padding: "30px",
  width: "100%",
  maxWidth: "420px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
};

