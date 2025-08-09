// /app/api/candidate/interviews/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/lib/db";
import { getLoggedInUser } from "@/app/api/lib/auth"; // adjust path to your auth options

export async function GET(req: NextRequest) {
  try {
    const user = await getLoggedInUser();

    if (!user || user.role !== "candidate") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const candidateId = Number(user.userId);

    const interviews = await prisma.interview.findMany({
      where: {
        application: {
          candidateId: candidateId,
        },
      },
      include: {
        application: {
          include: {
            job: true, // candidate can see job details
          },
        },
        recruiter: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        questions: true,
        answers: true,
      },
      orderBy: {
        scheduledAt: "asc",
      },
    });

    return NextResponse.json(interviews);
  } catch (error) {
    console.error("Error fetching candidate interviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch interviews" },
      { status: 500 }
    );
  }
}
