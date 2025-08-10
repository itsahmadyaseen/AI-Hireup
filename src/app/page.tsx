"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedUser && token) {
      const user = JSON.parse(storedUser);
      router.push(`/dashboard/${user.role}`);
    } else {
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
