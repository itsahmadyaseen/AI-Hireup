"use client";

import { useEffect, useState, useCallback, JSX } from "react";
import Head from "next/head";
import {
  FaFileAlt,
  FaVideo,
  FaChartLine,
  FaUserCircle,
  FaArrowUp,
  FaClock,
  FaStar,
  FaUser,
  FaSearch,
  FaPlay,
  FaChartBar,
  FaCheck,
  FaLightbulb,
  FaCalendar,
  FaJs,
  FaReact,
  FaNodeJs,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  DashboardData,
  StatCardProps,
  ActionButtonProps,
  ActivityItemProps,
  SkillItemProps,
  JobCardProps,
} from "../../../types/dashboard";

function CandidateDashboard(): JSX.Element {
  const [data, setData] = useState<DashboardData>({
    user: { name: "John", greeting: "Good morning" },
    stats: [],
    activities: [],
    upcomingInterviews: [],
    skills: [],
    recommendedJobs: [],
    loading: true,
    error: null,
  });

  const setMockData = useCallback((): void => {
    setData({
      user: { name: "John", greeting: "Good morning" },
      stats: [
        {
          label: "Applications",
          value: "12",
          change: "+2 this week",
          icon: <FaFileAlt />,
          iconColor: "text-blue-600",
          bgColor: "bg-blue-50",
          textColor: "text-green-600",
          subIcon: <FaArrowUp />,
        },
        {
          label: "Interviews",
          value: "3",
          change: "1 upcoming",
          icon: <FaVideo />,
          iconColor: "text-orange-600",
          bgColor: "bg-orange-50",
          textColor: "text-orange-600",
          subIcon: <FaClock />,
        },
        {
          label: "Average Score",
          value: "8.5",
          change: "Excellent",
          icon: <FaChartLine />,
          iconColor: "text-green-600",
          bgColor: "bg-green-50",
          textColor: "text-green-600",
          subIcon: <FaStar />,
        },
        {
          label: "Profile",
          value: "85%",
          change: "Complete",
          icon: <FaUserCircle />,
          iconColor: "text-purple-600",
          bgColor: "bg-purple-50",
          textColor: "text-blue-600",
          subIcon: <FaUser />,
        },
      ],
      activities: [
        {
          icon: <FaCheck />,
          bgColor: "bg-green-50",
          textColor: "text-green-600",
          title: "Interview completed",
          description: "Software Engineer at TechCorp - Score: 8.7/10",
          time: "2 hours ago",
        },
        {
          icon: <FaFileAlt />,
          bgColor: "bg-blue-50",
          textColor: "text-blue-600",
          title: "Feedback available",
          description: "Marketing Manager at StartupXYZ",
          time: "Yesterday",
        },
        {
          icon: <FaLightbulb />,
          bgColor: "bg-orange-50",
          textColor: "text-orange-600",
          title: "New job match",
          description: "Data Analyst at BigCorp - 95% match",
          time: "2 days ago",
        },
      ],
      upcomingInterviews: [
        {
          id: 1,
          title: "Frontend Developer",
          company: "WebCorp Technologies",
          date: "Tomorrow, 2:00 PM",
          duration: "30 mins",
          type: "AI Interview",
        },
      ],
      skills: [
        {
          skill: "JavaScript",
          level: "Expert",
          percentage: 90,
          icon: <FaJs />,
          color: "blue",
        },
        {
          skill: "React",
          level: "Advanced",
          percentage: 85,
          icon: <FaReact />,
          color: "cyan",
        },
        {
          skill: "Node.js",
          level: "Intermediate",
          percentage: 70,
          icon: <FaNodeJs />,
          color: "green",
        },
      ],
      recommendedJobs: [
        {
          id: 1,
          title: "Senior React Developer",
          company: "TechStart Inc.",
          match: "95% match",
          salary: "$120k - $150k",
        },
        {
          id: 2,
          title: "Full Stack Engineer",
          company: "InnovateCorp",
          match: "88% match",
          salary: "$100k - $130k",
        },
      ],
      loading: false,
      error: null,
    });
  }, []);

  function countChangeThisWeek(apps: any[]): string {
    // Count applications made in the current week
    const since = new Date();
    since.setDate(since.getDate() - 7);
    const count = apps.filter((a) => new Date(a.appliedAt) >= since).length;
    return `+${count} this week`;
  }

  function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }

  function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "short",
    });
  }

  const fetchDashboardData = useCallback(async (): Promise<void> => {
    try {
      setData((prev) => ({ ...prev, loading: true, error: null }));

      const response = await fetch("/api/candidate/dashboard");
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch data");
      }
      const apiData = await response.json();

      // Now map your API data to the DashboardData format expected by your UI
      setData({
        user: {
          name: "", // Optionally get this from your API/auth state
          greeting: getGreeting(),
        },
        stats: [
          {
            label: "Applications",
            value: `${apiData.myApplications.length}`,
            change: countChangeThisWeek(apiData.myApplications),
            icon: <FaFileAlt />,
            iconColor: "text-blue-600",
            bgColor: "bg-blue-50",
            textColor: "text-green-600",
            subIcon: <FaArrowUp />,
          },
          {
            label: "Interviews",
            value: `${
              apiData.myApplications.filter(
                (a: any) => a.interview && a.interview.status === "scheduled"
              ).length
            }`,
            change: `${
              apiData.myApplications.filter(
                (a: any) => a.interview && a.interview.status === "scheduled"
              ).length
            } upcoming`,
            icon: <FaVideo />,
            iconColor: "text-orange-600",
            bgColor: "bg-orange-50",
            textColor: "text-orange-600",
            subIcon: <FaClock />,
          },
          // ...add other stats as needed (like 'Average Score' if available, Profile completion%)
        ],
        activities: apiData.myApplications.slice(0, 3).map((app: any) => ({
          icon: <FaCheck />,
          bgColor: "bg-green-50",
          textColor: "text-green-600",
          title: `Applied to ${app.job.title}`,
          description: `at ${app.job.company}`,
          time: timeAgo(app.appliedAt),
        })),
        upcomingInterviews: apiData.myApplications
          .filter(
            (a: any) => a.interview && a.interview.status === "scheduled"
            // optionally filter past interviews
          )
          .map((a: any) => ({
            id: a.interview.id,
            title: a.job.title,
            company: a.job.company,
            date: formatDate(a.interview.scheduledAt), // make a util for this
            duration: "30 mins", // or get from backend if you store it
            type: "Interview", // or use your logic
          })),
        skills: [], // You likely need to call a skills API or fill with mock data for now.
        recommendedJobs: apiData.recentJobs.map((job: any) => ({
          id: job.id,
          title: job.title,
          company: job.company,
          match: "", // If you have match %, add here
          salary: "", // If you have salary, add here
        })),
        loading: false,
        error: null,
      });
    } catch (error) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }));
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleQuickAction = useCallback(
    async (action: string): Promise<void> => {
      console.log(`${action} action executed`);
    },
    []
  );

  const handleRescheduleInterview = useCallback(
    async (interviewId: number): Promise<void> => {
      console.log("Interview rescheduled:", interviewId);
    },
    []
  );

  const handlePrepareInterview = useCallback(
    async (interviewId: number): Promise<void> => {
      console.log("Interview preparation started for:", interviewId);
    },
    []
  );

  const handleTakeAssessment = useCallback(async (): Promise<void> => {
    console.log("Assessment started");
  }, []);

  const handleViewJob = useCallback(async (jobId: number): Promise<void> => {
    console.log("Viewing job:", jobId);
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
            <FaExclamationTriangle />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
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
        <meta
          name="description"
          content="AI-powered interview platform for candidates"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
      </Head>

      <div className="bg-gray-50 text-gray-800 min-h-screen">
        {/* Header & Navigation */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold text-indigo-600">
              AI Interviewer
            </div>
            <nav className="hidden md:flex space-x-6 font-medium">
              <button className="hover:text-indigo-600 transition-colors">
                About
              </button>
              <button className="hover:text-indigo-600 transition-colors">
                How It Works
              </button>
              <button className="hover:text-indigo-600 transition-colors">
                Pricing
              </button>
              <button className="hover:text-indigo-600 transition-colors">
                Blog
              </button>
              <button className="hover:text-indigo-600 transition-colors">
                Contact
              </button>
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
                {data.user.greeting} {data.user.name}!
              </h2>
              <p className="text-gray-600 mt-1">
                Ready to take your career to the next level?
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {data.stats.map((stat: StatCardProps, index: number) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Section */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <ActionButton
                      icon={<FaSearch />}
                      text="Browse Jobs"
                      color="blue"
                      onClick={() => handleQuickAction("browse-jobs")}
                    />
                    <ActionButton
                      icon={<FaPlay />}
                      text="Practice Interview"
                      color="green"
                      onClick={() => handleQuickAction("practice-interview")}
                    />
                    <ActionButton
                      icon={<FaChartBar />}
                      text="View Feedback"
                      color="purple"
                      onClick={() => handleQuickAction("view-feedback")}
                    />
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {data.activities.map(
                      (activity: ActivityItemProps, index: number) => (
                        <ActivityItem key={index} {...activity} />
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="space-y-8">
                {/* Upcoming Interviews
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Upcoming Interviews
                  </h3>
                  <div className="space-y-4">
                    {data.upcomingInterviews.map(
                      (interview: {
                        id: number;
                        title: string;
                        company: string;
                        date: string;
                        duration: string;
                        type: string;
                      }) => (
                        <div
                          key={interview.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">
                                {interview.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {interview.company}
                              </p>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              {interview.type}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <FaCalendar className="text-gray-400 mr-2" />
                            {interview.date}
                            <FaClock className="text-gray-400 ml-4 mr-2" />
                            {interview.duration}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleRescheduleInterview(interview.id)
                              }
                              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-xs font-medium transition-colors"
                            >
                              Reschedule
                            </button>
                            <button
                              onClick={() =>
                                handlePrepareInterview(interview.id)
                              }
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-xs font-medium transition-colors"
                            >
                              Prepare
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div> */}

              

                {/* Recommended Jobs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recommended Jobs
                  </h3>
                  <div className="space-y-3">
                    {data.recommendedJobs.map((job: { id: number }) => (
                      <JobCard
                        title={""}
                        company={""}
                        match={""}
                        salary={""}
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

// Helper function to render icons (both React icons and FontAwesome strings)
function renderIcon(
  icon: React.ReactNode | string,
  className?: string
): React.ReactNode {
  if (typeof icon === "string") {
    return <i className={`fas ${icon} ${className || ""}`}></i>;
  }
  return <span className={className}>{icon}</span>;
}

// Sub-components with proper typing
function StatCard({
  label,
  value,
  change,
  icon,
  iconColor,
  bgColor,
  textColor,
  subIcon,
}: StatCardProps): JSX.Element {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          <p className={`text-sm mt-1 flex items-center ${textColor}`}>
            <span className="mr-1 text-xs">{renderIcon(subIcon)}</span>
            {change}
          </p>
        </div>
        <div
          className={`h-12 w-12 ${bgColor} rounded-xl flex items-center justify-center ${iconColor}`}
        >
          <span className="text-xl">{renderIcon(icon)}</span>
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  text,
  color,
  onClick,
}: ActionButtonProps): JSX.Element {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-600",
    green: "bg-green-50 hover:bg-green-100 border-green-200 text-green-600",
    purple:
      "bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-600",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center space-x-3 p-4 rounded-lg border transition-colors ${colorClasses[color]}`}
    >
      <span className="text-lg">{renderIcon(icon)}</span>
      <span className="font-medium">{text}</span>
    </button>
  );
}

function ActivityItem({
  icon,
  bgColor,
  textColor,
  title,
  description,
  time,
}: ActivityItemProps): JSX.Element {
  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg">
      <div
        className={`h-8 w-8 ${bgColor} rounded-full flex items-center justify-center mt-0.5`}
      >
        <span className={`${textColor} text-sm`}>{renderIcon(icon)}</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}

function SkillItem({
  skill,
  level,
  percentage,
  icon,
  color,
}: SkillItemProps): JSX.Element {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-100 text-blue-600",
    cyan: "bg-cyan-100 text-cyan-600",
    green: "bg-green-100 text-green-600",
  };

  const progressClasses: Record<string, string> = {
    blue: "bg-blue-600",
    cyan: "bg-cyan-600",
    green: "bg-green-600",
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div
          className={`h-8 w-8 rounded-lg flex items-center justify-center ${colorClasses[color]}`}
        >
          <span className="text-sm">{renderIcon(icon)}</span>
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

function JobCard({
  title,
  company,
  match,
  salary,
  onClick,
}: JobCardProps): JSX.Element {
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

export default CandidateDashboard;
