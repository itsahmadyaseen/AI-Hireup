export interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  jobType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship';
  salary?: string;
  applicationDeadline: string;
  status: 'active' | 'closed' | 'draft';
  createdAt: string;
  skills: string[];
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  recruiter: Recruiter;
}

export interface Recruiter {
  id: number;
  companyName: string;
  email: string;
  contactPerson: string;
}
