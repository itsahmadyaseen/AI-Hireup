import { NextResponse } from "next/server";
import { prisma } from "@/app/api/lib/db";
import { getLoggedInUser } from "@/app/api/lib/auth";

// Recruiter Dashboard
export async function GET() {
  try {
    const user = await getLoggedInUser();
    
    if (!user || user.role !== "recruiter") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    const recruiterId = Number(user.userId);

    const jobs = await prisma.job.findMany({
      where: {
        recruiterId,
      },
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        applicationDeadline: true,
        applications: {
          select: {
            id: true,
            status: true,
            candidate: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            interview: {
              select: {
                id: true,
                scheduledAt: true,
                status: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Add applicationCount to each job
    const jobsWithAppCount = jobs.map((job) => ({
      ...job,
      applicationCount: job.applications.length,
    }));

    // Total applications across all jobs
    const totalApplications = jobsWithAppCount.reduce(
      (sum, job) => sum + job.applicationCount,
      0
    );

    return NextResponse.json({
      totalApplications,
      jobs: jobsWithAppCount,
    });
  } catch (error) {
    console.error("Error in recruiter dashboard:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
