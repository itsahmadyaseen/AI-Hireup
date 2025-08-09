"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

// ==== Types ====
type Recruiter = {
  id: number;
  companyName: string;
  email: string;
  contactPerson: string;
};

type Job = {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  jobType: string;
  salary?: string;
  applicationDeadline: string;
  status: string;
  createdAt: string;
  skillsRequired: string[];
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  recruiter: {
    id: number;
    companyName: string;
    email: string;
    contactPerson: string;
  };
};

type JobDescriptionProps = {
  job: Job;
};

export default function JobDescription({ job }: JobDescriptionProps) {
  // const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [applying, setApplying] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const router = useRouter();

 

  const handleApplyClick = () => {
    setShowModal(true);
  };

  const handleResumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      alert("Please upload your resume before submitting.");
      return;
    }

    try {
      setApplying(true);
      const formData = new FormData();
      formData.append("jobId", String(job.id));
      formData.append("resume", resumeFile);

      const res = await fetch("/api/candidate/applications/", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to apply for job");
        return;
      }

      alert("Application submitted successfully!");
      setShowModal(false);
      router.push("/applications");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Something went wrong while applying");
    } finally {
      setApplying(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //     </div>
  //   );
  // }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Job Not Found
          </h2>
          <button
            onClick={() => router.push("/jobs/explore")}
            className="text-blue-600 hover:text-blue-500"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-500 flex items-center text-sm font-medium"
          >
            ← Back to Jobs
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          {/* Job Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{job.company}</p>
              {/* Meta info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BriefcaseIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm">{job.jobType}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm">
                    Posted {formatDate(job.createdAt)}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm">
                    Deadline: {formatDate(job.applicationDeadline)}
                  </span>
                </div>
              </div>
              {/* Salary */}
              {job.salary && (
                <div className="mb-4">
                  <span className="text-lg font-semibold text-green-600">
                    {job.salary}
                  </span>
                </div>
              )}
            </div>
            {/* Apply Now Button */}
            <div className="mt-6 md:mt-0 md:ml-6">
              <button
                onClick={handleApplyClick}
                disabled={applying}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 min-w-[120px]"
              >
                {applying ? "Applying..." : "Apply Now"}
              </button>
            </div>
          </div>
          {/* Skills */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skillsRequired.split(',').map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Job Sections */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Requirements */}
          {/* <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Requirements
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </section> */}

          {/* Responsibilities */}
          {/* <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Responsibilities
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {job.responsibilities.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
          </section> */}

          {/* Benefits */}
          {/* <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {job.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </section> */}

          {/* Contact */}
          {/* <section className="border-t pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Contact Person:</strong> {job.recruiter.contactPerson}
              </p>
              <p className="text-gray-700">
                <strong>Company:</strong> {job.recruiter.companyName}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {job.recruiter.email}
              </p>
            </div>
          </section> */}
        </div>
        {/* Bottom Apply Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleApplyClick}
            disabled={applying}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-12 py-4 rounded-lg font-medium text-lg transition-colors duration-200"
          >
            {applying ? "Applying..." : "Apply for This Position"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-2xl font-bold mb-4">Submit Your Resume</h2>
            <form onSubmit={handleResumeSubmit}>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) =>
                  setResumeFile(e.target.files ? e.target.files[0] : null)
                }
                className="mb-4 block w-full border border-gray-300 rounded-lg p-2"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={applying}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {applying ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
