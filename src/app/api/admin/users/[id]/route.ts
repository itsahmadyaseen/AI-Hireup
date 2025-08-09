//  /api/admin/user/[id]

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/lib/db";
import { getLoggedInUser } from "@/app/api/lib/auth";

// Get details of a user
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Authenticate user
  const user = await getLoggedInUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    const userId = parseInt(params.id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
        jobs: {
          select: {
            id: true,
            title: true,
            createdAt: true,
            _count: { select: { applications: true } },
          },
        },
        applications: {
          select: {
            id: true,
            status: true,
            appliedAt: true,
            job: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        interviews: {
          select: {
            id: true,
            status: true,
            scheduledAt: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
