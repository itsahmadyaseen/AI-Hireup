"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Application {
  id: number;
  job: {
    id: number;
    title: string;
    company?: {
      name: string;
    };
  };
  candidate: {
    firstName: string;
    lastName: string;
    email: string;
  };
  matchScore?: number;
  interview?: {
    status: string;
  };
  status: string;
  appliedAt: string;
}

export default function JobApplicationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("jobApplications");

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const [selectedJob, setSelectedJob] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      setApiError(null);
      try {
        const res = await fetch("/api/recruiter/applications");
        if (!res.ok) {
          throw new Error("Error fetching applications");
        }
        const data = await res.json();
        setApplications(data.applications || []);
      } catch (error: any) {
        setApiError(error.message || "Unknown error");
        setApplications([]);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app) => {
    const fullName = `${app.candidate.firstName} ${app.candidate.lastName}`.toLowerCase();
    const matchJob = selectedJob ? String(app.job.id) === selectedJob : true;
    const matchName = fullName.includes(searchTerm.toLowerCase());
    return matchJob && matchName;
  });

  return (
    <div style={{ padding: "30px", fontFamily: "Segoe UI, sans-serif", backgroundColor: "black", minHeight: "100vh" }} >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
        {["dashboard", "joblisting", "jobapplications"].map((tab) => {
          const href =
            tab === "dashboard"
              ? "/dashboard/recruiter"
              : tab === "joblisting"
              ? "/recruiter/job-listings"
              : "/recruiter/job-applications";
          return (
            <Link key={tab} href={href}>
              <button
                onClick={() => setActiveTab(tab)}
                style={{
                  margin: "0 20px",
                  padding: "20px 35px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "16px",
                  backgroundColor: activeTab === tab ? "#007BFF" : "#f0f0f0",
                  color: activeTab === tab ? "#fff" : "#333",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                {tab === "dashboard"
                  ? "Dashboard"
                  : tab === "joblisting"
                  ? "Job Listings"
                  : "Job Applications"}
              </button>
            </Link>
          );
        })}
      </div>

      <h2 style={{ fontSize: "28px", marginBottom: "10px" }}> Job Applications </h2>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "25px" }}>
        Manage and review submitted applications
      </p>

      <div style={{
        background: "black", padding: "20px", borderRadius: "12px",
        border: "solid", boxShadow: "0 2px 8px rgba(0,0,0,0.8)",
        width: "97%", marginBottom: "20px"
      }}>
        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}> Filter Application </h3>
        <p style={{ color: "#fff", marginBottom: "10px" }}>
          Select a job to see related applications.
        </p>
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          style={{
            padding: "10px", borderRadius: "6px", border: "1px solid #ccc",
            width: "100%", fontSize: "16px", color: "black"
          }}
        >
          <option value="">Select a job posting</option>
          {[...new Map(applications.map((app) => [app.job.id, app.job])).values()].map((job) => (
            <option key={job.id} value={job.id}>
              {job.title} ({job.company?.name || ""})
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="Search candidate by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "12px 16px", width: "97%", borderRadius: "8px",
          border: "1px solid #ccc", marginBottom: "25px", fontSize: "15px"
        }}
      />

      <div style={{
        background: "black", padding: "20px", borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)", width: "97%", border: "solid"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1.5fr 1fr 1.5fr 1.5fr 1.2fr 1fr",
          fontWeight: "bold", fontSize: "15px", marginBottom: "12px", color: "#fff"
        }}>
          <span>Job Position</span>
          <span>Candidate Name</span>
          <span>Match Score</span>
          <span>Interview Status</span>
          <span>Application Status</span>
          <span>Applied Date</span>
          <span>Details</span>
        </div>

        {loading ? (
          <div style={{ color: "#fff", padding: "18px" }}>Loading applications...</div>
        ) : apiError ? (
          <div style={{ color: "#fff", padding: "18px" }}>Error loading applications: {apiError}</div>
        ) : filteredApplications.length === 0 ? (
          <div style={{ color: "#fff", padding: "18px" }}>No applications found.</div>
        ) : filteredApplications.map((app, index) => (
          <div
            key={app.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1.5fr 1fr 1.5fr 1.5fr 1.2fr 1fr",
              alignItems: "center", padding: "14px 0",
              borderTop: index !== 0 ? "1px solid #eee" : "none",
              transition: "transform 0.2s", cursor: "pointer"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.01)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            <span>{app.job?.title || "-"}</span>
            <span>{`${app.candidate.firstName} ${app.candidate.lastName}`}</span>
            <span>{app.matchScore !== undefined ? `${app.matchScore}%` : "-"}</span>
            <span>{app.interview?.status || "N/A"}</span>
            <span>{app.status || "-"}</span>
            <span>{app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "-"}</span>
            <button
              style={{
                padding: "6px 12px", background: "#007BFF",
                color: "#fff", border: "none", borderRadius: "6px",
                cursor: "pointer", fontSize: "14px"
              }}
              onClick={() => alert(`Viewing details for ${app.candidate.firstName} ${app.candidate.lastName}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
