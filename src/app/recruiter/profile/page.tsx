"use client";

import React from "react";

const companyData = {
  name: "AI-Hireup Inc.",
  tagline: "Hiring smarter with AI-driven interviews",
  logo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=100&q=80",
  cover:
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
  established: "2019",
  headquarters: "Bengaluru, India",
  industry: "HR Tech",
  employees: 120,
  website: "https://www.ai-hireup.com",
  social: {
    linkedin: "https://linkedin.com/company/ai-hireup",
    twitter: "https://twitter.com/AIHireup",
  },
  achievements: [
    "Scaled to 500+ enterprise customers",
    "Reduced average time-to-hire by 35%",
    "Featured in HR Tech Weekly Top 50 Startups 2024",
    "Patented AI interview scoring algorithm",
  ],
  values: ["Transparency", "Candidate-first", "Data-driven", "Continuous improvement"],
  mission:
    "To empower recruiters with objective, fast, and fair hiring decisions using AI and analytics.",
  vision: "Create a world where the best talent meets the right opportunity instantly.",
  awards: [
    { title: "Best HR Startup", year: 2023 },
    { title: "Innovation in Recruitment", year: 2022 },
  ],
  team: [
    { name: "Rohan Mehta", role: "CEO", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Neha Singh", role: "CTO", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Adil Khan", role: "Head of Product", photo: "https://randomuser.me/api/portraits/men/55.jpg" },
  ],
  testimonial: {
    quote:
      "AI-Hireup transformed our hiring. The interview automation and scoring helped us shortlist top talent in half the time.",
    author: "Priya Patel, VP Talent Acquisition at TechNova",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  benefits: [
    "Flexible work policy",
    "Health insurance",
    "Learning stipend",
    "Monthly team retreats",
    "Mentorship programs",
  ],
};

export default function CompanyProfilePage() {
  return (
    <div style={{ fontFamily: "Segoe UI, system-ui, sans-serif", lineHeight: 1.5, background: "#f0f4f9" }}>
      {/* Cover + logo */}
      <div style={{ position: "relative", overflow: "hidden", height: "340px" }}>
        <div
          style={{
            backgroundImage: `url(${companyData.cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.85)",
            width: "100%",
            height: "100%",
            transition: "transform 0.6s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "flex-end",
            padding: "0 40px 30px",
            gap: "20px",
            color: "#fff",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "16px",
              overflow: "hidden",
              border: "4px solid #fff",
              background: "#fff",
              flexShrink: 0,
              boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={companyData.logo}
              alt="logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ flex: "1 1 300px", minWidth: "220px" }}>
            <h1 style={{ margin: 0, fontSize: "32px" }}>{companyData.name}</h1>
            <p style={{ margin: "4px 0 8px", fontSize: "16px", opacity: 0.9 }}>{companyData.tagline}</p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "6px" }}>
              <div style={badgeStyle}>Established {companyData.established}</div>
              <div style={badgeStyle}>{companyData.industry}</div>
              <div style={badgeStyle}>{companyData.headquarters}</div>
              <div style={badgeStyle}>{companyData.employees} Employees</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", marginLeft: "auto" }}>
            <a
              href={companyData.website}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#fff",
                padding: "10px 18px",
                borderRadius: "8px",
                fontWeight: "600",
                textDecoration: "none",
                color: "#2563eb",
                boxShadow: "0 8px 24px rgba(37,99,235,0.2)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Visit Website
            </a>
            <div style={{ display: "flex", gap: "8px" }}>
              <a
                href={companyData.social.linkedin}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "8px",
                  background: "#0077b5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "18px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                }}
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href={companyData.social.twitter}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "8px",
                  background: "#1da1f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "18px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                }}
                aria-label="Twitter"
              >
                t
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: "1150px", margin: "0 auto", padding: "40px 20px" }}>
        {/* Overview & Mission/Vision */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "30px",
            marginBottom: "50px",
            alignItems: "start",
          }}
        >
          <div>
            <h2 style={{ marginTop: 0, fontSize: "28px" }}>About {companyData.name}</h2>
            <p style={{ fontSize: "16px", color: "#444" }}>{companyData.mission}</p>
            <p style={{ fontSize: "16px", color: "#444" }}>
              <strong>Vision:</strong> {companyData.vision}
            </p>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "25px" }}>
              <div style={infoCard}>
                <div style={{ fontWeight: "700", marginBottom: "6px" }}>Achievements</div>
                <ul style={{ paddingLeft: "16px", margin: 0 }}>
                  {companyData.achievements.map((a, i) => (
                    <li key={i} style={{ marginBottom: "6px" }}>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={infoCard}>
                <div style={{ fontWeight: "700", marginBottom: "6px" }}>Core Values</div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {companyData.values.map((v, i) => (
                    <div key={i} style={valueBadge}>
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                padding: "20px",
                borderRadius: "14px",
                background: "#ffffff",
                boxShadow: "0 16px 40px rgba(0,0,0,0.05)",
                transition: "transform 0.3s ease",
                cursor: "default",
              }}
            >
              <div style={{ fontWeight: "700", marginBottom: "10px" }}>Quick Stats</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={statRow}>
                  <div>Founded</div>
                  <div>{companyData.established}</div>
                </div>
                <div style={statRow}>
                  <div>Industry</div>
                  <div>{companyData.industry}</div>
                </div>
                <div style={statRow}>
                  <div>Headquarters</div>
                  <div>{companyData.headquarters}</div>
                </div>
                <div style={statRow}>
                  <div>Employees</div>
                  <div>{companyData.employees}</div>
                </div>
                <div style={statRow}>
                  <div>Plan</div>
                  <div>{companyData.plan}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team & Awards */}
        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", marginBottom: "50px" }}>
          <div style={{ flex: "1 1 320px" }}>
            <h3 style={{ marginTop: 0 }}>Leadership Team</h3>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {companyData.team.map((member, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    padding: "16px",
                    borderRadius: "12px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    flex: "1 1 140px",
                    minWidth: "140px",
                    textAlign: "center",
                    transition: "transform 0.3s ease, boxShadow 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      margin: "0 auto 8px",
                    }}
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ fontWeight: "600" }}>{member.name}</div>
                  <div style={{ fontSize: "13px", color: "#666" }}>{member.role}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: "1 1 280px" }}>
            <h3 style={{ marginTop: 0 }}>Awards & Recognition</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {companyData.awards.map((a, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    padding: "14px 18px",
                    borderRadius: "10px",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
                  }}
                >
                  <div>{a.title}</div>
                  <div style={{ fontSize: "12px", color: "#555" }}>{a.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "25px 30px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.05)",
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "50px",
          }}
        >
          <div style={{ flex: "0 0 80px" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={companyData.testimonial.avatar}
                alt={companyData.testimonial.author}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
          <div style={{ flex: "1 1 300px" }}>
            <div style={{ fontStyle: "italic", fontSize: "18px", marginBottom: "8px" }}>
              “{companyData.testimonial.quote}”
            </div>
            <div style={{ fontWeight: "600", color: "#333" }}>{companyData.testimonial.author}</div>
          </div>
        </div>

        {/* Benefits */}
        <div style={{ marginBottom: "50px" }}>
          <h3 style={{ marginTop: 0 }}>Why Join {companyData.name}?</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {companyData.benefits.map((b, i) => (
              <div
                key={i}
                style={{
                  background: "#eef9f7",
                  padding: "14px 18px",
                  borderRadius: "10px",
                  flex: "1 1 160px",
                  minWidth: "140px",
                  boxShadow: "0 6px 18px rgba(16,185,129,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: 600,
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 10px 28px rgba(16,185,129,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 18px rgba(16,185,129,0.2)";
                }}
              >
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* Footer / Call to Action */}
        <div
          style={{
            background: "linear-gradient(135deg,#2563eb 0%,#10b981 100%)",
            borderRadius: "14px",
            padding: "30px",
            color: "#fff",
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <div style={{ flex: "1 1 300px" }}>
            <h2 style={{ margin: "0 0 6px" }}>Interested in applying?</h2>
            <p style={{ margin: 0, fontSize: "16px" }}>
              Explore open job positions and get matched based on your profile.
            </p>
          </div>
          <div>
            <button
              style={{
                padding: "14px 28px",
                background: "#fff",
                color: "#2563eb",
                borderRadius: "10px",
                border: "none",
                fontWeight: "700",
                cursor: "pointer",
                fontSize: "16px",
                boxShadow: "0 12px 30px rgba(255,255,255,0.5)",
              }}
              onClick={() => {
                /* candidate would be taken to job listing at this company */
              }}
            >
              View Open Roles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Shared styles
const badgeStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.2)",
  padding: "6px 14px",
  borderRadius: "50px",
  fontSize: "12px",
  fontWeight: "600",
  display: "inline-block",
};

const infoCard: React.CSSProperties = {
  flex: "1 1 300px",
  background: "#fff",
  padding: "20px",
  borderRadius: "14px",
  boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
  transition: "all 0.3s ease",
  cursor: "pointer",
};

const valueBadge: React.CSSProperties = {
  background: "#eef5ff",
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#2563eb",
};

const statRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "6px 0",
  borderBottom: "1px solid #eee",
};
