// /api/jobs/[jobId]

import { getLoggedInUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Get a detailed view of job by any user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Authenticate user
  const user = await getLoggedInUser();
  if (!user) {
    return NextResponse.json({ error: "User not logged in" }, { status: 401 });
  }

  try {
    const jobId = parseInt(params.id);

    if (isNaN(jobId)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: {
        id: true,
        title: true,
        description: true,
        skillsRequired: true,
        salary: true,
        status: true,
        applicationDeadline: true,
        createdAt: true,
        company: true,
        recruiter: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.error("[JOB_DETAIL_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching job details" },
      { status: 500 }
    );
  }
}
