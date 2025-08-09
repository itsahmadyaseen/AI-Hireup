// /api/recruiter/interviews/[applicationId]


import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: { applicationId: string } }
) {
  try {
    const user = await getLoggedInUser();
    if (!user || user.role !== "recruiter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applicationId = parseInt(params.applicationId, 10);
    const { scheduledAt, mode } = await req.json();

    if (!scheduledAt) {
      return NextResponse.json(
        { error: "scheduledAt is required" },
        { status: 400 }
      );
    }

    // Check if application exists and belongs to this recruiter
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { job: true },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    if (application.job.recruiterId !== Number(user.userId)) {
      return NextResponse.json(
        { error: "Not your job posting" },
        { status: 403 }
      );
    }

    // Check if interview already exists (applicationId is unique)
    const existingInterview = await prisma.interview.findUnique({
      where: { applicationId },
    });

    if (existingInterview) {
      return NextResponse.json(
        { error: "Interview already scheduled for this application" },
        { status: 400 }
      );
    }

    // Create Interview
    const interview = await prisma.interview.create({
      data: {
        scheduledAt: new Date(scheduledAt),
        mode: mode || "video",
        application: { connect: { id: applicationId } },
        recruiter: { connect: { id: Number(user.userId) } },
      },
      include: {
        application: {
          include: { candidate: true, job: true },
        },
        recruiter: true,
      },
    });

    // Update application status
    await prisma.application.update({
      where: { id: applicationId },
      data: { status: "interview_scheduled" },
    });

    return NextResponse.json({ interview }, { status: 201 });
  } catch (error) {
    console.error("Error scheduling interview:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
