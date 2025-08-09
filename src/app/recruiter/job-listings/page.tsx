"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  company: string;
  skillsRequired: string[];
  applicationDeadline: string;
  salary: number;
  description: string;
  createdAt: string;
  location?: string;
}

const skillsOptions = [
  "React",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "Machine Learning",
  "UI/UX Design",
  "SQL",
  "AWS",
  "Docker",
  "Data Analysis",
  "DevOps",
  "HTML/CSS",
  "JavaScript",
  "Kubernetes",
];

const JobListingsPage = () => {
  const [activeTab, setActiveTab] = useState("joblisting");
  const [showForm, setShowForm] = useState(false);
  const [jobPostings, setJobPostings] = useState<Job[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    skills: [] as string[],
    location: "",
    salary: "",
    expiry: "",
    description: "",
  });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Fetch existing jobs on page load
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/recruiter/jobs", {
          method: "GET",
        });
        if (!res.ok) throw new Error("Failed to fetch jobs");

        const data = await res.json();
        setJobPostings(data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newJob = {
      title: formData.title,
      company: formData.company,
      skillsRequired: formData.skills,
      location: formData.location,
      salary: formData.salary,
      description: formData.description,
      applicationDeadline: formData.expiry,
    };

    try {
      const jobDataToSend = {
        ...newJob,
        skillsRequired: newJob.skillsRequired.join(", "), // Convert array to comma-separated string
      };

      const res = await fetch("/api/recruiter/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobDataToSend),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(`Error: ${err.error || "Job creation failed"}`);
        return;
      }

      const result = await res.json();
      setJobPostings((prev) => [result.job, ...prev]);

      setFormData({
        title: "",
        company: "",
        skills: [],
        location: "",
        salary: "",
        expiry: "",
        description: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting job:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "16px",
    fontSize: "16px",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#fff",
      }}
    >
      {/* Top Nav Buttons */}
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

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: "24px", color: "black" }}>
          Manage Your Job Listings
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          + Create
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "black",
            borderRadius: "12px",
            padding: "25px",
            marginTop: "30px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ fontSize: "20px", marginBottom: "5px" }}>
            Create a job posting
          </h3>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            Fill the details to create a new job posting.
          </p>

          <input
            name="title"
            placeholder="Job Title"
            style={inputStyle}
            value={formData.title}
            onChange={handleFormChange}
          />
          <input
            name="company"
            placeholder="Company Name"
            style={inputStyle}
            value={formData.company}
            onChange={handleFormChange}
          />
          <input
            name="location"
            placeholder="Location"
            style={inputStyle}
            value={formData.location}
            onChange={handleFormChange}
          />
          <input
            name="salary"
            placeholder="Salary (INR/SAR)"
            style={inputStyle}
            value={formData.salary}
            onChange={handleFormChange}
          />
          <input
            type="date"
            name="expiry"
            style={inputStyle}
            value={formData.expiry}
            onChange={handleFormChange}
          />
          <textarea
            name="description"
            placeholder="Job Description (max 1000 words)"
            style={{ ...inputStyle, height: "120px" }}
            maxLength={1000}
            value={formData.description}
            onChange={handleFormChange}
          />

          {/* Skills */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                fontWeight: "bold",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Skills Required
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "8px",
              }}
            >
              {skillsOptions.map((skill) => (
                <label
                  key={skill}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "14px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            style={{
              padding: "12px 25px",
              backgroundColor: "#28A745",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Submit Job Posting
          </button>
        </form>
      )}

      {/* Table-like Display */}
      <div
        style={{
          marginTop: "40px",
          backgroundColor: "#E3F2FD",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            fontWeight: "bold",
            fontSize: "16px",
            paddingBottom: "10px",
            borderBottom: "2px solid #ccc",
            marginBottom: "10px",
          }}
        >
          <div style={{ color: "black" }}>Job Title</div>
          <div style={{ color: "black" }}>Company</div>
          <div style={{ color: "black" }}>Skills</div>
          <div style={{ color: "black" }}>Location</div>
          <div style={{ color: "black" }}>Expiry Date</div>
          <div style={{ color: "black" }}>Status</div>
        </div>

        {jobPostings.length === 0 ? (
          <p
            style={{ color: "#666", fontStyle: "italic", textAlign: "center" }}
          >
            No job listings yet. Click Create to add your first job!
          </p>
        ) : (
          jobPostings.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                padding: "12px",
                borderRadius: "10px",
                backgroundColor: "#fff",
                marginBottom: "8px",
                cursor: "pointer",
                transition: "0.3s",
                color: "black", // ✅ ensure text is white by default
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "black";
                e.currentTarget.style.color = "white"; // ✅ switch text to black on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "black"; // ✅ switch text back to white
              }}
            >
              <div>{job.title}</div>
              <div>{job.company}</div>
              <div>
                {job.skillsRequired.split(", ").slice(0, 3).join(", ") +
                  (job.skillsRequired.split(", ").length > 3 ? "..." : "")}
              </div>
              <div>{job.location || "N/A"}</div>
              <div>{job.applicationDeadline.split("T")[0]}</div>
              <div>Open</div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selectedJob && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedJob(null)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "500px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              color: "black",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{selectedJob.title}</h3>
            <p>
              <strong>Company:</strong> {selectedJob.company}
            </p>
            <p>
              <strong>Location:</strong> {selectedJob.location || "N/A"}
            </p>
            <p>
              <strong>Salary:</strong> {selectedJob.salary}
            </p>
            <p>
              <strong>Skills Required:</strong>{" "}
              {selectedJob.skillsRequired.split(", ").join(", ")}
            </p>
            <p>
              <strong>Expiry Date:</strong>{" "}
              {selectedJob.applicationDeadline.split("T")[0]}
            </p>
            <p>
              <strong>Description:</strong> {selectedJob.description}
            </p>
            <button
              onClick={() => setSelectedJob(null)}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListingsPage;
