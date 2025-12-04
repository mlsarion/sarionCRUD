"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { saveToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { API_BASE } from "@/lib/config";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.accessToken) {
        setError(data.message || "Invalid username or password");
        setLoading(false);
        return;
      }

      saveToken(data.accessToken);
      console.log("✅ JWT Token:", data.accessToken);

      try {
        const payload = JSON.parse(atob(data.accessToken.split(".")[1]));
        console.log("🔍 Token payload:", payload);
      } catch {
        console.warn("Could not decode JWT payload");
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>

      <Card className="w-full max-w-md p-8 rounded-2xl border border-indigo-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-xl">
        <CardContent>
          <h1 className="text-4xl font-bold mb-6 text-center text-indigo-700 dark:text-indigo-400 tracking-wide">
            Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-lg bg-indigo-50 dark:bg-neutral-800 border border-indigo-200 dark:border-neutral-700 text-indigo-900 dark:text-white placeholder-indigo-400 dark:placeholder-neutral-400 focus:border-indigo-500 focus:ring-indigo-500/40 focus:ring-2"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg bg-indigo-50 dark:bg-neutral-800 border border-indigo-200 dark:border-neutral-700 text-indigo-900 dark:text-white placeholder-indigo-400 dark:placeholder-neutral-400 focus:border-indigo-500 focus:ring-indigo-500/40 focus:ring-2"
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium py-2 transition-transform hover:scale-[1.03]"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Button
            variant="link"
            className="mt-4 w-full text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
            onClick={() => router.push("/register")}
          >
            Create an account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
