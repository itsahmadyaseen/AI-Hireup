"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import JobDescription from "../../../components/Jobs/JobDescription";

export default function JobDescriptionPage() {
  const { id } = useParams();
  const jobId = Array.isArray(id) ? id[0] : id;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      try {
        // console.log('job', typeof(parseInt(jobId)));

        const res = await fetch(`/api/jobs/${parseInt(jobId)}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to fetch job");
        }

        const data = await res.json();

        setJob(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return <div className="p-4">Loading job details...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!job) {
    return <div className="p-4">Job not found--</div>;
  }

  return <JobDescription job={job} />;
}
