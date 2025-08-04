// /api/jobs

import { getLoggedInUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// Get all the jobs with application count
export async function GET() {
  try {
    // Authenticate user
    const user = await getLoggedInUser();
    if (!user) {
      return NextResponse.json(
        { error: "User not logged in" },
        { status: 401 }
      );
    }

    const jobs = await prisma.job.findMany({
      where: {
        status: "active", // optional: only active jobs
      },
      select: {
        id: true,
        title: true,
        description: true,
        skillsRequired: true,
        salary: true,
        company: true,
        applicationDeadline: true,
        createdAt: true,
        _count: {
          select: {
            applications: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("[GET_JOBS_WITH_APPLICANT_COUNT]", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
