"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Candidate {
  firstName: string;
  lastName: string;
  email: string;
}

interface Interview {
  id: number;
  scheduledAt: string;
  status: string;
}

interface Application {
  id: number;
  status: string;
  candidate: Candidate;
  interview: Interview | null;
}

interface Job {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  applicationDeadline: string;
  applications: Application[];
  applicationCount: number;
}

interface DashboardData {
  totalApplications: number;
  jobs: Job[];
}

const DashboardPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/recruiter/dashboard");
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const result: DashboardData = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const cardStyle = {
    flex: "1",
    margin: "10px",
    padding: "20px",
    borderRadius: "10px",
    background: "#F5F7FA",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  };

  const hoverEffect = {
    transform: "scale(1.05)",
  };

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading dashboard...</p>;
  }

  if (!data) {
    return <p style={{ padding: "40px" }}>Failed to load dashboard data.</p>;
  }

  // Flatten all applications
  const allApplications = data.jobs.flatMap((job) => job.applications);

  const applicationStatusCount = {
    underReview: allApplications.filter((a) => a.status === "UNDER_REVIEW")
      .length,
    interviewScheduled: allApplications.filter(
      (a) => a.status === "INTERVIEW_SCHEDULED"
    ).length,
    rejected: allApplications.filter((a) => a.status === "REJECTED").length,
    hired: allApplications.filter((a) => a.status === "HIRED").length,
  };

  const recentApplications = allApplications.slice(0, 3);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", backgroundColor:'#fff' }}>
      {/* Navigation Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        {["dashboard", "joblisting", "jobapplications"].map((tab) => {
          // Define correct routes based on tab
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

      {/* Dashboard Cards */}
      <div
        style={{
          width: "103%",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div
            style={cardStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = hoverEffect.transform)
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ color: "black" }}>My Jobs</h3>
            <p style={{ color: "black" }}>{data.jobs.length} job postings</p>
          </div>
          <div
            style={cardStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = hoverEffect.transform)
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ color: "black" }}>Total Applications</h3>
            <p style={{ color: "black" }}>
              {data.totalApplications} applications
            </p>
          </div>
          <div
            style={cardStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = hoverEffect.transform)
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ color: "black" }}>Hired</h3>
            <p style={{ color: "black" }}>
              {applicationStatusCount.hired} candidates
            </p>
          </div>
        </div>

        {/* Status Breakdown */}
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#F5F7FA",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3
            style={{ marginBottom: "10px", fontSize: "20px", color: "black" }}
          >
            Applications by Status
          </h3>
          <ul
            style={{ listStyle: "disc", paddingLeft: "20px", color: "black" }}
          >
            <li>Under Review: {applicationStatusCount.underReview}</li>
            <li>
              Interview Scheduled: {applicationStatusCount.interviewScheduled}
            </li>
            <li>Rejected: {applicationStatusCount.rejected}</li>
            <li>Hired: {applicationStatusCount.hired}</li>
          </ul>
        </div>

        {/* Recent Applications */}
        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            background: "#F5F7FA",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3
            style={{ marginBottom: "20px", fontSize: "20px", color: "black" }}
          >
            Recent Applications
          </h3>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {recentApplications.map((app, index) => (
              <div
                key={index}
                style={{
                  padding: "15px",
                  background: "#ffffff",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                  width: "250px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = hoverEffect.transform)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <h4 style={{ margin: "0 0 8px", color: "black" }}>
                  👤 {app.candidate.firstName} {app.candidate.lastName}
                </h4>
                <p style={{ margin: 0, color: "black" }}>
                  {app.status.replace("_", " ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
