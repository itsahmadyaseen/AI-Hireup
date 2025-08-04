import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

interface JwtPayload {
  userId: string;
  role: string;
  email?: string;
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(
  userId: string,
  role: string,
  email?: string
): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const payload: JwtPayload = { userId, role };
  if (email) payload.email = email;

  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function getLoggedInUser() {
  const cookieStore = await cookies(); // no await needed here
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    return verifyToken(token);
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
