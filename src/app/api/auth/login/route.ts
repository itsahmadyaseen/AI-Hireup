import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/lib/db";
import { verifyPassword, generateToken } from "@/app/api/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user.id, user.role, user.email);

    // Return minimal safe user info
    const response = NextResponse.json(
      {
        message: "Login successful",
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    const payload = {
      token,
      role: user.role,
    };

    response.cookies.set({
      name: "auth",
      value: JSON.stringify(payload),
      // httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // sameSite: "lax",
      // path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
