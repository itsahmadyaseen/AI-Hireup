import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

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
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth")?.value;

  if (!authCookie) return null;

  try {
    // parse

    const { token, role } = JSON.parse(authCookie);

    if (!token) return null;

    // Verify token
    const user = verifyToken(token);

    // Attach role from cookie (you could also get it from JWT if stored there)
    return { ...user, role };
  } catch (err) {
    console.error("Invalid auth cookie:", err);
    return null;
  }
}
