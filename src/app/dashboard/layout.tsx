"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getToken, logoutUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [tokenValue, setTokenValue] = useState<string | null>(null);

  // Check token on mount
  useEffect(() => {
    const t = getToken();
    if (!t) {
      router.push("/login");
    } else {
      setTokenValue(t);
    }
  }, [router]);

  // Logout handler
  function handleLogout() {
    logoutUser();
    router.push("/login");
  }

  // Dark mode toggle
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  // Navigation items (Reports removed)
  const navItems = [
    { label: "Overview", href: "/dashboard" },
    { label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-white dark:bg-neutral-800 
        border-r dark:border-neutral-700 p-6 transition-transform 
        ${mobileOpen ? "translate-x-0" : "-translate-x-64"} 
        md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Dashboard</h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`px-3 py-2 rounded-lg text-left transition ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Dark Mode Toggle */}
        <div className="mt-10 flex gap-3">
          <Button
            onClick={() => setDark(!dark)}
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            {dark ? "Light" : "Dark"} Mode
          </Button>
        </div>

        {/* Logout */}
        <div className="mt-4">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Top Bar */}
      <header className="md:hidden w-full fixed top-0 left-0 bg-white dark:bg-neutral-800 border-b dark:border-neutral-700 p-4 flex items-center justify-between z-30">
        <button onClick={() => setMobileOpen(true)}>
          <Menu size={28} className="dark:text-white" />
        </button>

        <h2 className="text-lg font-semibold dark:text-white">Dashboard</h2>

        <div className="w-8"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 mt-14 md:mt-0">{children}</main>
    </div>
  );
}
