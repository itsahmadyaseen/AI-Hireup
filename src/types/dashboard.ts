export interface User {
  name: string;
  greeting: string;
}

export interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode | string;
  iconColor: string;
  bgColor: string;
  textColor: string;
  subIcon: React.ReactNode | string;
}

export interface ActivityItemProps {
  icon: React.ReactNode | string;
  bgColor: string;
  textColor: string;
  title: string;
  description: string;
  time: string;
}

export interface Interview {
  id: number;
  title: string;
  company: string;
  date: string;
  duration: string;
  type: string;
}

export interface SkillItemProps {
  skill: string;
  level: string;
  percentage: number;
  icon: React.ReactNode | string;
  color: 'blue' | 'cyan' | 'green';
}

export interface Job {
  id: number;
  title: string;
  company: string;
  match: string;
  salary: string;
}

export interface DashboardData {
  user: User;
  stats: StatCardProps[];
  activities: ActivityItemProps[];
  upcomingInterviews: Interview[];
  skills: SkillItemProps[];
  recommendedJobs: Job[];
  loading: boolean;
  error: string | null;
}

export interface ActionButtonProps {
  icon: React.ReactNode | string;
  text: string;
  color: 'blue' | 'green' | 'purple';
  onClick: () => void;
}

export interface JobCardProps extends Job {
  onClick: () => void;
}
