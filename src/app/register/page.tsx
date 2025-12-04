"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { API_BASE } from "@/lib/config";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch (err) {
      console.error("Register error:", err);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-purple-100 via-pink-200 to-red-300 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>

      <Card className="w-full max-w-md p-8 rounded-2xl border border-pink-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-xl">
        <CardContent>
          <h1 className="text-4xl font-bold mb-6 text-center text-pink-700 dark:text-pink-400 tracking-wide">
            Create Account
          </h1>

          <form onSubmit={handleRegister} className="space-y-5">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button
              className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium py-2 transition-transform hover:scale-[1.03]"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <Button
            variant="link"
            className="mt-4 w-full text-sm text-pink-600 dark:text-pink-400 hover:text-pink-500 dark:hover:text-pink-300"
            onClick={() => router.push("/login")}
          >
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
