'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarIcon, MapPinIcon, BriefcaseIcon, ClockIcon } from '@heroicons/react/24/outline';

// Types
interface Recruiter {
  id: number;
  companyName: string;
  email: string;
  contactPerson: string;
}

interface Job {
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
  skills: string[];
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  recruiter: Recruiter;
}

interface JobDescriptionProps {
  jobId: string;
}

// Static mock data
const JOBS: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    description: "Develop and maintain cutting-edge web applications using React. Work with product teams to deliver modern, robust, user-friendly UIs.",
    company: "TechCorp",
    location: "Remote",
    jobType: "Full-Time",
    salary: "$80,000 - $120,000",
    applicationDeadline: "2025-08-20T23:59:59.000Z",
    status: "active",
    createdAt: "2025-07-25T14:23:00.000Z",
    skills: ["React", "JavaScript", "TypeScript", "CSS"],
    requirements: [
      "3+ years experience with React.js",
      "Proficiency in JavaScript/TypeScript",
      "Experience with CSS/SASS",
      "Knowledge of REST APIs",
    ],
    responsibilities: [
      "Write reusable, testable, scalable code",
      "Work closely with backend engineers",
      "Review code and mentor juniors",
      "Contribute to architectural decisions",
    ],
    benefits: [
      "Remote friendly",
      "Flexible hours",
      "Health insurance",
      "Paid time off",
    ],
    recruiter: {
      id: 1,
      companyName: "TechCorp",
      email: "recruiter@techcorp.com",
      contactPerson: "Alex Smith"
    }
  },
  {
    id: 2,
    title: "AI Research Intern",
    description: "Join our AI team to explore new frontiers in ML and NLP.",
    company: "InnoAI",
    location: "Bangalore",
    jobType: "Internship",
    salary: "₹30,000/month",
    applicationDeadline: "2025-08-31T23:59:59.000Z",
    status: "active",
    createdAt: "2025-07-30T11:20:00.000Z",
    skills: ["Python", "TensorFlow", "NLP"],
    requirements: [
      "Strong programming skills in Python",
      "Knowledge of machine learning",
      "Good written and verbal communication",
    ],
    responsibilities: [
      "Assist in AI research",
      "Implement and test ML models",
      "Contribute to technical papers",
    ],
    benefits: [
      "Mentorship",
      "Stipend",
      "Certificate",
    ],
    recruiter: {
      id: 2,
      companyName: "InnoAI",
      email: "ai-recruit@innoai.org",
      contactPerson: "Dr. Priya Gupta"
    }
  }
];

export default function JobDescription({ jobId }: JobDescriptionProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [applying, setApplying] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const foundJob = JOBS.find(j => j.id === Number(jobId));
    setJob(foundJob || null);
    setLoading(false);
  }, [jobId]);

  const handleApply = () => {
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      router.push('/applications');
    }, 700);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Job Not Found</h2>
          <button
            onClick={() => router.push('/jobs/explore')}
            className="text-blue-600 hover:text-blue-500"
          >Back to Jobs</button>
        </div>
      </div>
    );
  }

  return (
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
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
                <span className="text-sm">Posted {formatDate(job.createdAt)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <CalendarIcon className="h-5 w-5 mr-2" />
                <span className="text-sm">Deadline: {formatDate(job.applicationDeadline)}</span>
              </div>
            </div>
            {/* Salary */}
            {job.salary && (
              <div className="mb-4">
                <span className="text-lg font-semibold text-green-600">{job.salary}</span>
              </div>
            )}
          </div>
          {/* Apply Now Button */}
          <div className="mt-6 md:mt-0 md:ml-6">
            <button
              onClick={handleApply}
              disabled={applying}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 min-w-[120px]"
            >
              {applying ? 'Applying...' : 'Apply Now'}
            </button>
          </div>
        </div>
        {/* Skills */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Job Sections */}
      <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Responsibilities</h2>
          <ul className="space-y-2">
            {job.responsibilities.map((responsibility, i) => (
              <li key={i} className="flex items-start"><span className="text-blue-600 mr-2">•</span>{responsibility}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
          <ul className="space-y-2">
            {job.requirements.map((req, i) => (
              <li key={i} className="flex items-start"><span className="text-blue-600 mr-2">•</span>{req}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
          <ul className="space-y-2">
            {job.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start"><span className="text-green-600 mr-2">✓</span>{benefit}</li>
            ))}
          </ul>
        </section>
        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700"><strong>Contact Person:</strong> {job.recruiter.contactPerson}</p>
            <p className="text-gray-700"><strong>Company:</strong> {job.recruiter.companyName}</p>
            <p className="text-gray-700"><strong>Email:</strong> {job.recruiter.email}</p>
          </div>
        </section>
      </div>
      {/* Bottom Apply Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleApply}
          disabled={applying}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-12 py-4 rounded-lg font-medium text-lg transition-colors duration-200"
        >
          {applying ? 'Applying...' : 'Apply for This Position'}
        </button>
      </div>
    </div>
  );
}
