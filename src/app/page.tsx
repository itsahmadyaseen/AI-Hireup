"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Get "auth" cookie from document.cookie
    const rawAuth = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth="))
      ?.split("=")[1];

    if (!rawAuth) {
      router.push("/login");
      return;
    }

    try {
      // Step 1: URL decode the value
      const decodedAuth = decodeURIComponent(rawAuth);

      // Step 2: Parse JSON
      const payload = JSON.parse(decodedAuth);

      console.log("From cookie JSON:", payload.role);

      // Step 3: Decode JWT
      const jwtData = jwtDecode(payload.token);
      console.log("From JWT:", jwtData.role);

      // Example: redirect based on role
      router.push(`/dashboard/${payload.role}`);
    } catch (err) {
      console.error("Invalid cookie format:", err);
      router.push("/login");
    }
  }, [router]);

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
        <p className="mt-4 text-white text-lg">Loading AI-HIREUP...</p>
      </div>
    </div>
  );
}
