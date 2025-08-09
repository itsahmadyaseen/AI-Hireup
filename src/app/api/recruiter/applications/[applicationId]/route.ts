import { getLoggedInUser } from "@/app/api/lib/auth";
import { prisma } from "@/app/api/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Get detailed view of an application
export async function GET(
  request: NextRequest,
  { params }: { params: { applicationId: string } }
) {
  try {
    const user = await getLoggedInUser();
    if (!user || user.role !== "recruiter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const applicationId = Number(params.applicationId);
    if (isNaN(applicationId)) {
      return NextResponse.json(
        { error: "Invalid Application ID" },
        { status: 400 }
      );
    }

    // Fetch application with related data
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        candidate: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        job: {
          select: {
            title: true,
            company: true,
            description: true,
            skillsRequired: true,
            salary: true,
          },
        },
        interview: {
          select: {
            scheduledAt: true,
            status: true,
            feedback: true,
            aiFluencyScore: true,
            aiTone: true,
            aiFillerWords: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Ensure the application belongs to a job posted by this recruiter
    const job = await prisma.job.findUnique({
      where: { id: application.jobId },
      select: { recruiterId: true },
    });

    if (job?.recruiterId !== Number(user.userId)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(application);
  } catch (err) {
    console.error("Error fetching application detail:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
