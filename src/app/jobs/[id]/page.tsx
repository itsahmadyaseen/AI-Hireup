'use client';

import { useParams } from 'next/navigation';
import JobDescription from '../../../components/Jobs/JobDescription';

export default function JobDescriptionPage() {
  const { id } = useParams();

  // id param can be string or string[]
  const jobId = Array.isArray(id) ? id[0] : id;

  return <JobDescription jobId={jobId ?? '1'} />;
}
