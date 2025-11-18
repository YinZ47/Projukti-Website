"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

type Props = {
  embedded?: boolean
}

export default function ThemeToggle({ embedded = false }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = (typeof window !== "undefined" && localStorage.getItem("site-theme")) as
      | "light"
      | "dark"
      | null
    const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = (savedTheme as any) || (prefersDark ? "dark" : "light")

    setTheme(initialTheme)
    if (typeof document !== "undefined") {
      if (initialTheme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    if (typeof window !== "undefined") localStorage.setItem("site-theme", newTheme)
    if (typeof document !== "undefined") {
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }

  if (!mounted) return null

  const wrapperClass = embedded
    ? "relative flex items-center"
    : "fixed top-4 right-4 z-[70] flex items-center"

  return (
    <div className={wrapperClass}>
      <button
        onClick={toggleTheme}
        className="group relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:scale-105"
        style={{
          background: theme === "dark" 
            ? "linear-gradient(135deg, #00ffff 0%, #00d4ff 100%)"
            : "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)",
          boxShadow: theme === "dark"
            ? "0 0 12px rgba(0, 255, 255, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)"
            : "0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.3)"
        }}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        aria-pressed={theme === "dark"}
      >
        {/* Track glow effect for dark mode */}
        {theme === "dark" && (
          <span className="absolute inset-0 rounded-full opacity-60 blur-sm bg-gradient-to-r from-cyan-400 to-blue-400" />
        )}
        
        {/* Sliding knob with icon */}
        <span
          className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            transform: theme === "dark" ? "translateX(22px)" : "translateX(2px)",
            boxShadow: theme === "dark"
              ? "0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 255, 255, 0.2)"
              : "0 2px 4px rgba(0, 0, 0, 0.2)"
          }}
        >
          {theme === "dark" ? (
            <Moon className="h-3 w-3 text-slate-700 transition-transform duration-300 group-hover:rotate-12" strokeWidth={2.5} />
          ) : (
            <Sun className="h-3 w-3 text-amber-500 transition-transform duration-300 group-hover:rotate-90" strokeWidth={2.5} />
          )}
        </span>

        {/* Hover glow enhancement */}
        <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
          style={{
            background: theme === "dark"
              ? "radial-gradient(circle at center, rgba(0, 255, 255, 0.2) 0%, transparent 70%)"
              : "radial-gradient(circle at center, rgba(148, 163, 184, 0.15) 0%, transparent 70%)"
          }}
        />
      </button>
    </div>
  )
}
