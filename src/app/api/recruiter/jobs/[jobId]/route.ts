import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth";

// Get detailed view of a job by recruiter
export async function GET({ params }: { params: { jobId: string } }) {
  try {
    const user = await getLoggedInUser();
    if (!user || user.role !== "recruiter") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    const recruiterId = Number(user.userId);
    const jobId = Number(params.jobId);

    // Fetch job with applications
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        recruiterId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        applicationDeadline: true,
        status: true,
        createdAt: true,
        applications: {
          select: {
            id: true,
            status: true,
            resumeUrl: true,
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
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Add application count
    const applicationCount = job.applications.length;

    return NextResponse.json({
      ...job,
      applicationCount,
    });
  } catch (error) {
    console.error("Error fetching job detail:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
