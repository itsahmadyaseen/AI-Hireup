// /api/recruiter/interviews

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth";

// Get all interviews scheduled by current user
export async function GET(req: NextRequest) {
  try {
    const user = await getLoggedInUser();
    if (!user || user.role !== "recruiter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const interviews = await prisma.interview.findMany({
      where: {
        recruiterId: Number(user.userId),
      },
      include: {
        application: {
          include: {
            candidate: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            job: { select: { id: true, title: true, company: true } },
          },
        },
        // questions: true,
        // answers: true,
      },
      orderBy: { scheduledAt: "desc" },
    });

    return NextResponse.json({ interviews });
  } catch (error) {
    console.error("Error fetching recruiter interviews:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
