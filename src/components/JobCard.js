// components/JobCard.js
import { Calendar, MapPin, Building, Clock, Tag } from 'lucide-react';

export default function JobCard({ job }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getJobTypeColor = (jobType) => {
    const colors = {
      'Full-Time': 'bg-green-100 text-green-800',
      'Part-Time': 'bg-blue-100 text-blue-800',
      'Internship': 'bg-purple-100 text-purple-800',
      'Contract': 'bg-orange-100 text-orange-800',
      'Freelance': 'bg-pink-100 text-pink-800'
    };
    return colors[jobType] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
            {job.title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.jobType)}`}>
            {job.jobType}
          </span>
        </div>

        {/* Company Info */}
        <div className="flex items-center gap-2 mb-3">
          <Building className="h-4 w-4 text-gray-500" />
          <span className="text-gray-700 font-medium">{job.company}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-gray-600">{job.location}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {job.description}
        </p>

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {skill}
                </span>
              ))}
              {job.skills.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{job.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Deadline: {formatDate(job.applicationDeadline)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Posted {formatDate(job.createdAt)}</span>
          </div>
        </div>

        {/* Apply Button */}
        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
          Apply Now
        </button>
      </div>
    </div>
  );
}
