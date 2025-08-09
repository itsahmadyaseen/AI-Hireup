// /app/api/admin/dashboard/

import { NextResponse } from "next/server";
import { prisma } from "@/app/api/lib/db";
import { InterviewStatus } from "@prisma/client";
import { getLoggedInUser } from "@/app/api/lib/auth";

export async function GET() {
  // Authenticate user
  const user = await getLoggedInUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }
  
  try {
    const [
      totalUsers,
      totalCandidates,
      totalRecruiters,
      totalJobs,
      totalApplications,
      activeJobs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "candidate" } }),
      prisma.user.count({ where: { role: "recruiter" } }),
      prisma.job.count(),
      prisma.application.count(),
      prisma.job.count({ where: { status: "active" } }),
    ]);

    const interviewStats = await prisma.interview.groupBy({
      by: ["status"],
      _count: true,
    });

    const interviewSummary: Record<InterviewStatus, number> = {
      scheduled: 0,
      in_progress: 0,
      completed: 0,
      cancelled: 0,
    };

    for (const group of interviewStats) {
      interviewSummary[group.status] = group._count;
    }

    return NextResponse.json({
      totalUsers,
      totalCandidates,
      totalRecruiters,
      totalJobs,
      activeJobs,
      totalApplications,
      interviews: interviewSummary,
    });
  } catch (err) {
    console.error("Admin Dashboard Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
