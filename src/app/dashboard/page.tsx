"use client";

import { useRouter } from "next/navigation";
import { getToken, clearToken } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface JwtPayload {
  sub: number;
  username: string;
  role: string;
  exp: number;
  iat: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [showFull, setShowFull] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [role, setRole] = useState<string | null>(null);
  const token = getToken();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp * 1000 < Date.now()) {
        clearToken();
        router.push("/login");
        return;
      }

      setUsername(decoded.username || "Guest");
      setRole(decoded.role || null);
    } catch (e) {
      console.error("Token decoding failed:", e);
      clearToken();
      router.push("/login");
    }
  }, [token, router]);

  const cards = [
    { title: "Overview", desc: "Quick glance at your stats." },
    { title: "Settings", desc: "Manage your preferences." },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 p-6">
      {/* Greeting */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-8 text-blue-600 dark:text-blue-400"
      >
        Welcome, {username}
      </motion.h1>

      {/* Role Info */}
      {role && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 p-4 rounded-lg bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700"
        >
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Role: <span className="font-semibold">{role}</span>
          </p>
        </motion.div>
      )}

      {/* Token Display */}
      {token && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 p-4 rounded-lg bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700"
        >
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
            Your Bearer Token:
          </p>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <button
              onClick={() => setShowFull(!showFull)}
              className="text-xs px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-blue-600"
            >
              {showFull ? "Hide" : "Show full"}
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(token)}
              className="text-xs px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              Copy
            </button>
          </div>
          <motion.p
            key={showFull ? "full" : "short"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-100 text-neutral-800 dark:bg-gray-700 dark:text-neutral-200 p-3 rounded break-words text-xs w-full max-w-full"
          >
            {showFull ? token : `${token.slice(0, 40)}...`}
          </motion.p>
        </motion.div>
      )}

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="p-6 rounded-lg bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700 cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2 dark:text-white">
              {card.title}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Logout */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={() => {
          clearToken();
          router.push("/login");
        }}
        className="mt-8 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-medium shadow-md"
      >
        Logout
      </motion.button>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-10 text-neutral-500 dark:text-neutral-400 text-center"
      >
        More features coming soon…
      </motion.p>
    </div>
  );
}
