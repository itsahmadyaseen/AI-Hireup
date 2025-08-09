// /app/api/recruiter/jobs/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth";

// Create job
export async function POST(req: NextRequest) {
  // Authenticate and extract user
  const user = await getLoggedInUser();

  // Handle authentication errors
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Only recruiters are allowed to create jobs
  if (user.role !== "recruiter") {
    return NextResponse.json(
      { error: "Access denied: Recruiters only" },
      { status: 403 }
    );
  }

  const {
    title,
    description,
    skillsRequired,
    company,
    salary,
    applicationDeadline,
  } = await req.json();

  // Validate required fields
  if (
    !title ||
    !description ||
    !skillsRequired ||
    !company ||
    !salary ||
    !applicationDeadline
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Create job entry in database
  const job = await prisma.job.create({
    data: {
      title,
      description,
      skillsRequired,
      salary: parseInt(salary),
      company,
      applicationDeadline: new Date(applicationDeadline),
      recruiter: {
        connect: { id: parseInt(user.userId) },
      },
    },
  });

  return NextResponse.json(
    { message: "Job created successfully", job },
    { status: 201 }
  );
}

// Get all jobs posted by current recruiter
export async function GET() {
  try {
    const user = await getLoggedInUser();

    if (!user || user.role !== "recruiter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const jobs = await prisma.job.findMany({
      where: {
        recruiterId: parseInt(user.userId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // console.log(jobs);

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("[GET_JOBS_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Delete job posted by current recruiter
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    if (!jobId || isNaN(Number(jobId))) {
      return NextResponse.json(
        { error: "Invalid or missing jobId" },
        { status: 400 }
      );
    }

    const user = await getLoggedInUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "recruiter") {
      return NextResponse.json(
        { error: "Access denied: Recruiters only" },
        { status: 403 }
      );
    }

    const job = await prisma.job.findUnique({
      where: { id: parseInt(jobId) },
    });

    if (!job || job.recruiterId !== parseInt(user.userId)) {
      return NextResponse.json(
        { error: "Job not found or access denied" },
        { status: 404 }
      );
    }

    await prisma.job.delete({
      where: { id: parseInt(jobId) },
    });

    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DELETE_JOB_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Update job posted by current recruiter
export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    // Validate jobId
    if (!jobId || isNaN(Number(jobId))) {
      return NextResponse.json(
        { error: "Invalid or missing jobId" },
        { status: 400 }
      );
    }

    const user = await getLoggedInUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "recruiter") {
      return NextResponse.json(
        { error: "Access denied: Recruiters only" },
        { status: 403 }
      );
    }

    // Parse updated fields from request body
    const { title, description, skillsRequired, salary, applicationDeadline } =
      await req.json();

    // Find the job and verify ownership
    const existingJob = await prisma.job.findUnique({
      where: { id: parseInt(jobId) },
    });

    if (!existingJob || existingJob.recruiterId !== parseInt(user.userId)) {
      return NextResponse.json(
        { error: "Job not found or access denied" },
        { status: 404 }
      );
    }

    // Update the job
    const updatedJob = await prisma.job.update({
      where: { id: parseInt(jobId) },
      data: {
        title,
        description,
        skillsRequired,
        salary: salary ? parseInt(salary) : undefined,
        applicationDeadline: applicationDeadline
          ? new Date(applicationDeadline)
          : undefined,
      },
    });

    return NextResponse.json(
      { message: "Job updated successfully", job: updatedJob },
      { status: 200 }
    );
  } catch (error) {
    console.error("[UPDATE_JOB_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
