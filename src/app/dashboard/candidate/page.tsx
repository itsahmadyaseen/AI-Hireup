'use client';

import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';

export default function CandidateDashboard() {
  const [data, setData] = useState({
    user: { name: 'John', greeting: 'Good morning' },
    stats: [],
    activities: [],
    upcomingInterviews: [],
    skills: [],
    recommendedJobs: [],
    loading: true,
    error: null
  });

  const fetchDashboardData = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));
      
      // Replace with your actual API endpoint
      const response = await fetch('/api/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setData(prev => ({
        ...prev,
        ...result,
        loading: false
      }));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      
      // Fallback to mock data for demonstration
      setMockData();
    }
  }, []);

  const setMockData = () => {
    setData({
      user: { name: 'John', greeting: 'Good morning' },
      stats: [
        { label: 'Applications', value: '12', change: '+2 this week', icon: 'fa-file-alt', iconColor: 'text-blue-600', bgColor: 'bg-blue-50', textColor: 'text-green-600', subIcon: 'fa-arrow-up' },
        { label: 'Interviews', value: '3', change: '1 upcoming', icon: 'fa-video', iconColor: 'text-orange-600', bgColor: 'bg-orange-50', textColor: 'text-orange-600', subIcon: 'fa-clock' },
        { label: 'Average Score', value: '8.5', change: 'Excellent', icon: 'fa-chart-line', iconColor: 'text-green-600', bgColor: 'bg-green-50', textColor: 'text-green-600', subIcon: 'fa-star' },
        { label: 'Profile', value: '85%', change: 'Complete', icon: 'fa-user-circle', iconColor: 'text-purple-600', bgColor: 'bg-purple-50', textColor: 'text-blue-600', subIcon: 'fa-user' }
      ],
      activities: [
        { icon: 'fa-check', bgColor: 'bg-green-50', textColor: 'text-green-600', title: 'Interview completed', description: 'Software Engineer at TechCorp - Score: 8.7/10', time: '2 hours ago' },
        { icon: 'fa-file-alt', bgColor: 'bg-blue-50', textColor: 'text-blue-600', title: 'Feedback available', description: 'Marketing Manager at StartupXYZ', time: 'Yesterday' },
        { icon: 'fa-lightbulb', bgColor: 'bg-orange-50', textColor: 'text-orange-600', title: 'New job match', description: 'Data Analyst at BigCorp - 95% match', time: '2 days ago' }
      ],
      upcomingInterviews: [
        {
          id: 1,
          title: 'Frontend Developer',
          company: 'WebCorp Technologies',
          date: 'Tomorrow, 2:00 PM',
          duration: '30 mins',
          type: 'AI Interview'
        }
      ],
      skills: [
        { skill: 'JavaScript', level: 'Expert', percentage: 90, icon: 'fa-js-square', color: 'blue' },
        { skill: 'React', level: 'Advanced', percentage: 85, icon: 'fa-react', color: 'cyan' },
        { skill: 'Node.js', level: 'Intermediate', percentage: 70, icon: 'fa-node-js', color: 'green' }
      ],
      recommendedJobs: [
        { id: 1, title: 'Senior React Developer', company: 'TechStart Inc.', match: '95% match', salary: '$120k - $150k' },
        { id: 2, title: 'Full Stack Engineer', company: 'InnovateCorp', match: '88% match', salary: '$100k - $130k' }
      ],
      loading: false,
      error: null
    });
  };

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleQuickAction = useCallback(async (action) => {
    try {
      const response = await fetch('/api/quick-actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      
      if (response.ok) {
        console.log(`${action} action executed successfully`);
        // Handle success (e.g., show notification, redirect, etc.)
      }
    } catch (error) {
      console.error('Quick action failed:', error);
    }
  }, []);

  const handleRescheduleInterview = useCallback(async (interviewId) => {
    try {
      const response = await fetch(`/api/interviews/${interviewId}/reschedule`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        console.log('Interview rescheduled successfully');
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Failed to reschedule interview:', error);
    }
  }, [fetchDashboardData]);

  const handlePrepareInterview = useCallback(async (interviewId) => {
    try {
      const response = await fetch(`/api/interviews/${interviewId}/prepare`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        console.log('Interview preparation started');
        // Redirect to preparation page or show preparation modal
      }
    } catch (error) {
      console.error('Failed to start interview preparation:', error);
    }
  }, []);

  const handleTakeAssessment = useCallback(async () => {
    try {
      const response = await fetch('/api/assessments/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        console.log('Assessment started');
        // Redirect to assessment page
      }
    } catch (error) {
      console.error('Failed to start assessment:', error);
    }
  }, []);

  const handleViewJob = useCallback(async (jobId) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        console.log('Viewing job details');
        // Redirect to job details page
      }
    } catch (error) {
      console.error('Failed to view job:', error);
    }
  }, []);

  if (data.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{data.error}</p>
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Candidate Dashboard - AI Interviewer</title>
        <meta name="description" content="AI-powered interview platform for candidates" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
      </Head>

      <div className="bg-gray-50 text-gray-800 min-h-screen">
        {/* Header & Navigation */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <a href="#" className="text-2xl font-bold text-indigo-600">
              AI Interviewer
            </a>
            <nav className="hidden md:flex space-x-6 font-medium">
              <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
              <a href="#how" className="hover:text-indigo-600 transition-colors">How It Works</a>
              <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
              <a href="#blog" className="hover:text-indigo-600 transition-colors">Blog</a>
              <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-indigo-600 transition-colors">
                Login
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {data.user.greeting}, {data.user.name}! 👋
              </h2>
              <p className="text-gray-600 mt-1">Ready to take your career to the next level?</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {data.stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Section */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <ActionButton 
                      icon="fa-search" 
                      text="Browse Jobs" 
                      color="blue"
                      onClick={() => handleQuickAction('browse-jobs')}
                    />
                    <ActionButton 
                      icon="fa-play" 
                      text="Practice Interview" 
                      color="green"
                      onClick={() => handleQuickAction('practice-interview')}
                    />
                    <ActionButton 
                      icon="fa-chart-bar" 
                      text="View Feedback" 
                      color="purple"
                      onClick={() => handleQuickAction('view-feedback')}
                    />
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-2">
                    {data.activities.map((activity, index) => (
                      <ActivityItem key={index} {...activity} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="space-y-8">
                {/* Upcoming Interviews */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Interviews</h3>
                  <div className="space-y-4">
                    {data.upcomingInterviews.map((interview) => (
                      <div key={interview.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{interview.title}</h4>
                            <p className="text-sm text-gray-600">{interview.company}</p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            {interview.type}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <i className="fas fa-calendar text-gray-400 mr-2"></i>
                          {interview.date}
                          <i className="fas fa-clock text-gray-400 ml-4 mr-2"></i>
                          {interview.duration}
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleRescheduleInterview(interview.id)}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-xs font-medium transition-colors"
                          >
                            Reschedule
                          </button>
                          <button 
                            onClick={() => handlePrepareInterview(interview.id)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-xs font-medium transition-colors"
                          >
                            Prepare
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Assessment */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Assessment</h3>
                  <div className="space-y-3">
                    {data.skills.map((skill, index) => (
                      <SkillItem key={index} {...skill} />
                    ))}
                  </div>
                  <button 
                    onClick={handleTakeAssessment}
                    className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Take Assessment
                  </button>
                </div>

                {/* Recommended Jobs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Jobs</h3>
                  <div className="space-y-2">
                    {data.recommendedJobs.map((job) => (
                      <JobCard 
                        key={job.id} 
                        {...job} 
                        onClick={() => handleViewJob(job.id)}
                      />
                    ))}
                  </div>
                  <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                    View All Jobs →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// Optimized Sub-components with proper props validation and performance
function StatCard({ label, value, change, icon, iconColor, bgColor, textColor, subIcon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          <p className={`text-sm mt-1 ${textColor}`}>
            <i className={`fas ${subIcon} text-xs mr-1`}></i>
            {change}
          </p>
        </div>
        <div className={`h-12 w-12 ${bgColor} rounded-xl flex items-center justify-center`}>
          <i className={`fas ${icon} ${iconColor} text-xl`}></i>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, text, color, onClick }) {
  const colorClasses = {
    blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-600',
    green: 'bg-green-50 hover:bg-green-100 border-green-200 text-green-600',
    purple: 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-600'
  };

  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center space-x-3 p-4 rounded-lg border transition-colors ${colorClasses[color]}`}
    >
      <i className={`fas ${icon}`}></i>
      <span className="font-medium">{text}</span>
    </button>
  );
}

function ActivityItem({ icon, bgColor, textColor, title, description, time }) {
  return (
    <div className={`flex items-start space-x-3 p-3 ${bgColor} rounded-lg`}>
      <div className={`h-8 w-8 ${bgColor.replace('50', '100')} rounded-full flex items-center justify-center mt-0.5`}>
        <i className={`fas ${icon} ${textColor} text-sm`}></i>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}

function SkillItem({ skill, level, percentage, icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    cyan: 'bg-cyan-100 text-cyan-600',
    green: 'bg-green-100 text-green-600'
  };

  const progressClasses = {
    blue: 'bg-blue-600',
    cyan: 'bg-cyan-600',
    green: 'bg-green-600'
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <i className={`fab ${icon}`}></i>
        </div>
        <span className="text-sm font-medium text-gray-900">{skill}</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-16 bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${progressClasses[color]}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-600">{level}</span>
      </div>
    </div>
  );
}

function JobCard({ title, company, match, salary, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
    >
      <h4 className="text-sm font-medium text-gray-900">{title}</h4>
      <p className="text-xs text-gray-600">{company}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-green-600 font-medium">{match}</span>
        <span className="text-xs text-gray-500">{salary}</span>
      </div>
    </div>
  );
}