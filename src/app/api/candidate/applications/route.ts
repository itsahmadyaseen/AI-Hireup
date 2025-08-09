import { prisma } from "@/app/api/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/app/api/lib/auth";
import { uploadToCloudinary } from "@/app/api/lib/cloudinary";

// Apply for a job 
export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const user = await getLoggedInUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only candidates can apply
    if (user.role !== "candidate") {
      return NextResponse.json(
        { error: "Access denied: Candidates only" },
        { status: 403 }
      );
    }

    // Parse multipart form data
    const formData = await req.formData();
    const jobId = formData.get("jobId")?.toString();
    const resumeFile = formData.get("resume") as File | null;

    if (!jobId || !resumeFile) {
      return NextResponse.json(
        { error: "Missing jobId or resume file" },
        { status: 400 }
      );
    }

    // Check if job exists
    const job = await prisma.job.findUnique({
      where: { id: parseInt(jobId) },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Prevent applying after deadline
    if (new Date(job.applicationDeadline) < new Date()) {
      return NextResponse.json(
        { error: "Application deadline has passed" },
        { status: 400 }
      );
    }

    // Prevent duplicate applications
    const existing = await prisma.application.findFirst({
      where: {
        candidateId: parseInt(user.userId),
        jobId: parseInt(jobId),
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You have already applied to this job" },
        { status: 400 }
      );
    }

    // Upload resume to Cloudinary
    const resumeUrl = await uploadToCloudinary(resumeFile);

    // Create application
    const application = await prisma.application.create({
      data: {
        candidate: { connect: { id: parseInt(user.userId) } },
        job: { connect: { id: parseInt(jobId) } },
        resumeUrl,
      },
    });

    return NextResponse.json(
      { message: "Application submitted successfully", application },
      { status: 201 }
    );
  } catch (error) {
    console.error("[APPLY_JOB_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Get all applications of a candidate
export async function GET() {
  try {

    const user = await getLoggedInUser() 
    if (!user || user.role !== 'candidate') {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 })
    }

    const candidateId = Number(user.userId)

    // Fetch all applications belonging to the logged-in candidate
    const applications = await prisma.application.findMany({
      where: {
        candidateId: candidateId,
      },
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
        appliedAt: 'desc',
      },
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error fetching candidate applications:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
