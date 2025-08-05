import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth";

export async function GET() {
  try {
    // Authenticate user and ensure candidate access
    const user = await getLoggedInUser();
    if (!user || user.role !== "candidate") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    const candidateId = Number(user.userId);

    // All applications by this candidate
    const myApplications = await prisma.application.findMany({
      where: { candidateId },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            company: true,
            applicationDeadline: true,
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
      orderBy: {
        appliedAt: "desc",
      },
    });

    // Applications that are accepted (shortlisted or interview_scheduled)
    const acceptedApplications = myApplications.filter((app) =>
      ["shortlisted", "interview_scheduled"].includes(app.status)
    );

    // Recent job postings (active, not expired, and NOT already applied to)
    const recentJobs = await prisma.job.findMany({
      where: {
        status: "active",
        applicationDeadline: {
          gt: new Date(),
        },
        applications: {
          none: {
            candidateId,
          },
        },
      },
      select: {
        id: true,
        title: true,
        company: true,
        applicationDeadline: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    // Combined response
    return NextResponse.json({
      myApplications,
      acceptedApplications,
      recentJobs,
    });
  } catch (error) {
    console.error("Error in candidate dashboard:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
