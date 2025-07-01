"use client";

import Link from "next/link";
import { useTheme } from "@/app/context/ThemeProvider";
import { Button } from "./Button";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full px-6 py-4 bg-white dark:bg-gray-900 shadow-md flex items-center justify-between">
      <Link
        href="/users"
        className="text-xl font-bold text-blue-600 dark:text-blue-400"
      >
        UserApp
      </Link>

      <div className="flex items-center gap-4">
        <Button
          title="Tema"
          onClick={toggleTheme}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {theme === "dark" ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
        </Button>
      </div>
    </nav>
  );
}
