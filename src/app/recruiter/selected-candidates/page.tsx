"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const selectedCandidates = [
  {
    position: "Backend Developer",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    contact: "+91 98765 43210",
    hireDate: "2025-07-29",
    score: "90%",
    status: "Hired",
    appliedDate: "2025-07-01",
    interviewRounds: [
      {
        round: "Technical Round 1",
        interviewer: "Raghav Gupta",
        date: "2025-07-10",
        score: "88%",
        notes: "Strong fundamentals in algorithms",
      },
      {
        round: "System Design",
        interviewer: "Meena Patel",
        date: "2025-07-15",
        score: "92%",
        notes: "Clear and scalable design",
      },
      {
        round: "HR Round",
        interviewer: "Arjun Rao",
        date: "2025-07-20",
        score: "90%",
        notes: "Cultural fit and communication good",
      },
    ],
    resume: "Resume_Priya_Sharma.pdf", // placeholder
    remarks: "Excellent candidate. Recommended for senior backend role.",
  },
  {
    position: "Frontend Developer",
    name: "Sahil Verma",
    email: "s.verma@example.com",
    contact: "+91 91234 56789",
    hireDate: "2025-07-25",
    score: "88%",
    status: "Hired",
    appliedDate: "2025-06-28",
    interviewRounds: [
      {
        round: "Coding Round",
        interviewer: "Neha Singh",
        date: "2025-07-05",
        score: "85%",
        notes: "Good DOM manipulation skills",
      },
      {
        round: "UI/UX Discussion",
        interviewer: "Divya Kulkarni",
        date: "2025-07-12",
        score: "90%",
        notes: "Strong sense for design and accessibility",
      },
      {
        round: "Final HR",
        interviewer: "Rakesh Nair",
        date: "2025-07-18",
        score: "89%",
        notes: "Positive attitude, team player",
      },
    ],
    resume: "Resume_Sahil_Verma.pdf", // placeholder
    remarks: "Great frontend developer with design awareness.",
  },
];

export default function SelectedCandidatesPage() {
  const router = useRouter();
  const [openCandidate, setOpenCandidate] = useState(null);

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      {/* Navigation (centered) */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "30px" }}>
        <button
          onClick={() => router.push("/dashboard")}
          style={{
            padding: "10px 25px",
            backgroundColor: "#E3E6EA",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Dashboard
        </button>
        <button
          onClick={() => router.push("/job-listings")}
          style={{
            padding: "10px 25px",
            backgroundColor: "#E3E6EA",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Job Listings
        </button>
        <button
          onClick={() => router.push("/job-applications")}
          style={{
            padding: "10px 25px",
            backgroundColor: "#E3E6EA",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Job Applications
        </button>
      </div>

      <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>Selected Candidates</h2>
      <p style={{ color: "#555", marginBottom: "20px" }}>
        List of candidates who have been hired/selected for roles.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {selectedCandidates.map((cand, idx) => (
          <div
            key={idx}
            onClick={() => setOpenCandidate(cand)}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1fr",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.01)";
              e.currentTarget.style.boxShadow = "0 8px 22px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.08)";
            }}
          >
            <div>
              <div style={{ fontWeight: "bold" }}>{cand.position}</div>
              <div style={{ fontSize: "13px", color: "#666" }}>{cand.name}</div>
            </div>
            <div>
              <div style={{ fontWeight: "600" }}>Email</div>
              <div style={{ fontSize: "13px" }}>{cand.email}</div>
            </div>
            <div>
              <div style={{ fontWeight: "600" }}>Contact</div>
              <div style={{ fontSize: "13px" }}>{cand.contact}</div>
            </div>
            <div>
              <div style={{ fontWeight: "600" }}>Hire Date</div>
              <div style={{ fontSize: "13px" }}>{cand.hireDate}</div>
            </div>
            <div>
              <div style={{ fontWeight: "600" }}>Match Score</div>
              <div style={{ fontSize: "13px" }}>{cand.score}</div>
            </div>
            <div>
              <div style={{ fontWeight: "600" }}>Status</div>
              <div style={{ fontSize: "13px", color: "#10B981" }}>{cand.status}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Detail Modal */}
      {openCandidate && (
        <div
          onClick={() => setOpenCandidate(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: "60px",
            zIndex: 1500,
            overflowY: "auto",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "12px",
              maxWidth: "900px",
              width: "100%",
              padding: "30px 35px",
              boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
              position: "relative",
              marginBottom: "60px",
            }}
          >
            <button
              onClick={() => setOpenCandidate(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "transparent",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <h2 style={{ marginTop: 0 }}>{openCandidate.name}</h2>
            <p style={{ margin: "4px 0", color: "#555" }}>
              <strong>Position:</strong> {openCandidate.position} | <strong>Status:</strong>{" "}
              <span style={{ color: "#10B981" }}>{openCandidate.status}</span>
            </p>
            <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", marginTop: "20px" }}>
              {/* Left summary */}
              <div style={{ flex: "1 1 300px", minWidth: "280px" }}>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontWeight: "600" }}>Email</div>
                  <div>{openCandidate.email}</div>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontWeight: "600" }}>Contact</div>
                  <div>{openCandidate.contact}</div>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontWeight: "600" }}>Applied Date</div>
                  <div>{openCandidate.appliedDate}</div>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontWeight: "600" }}>Hire Date</div>
                  <div>{openCandidate.hireDate}</div>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontWeight: "600" }}>Overall Match Score</div>
                  <div>{openCandidate.score}</div>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div style={{ fontWeight: "600", marginBottom: "6px" }}>Resume</div>
                  <div>
                    <a
                      href="#"
                      style={{
                        display: "inline-block",
                        padding: "8px 14px",
                        background: "#eef5ff",
                        borderRadius: "6px",
                        textDecoration: "none",
                        color: "#2563eb",
                        fontWeight: "600",
                      }}
                    >
                      {openCandidate.resume}
                    </a>
                  </div>
                </div>
              </div>

              {/* Right detailed interview timeline */}
              <div style={{ flex: "2 1 450px", minWidth: "300px" }}>
                <h3 style={{ marginTop: 0 }}>Interview History</h3>
                {openCandidate.interviewRounds.map((round, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#f9faff",
                      padding: "15px",
                      borderRadius: "8px",
                      marginBottom: "12px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontWeight: "bold" }}>{round.round}</div>
                        <div style={{ fontSize: "13px", color: "#555" }}>
                          Interviewer: {round.interviewer}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "13px" }}>
                          <strong>Date:</strong> {round.date}
                        </div>
                        <div style={{ fontSize: "13px" }}>
                          <strong>Score:</strong> {round.score}
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: "8px" }}>
                      <div style={{ fontWeight: "600" }}>Notes:</div>
                      <div style={{ fontSize: "14px", color: "#444" }}>{round.notes}</div>
                    </div>
                  </div>
                ))}

                <div style={{ marginTop: "20px" }}>
                  <h4 style={{ marginBottom: "6px" }}>Final Remarks</h4>
                  <p style={{ background: "#fff9f0", padding: "12px", borderRadius: "6px", border: "1px solid #ffe2c2" }}>
                    {openCandidate.remarks}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
