// pages/jobs/explore.js or app/jobs/explore/page.js
'use client';

import { useState, useEffect, useMemo } from 'react';
import JobCard from '../../../components/jobcard.js';
import SearchAndFilter from '../../../components/SearchAndFilter';

export default function ExploreJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    jobType: '',
    location: '',
    skills: []
  });

  // Mock data - replace with your actual API call
  const mockJobs = [
    {
      "id": 1,
      "title": "Frontend Developer",
      "description": "Work on React apps with real-time features.",
      "company": "TechCorp",
      "location": "Remote",
      "jobType": "Full-Time",
      "applicationDeadline": "2025-08-20T23:59:59.000Z",
      "status": "active",
      "createdAt": "2025-07-25T14:23:00.000Z",
      "skills": ["React", "JavaScript", "TypeScript", "CSS"],
      "recruiter": {
        "id": 12,
        "companyName": "TechCorp",
        "email": "recruiter@techcorp.com"
      }
    },
    {
      "id": 2,
      "title": "AI Research Intern",
      "description": "Join our AI lab for cutting-edge NLP research.",
      "company": "InnoAI",
      "location": "Bangalore",
      "jobType": "Internship",
      "applicationDeadline": "2025-08-15T23:59:59.000Z",
      "status": "active",
      "createdAt": "2025-07-29T09:45:00.000Z",
      "skills": ["Python", "Machine Learning", "NLP", "TensorFlow"],
      "recruiter": {
        "id": 15,
        "companyName": "InnoAI",
        "email": "ai-recruit@innoai.org"
      }
    }
  ];

  useEffect(() => {
    // Replace this with your actual API call
    const fetchJobs = async () => {
      try {
        // const response = await fetch('/api/jobs');
        // const data = await response.json();
        setJobs(mockJobs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter and search logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesJobType = !selectedFilters.jobType || job.jobType === selectedFilters.jobType;
      const matchesLocation = !selectedFilters.location || job.location === selectedFilters.location;
      const matchesSkills = selectedFilters.skills.length === 0 || 
                           selectedFilters.skills.some(skill => 
                             job.skills?.some(jobSkill => 
                               jobSkill.toLowerCase().includes(skill.toLowerCase())
                             )
                           );

      return matchesSearch && matchesJobType && matchesLocation && matchesSkills;
    });
  }, [jobs, searchTerm, selectedFilters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Jobs</h1>
          <p className="text-gray-600">Discover your next career opportunity</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          jobs={jobs}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
        </div>

        {/* Job Cards Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
