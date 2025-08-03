import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth";

// Get all applications for jobs posted by current recruiter
export async function GET() {
  try {
    // Authenticate recruiter
    const user = await getLoggedInUser();
    if (!user || user.role !== "recruiter") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    const recruiterId = Number(user.userId);

    // Get all applications for jobs posted by this recruiter
    const applications = await prisma.application.findMany({
      where: {
        job: {
          recruiterId: recruiterId,
        },
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            company: true,
          },
        },
        candidate: {
          select: {
            id: true,
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
      orderBy: {
        appliedAt: "desc",
      },
    });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Error fetching recruiter applications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
