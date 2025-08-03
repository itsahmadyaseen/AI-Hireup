'use client'

import Head from 'next/head'

export default function CandidateDashboard() {
  return (
    <>
      <Head>
        <title>Candidate Dashboard - AI Interviewer</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <main className="bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Good morning, John! 👋</h2>
            <p className="text-gray-600 mt-1">Ready to take your career to the next level?</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            <StatCard label="Applications" value="12" change="+2 this week" icon="fa-file-alt" iconColor="text-blue-600" bgColor="bg-blue-50" textColor="text-green-600" subIcon="fa-arrow-up" />
            <StatCard label="Interviews" value="3" change="1 upcoming" icon="fa-video" iconColor="text-orange-600" bgColor="bg-orange-50" textColor="text-orange-600" subIcon="fa-clock" />
            <StatCard label="Average Score" value="8.5" change="Excellent" icon="fa-chart-line" iconColor="text-green-600" bgColor="bg-green-50" textColor="text-green-600" subIcon="fa-star" />
            <StatCard label="Profile" value="85%" change="Complete" icon="fa-user-circle" iconColor="text-purple-600" bgColor="bg-purple-50" textColor="text-blue-600" subIcon="fa-user" />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <ActionButton icon="fa-search" text="Browse Jobs" color="blue" />
                  <ActionButton icon="fa-play" text="Practice Interview" color="green" />
                  <ActionButton icon="fa-chart-bar" text="View Feedback" color="purple" />
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <ActivityItem icon="fa-check" bgColor="bg-green-50" textColor="text-green-600" title="Interview completed" description="Software Engineer at TechCorp - Score: 8.7/10" time="2 hours ago" />
                <ActivityItem icon="fa-file-alt" bgColor="bg-blue-50" textColor="text-blue-600" title="Feedback available" description="Marketing Manager at StartupXYZ" time="Yesterday" />
                <ActivityItem icon="fa-lightbulb" bgColor="bg-orange-50" textColor="text-orange-600" title="New job match" description="Data Analyst at BigCorp - 95% match" time="2 days ago" />
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-8">
              {/* Upcoming Interviews */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Interviews</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Frontend Developer</h4>
                        <p className="text-sm text-gray-600">WebCorp Technologies</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        AI Interview
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <i className="fas fa-calendar text-gray-400 mr-2"></i>
                      Tomorrow, 2:00 PM
                      <i className="fas fa-clock text-gray-400 ml-4 mr-2"></i>
                      30 mins
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-xs font-medium transition-colors">
                        Reschedule
                      </button>
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-xs font-medium transition-colors">
                        Prepare
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Assessment */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Assessment</h3>
                <SkillItem skill="JavaScript" level="Expert" percentage="90%" icon="fa-js-square" color="blue" />
                <SkillItem skill="React" level="Advanced" percentage="85%" icon="fa-react" color="cyan" />
                <SkillItem skill="Node.js" level="Intermediate" percentage="70%" icon="fa-node-js" color="green" />
                <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors">Take Assessment</button>
              </div>

              {/* Recommended Jobs */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Jobs</h3>
                <JobCard title="Senior React Developer" company="TechStart Inc." match="95% match" salary="$120k - $150k" />
                <JobCard title="Full Stack Engineer" company="InnovateCorp" match="88% match" salary="$100k - $130k" />
                <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">View All Jobs →</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

function StatCard({ label, value, change, icon, iconColor, bgColor, textColor, subIcon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          <p className={`text-sm mt-1 ${textColor}`}>
            <i className={`fas ${subIcon} text-xs`}></i> {change}
          </p>
        </div>
        <div className={`h-12 w-12 ${bgColor} rounded-xl flex items-center justify-center`}>
          <i className={`fas ${icon} ${iconColor} text-xl`}></i>
        </div>
      </div>
    </div>
  )
}

function ActionButton({ icon, text, color }) {
  return (
    <button className={`flex items-center justify-center space-x-3 p-4 bg-${color}-50 hover:bg-${color}-100 rounded-lg border border-${color}-200 transition-colors`}>
      <i className={`fas ${icon} text-${color}-600`}></i>
      <span className={`text-${color}-700 font-medium`}>{text}</span>
    </button>
  )
}

function ActivityItem({ icon, bgColor, textColor, title, description, time }) {
  return (
    <div className={`flex items-start space-x-3 p-3 ${bgColor} rounded-lg mb-2`}>
      <div className={`h-8 w-8 ${bgColor.replace('50', '100')} rounded-full flex items-center justify-center mt-0.5`}>
        <i className={`fas ${icon} ${textColor} text-sm`}></i>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  )
}

function SkillItem({ skill, level, percentage, icon, color }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-3">
        <div className={`h-8 w-8 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <i className={`fab ${icon} text-${color}-600`}></i>
        </div>
        <span className="text-sm font-medium text-gray-900">{skill}</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-16 bg-gray-200 rounded-full h-2">
          <div className={`bg-${color}-600 h-2 rounded-full`} style={{ width: percentage }}></div>
        </div>
        <span className="text-sm text-gray-600">{level}</span>
      </div>
    </div>
  )
}

function JobCard({ title, company, match, salary }) {
  return (
    <div className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer mb-2">
      <h4 className="text-sm font-medium text-gray-900">{title}</h4>
      <p className="text-xs text-gray-600">{company}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-green-600 font-medium">{match}</span>
        <span className="text-xs text-gray-500">{salary}</span>
      </div>
    </div>
  )
}
