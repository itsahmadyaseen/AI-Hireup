'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarIcon, ClockIcon, EyeIcon } from '@heroicons/react/24/outline';

// Type definitions
// Removed TypeScript interface for JavaScript compatibility

// type FilterType = 'all' | 'pending' | 'accepted' | 'rejected'; // Removed for JS compatibility

// Mock applications
const MOCK_APPLICATIONS = [
  {
    id: 1,
    jobId: 1,
    jobTitle: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    appliedDate: "2025-08-05T10:30:00.000Z",
    status: "pending",
    jobType: "Full-Time"
  },
  {
    id: 2,
    jobId: 2,
    jobTitle: "AI Research Intern",
    company: "InnoAI",
    location: "Bangalore",
    appliedDate: "2025-08-03T14:20:00.000Z",
    status: "accepted",
    jobType: "Internship"
  },
  {
    id: 3,
    jobId: 3,
    jobTitle: "Backend Developer",
    company: "DevSolutions",
    location: "Mumbai",
    appliedDate: "2025-07-28T09:15:00.000Z",
    status: "rejected",
    jobType: "Full-Time"
  }
];

export default function ApplicationHistory() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setApplications(MOCK_APPLICATIONS);
    setLoading(false);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric'
    });

  const filteredApplications = applications.filter(app =>
    filter === 'all' ? true : app.status === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Application History</h1>
        <p className="text-gray-600">Track all your job applications in one place</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { key: 'all', label: 'All Applications' },
            { key: 'pending', label: 'Pending' },
            { key: 'accepted', label: 'Accepted' },
            { key: 'rejected', label: 'Rejected' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(
                ['all', 'pending', 'accepted', 'rejected'].includes(tab.key) ? tab.key : 'all'
              )}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                filter === tab.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {tab.key !== 'all' && (
                <span className="ml-2 bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  {applications.filter(app => app.status === tab.key).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      {filteredApplications.length > 0 ? (
        <div className="space-y-4">
          {filteredApplications.map(application => (
            <div
              key={application.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{application.jobTitle}</h3>
                      <p className="text-gray-600 mb-2">{application.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <span>{application.location}</span>
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          <span>Applied on {formatDate(application.appliedDate)}</span>
                        </div>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {application.jobType}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                      <button
                        onClick={() => router.push(`/jobs/${application.jobId}`)}
                        className="flex items-center text-blue-600 hover:text-blue-500 text-sm font-medium"
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View Job
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all'
                ? "You haven't applied to any jobs yet."
                : `No ${filter} applications found.`}
            </p>
            <div className="mt-6">
              <button
                onClick={() => router.push('/jobs/explore')}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {applications.length > 0 && (
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {applications.filter(app => app.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {applications.filter(app => app.status === 'accepted').length}
              </div>
              <div className="text-sm text-gray-600">Accepted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {applications.filter(app => app.status === 'rejected').length}
              </div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
