"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#2a2a2a] text-white">
      <h1 className="text-2xl font-semibold tracking-wide">
        Opening login.....
      </h1>
    </div>
  );
}
