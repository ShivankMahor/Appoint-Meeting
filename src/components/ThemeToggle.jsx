'use client'
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, changeTheme } = useTheme();

  return (
    <div className="flex gap-2 items-center p-2">
      <button
        onClick={() => changeTheme("light")}
        className={`px-3 py-1 rounded ${theme === "light" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Light
      </button>
      <button
        onClick={() => changeTheme("dark")}
        className={`px-3 py-1 rounded ${theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Dark
      </button>
      <button
        onClick={() => changeTheme("system")}
        className={`px-3 py-1 rounded ${theme === "system" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        System
      </button>
    </div>
  );
}
