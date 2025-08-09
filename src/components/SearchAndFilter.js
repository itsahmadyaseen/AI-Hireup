import { useState } from 'react';

export default function SearchAndFilter({ 
  searchTerm, 
  setSearchTerm, 
  selectedFilters, 
  setSelectedFilters, 
  jobs 
}) {
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique values for filter options
  const uniqueJobTypes = [...new Set(jobs.map(job => job.jobType))];
  const uniqueLocations = [...new Set(jobs.map(job => job.location))];
  const allSkills = [...new Set(jobs.flatMap(job => job.skills || []))];

  const handleSkillToggle = (skill) => {
    setSelectedFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      jobType: '',
      location: '',
      skills: []
    });
    setSearchTerm('');
  };

  const hasActiveFilters = searchTerm || selectedFilters.jobType || selectedFilters.location || selectedFilters.skills.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-400">🔍</span>
        </div>
        <input
          type="text"
          placeholder="Search jobs, companies, or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <span>🔽</span>
          Filters
          {hasActiveFilters && (
            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
              Active
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm"
          >
            <span>❌</span>
            Clear all
          </button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="space-y-6 pt-4 border-t border-gray-200">
          {/* Job Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Type
            </label>
            <select
              value={selectedFilters.jobType}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, jobType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Job Types</option>
              {uniqueJobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              value={selectedFilters.location}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Skills Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {allSkills.map(skill => (
                  <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.skills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                Search: &quot;{searchTerm}&quot;
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-2 hover:text-blue-600"
                >
                  ❌
                </button>
              </span>
            )}
            {selectedFilters.jobType && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                {selectedFilters.jobType}
                <button
                  onClick={() => setSelectedFilters(prev => ({ ...prev, jobType: '' }))}
                  className="ml-2 hover:text-green-600"
                >
                  ❌
                </button>
              </span>
            )}
            {selectedFilters.location && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                {selectedFilters.location}
                <button
                  onClick={() => setSelectedFilters(prev => ({ ...prev, location: '' }))}
                  className="ml-2 hover:text-purple-600"
                >
                  ❌
                </button>
              </span>
            )}
            {selectedFilters.skills.map(skill => (
              <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                {skill}
                <button
                  onClick={() => handleSkillToggle(skill)}
                  className="ml-2 hover:text-orange-600"
                >
                  ❌
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
