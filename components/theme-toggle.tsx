"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

type Props = {
  embedded?: boolean
}

export default function ThemeToggle({ embedded = false }: Props) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark" || (theme === "system" && resolvedTheme === "dark")

  const wrapperClass = embedded
    ? "relative flex items-center"
    : "fixed top-4 right-4 z-[70] flex items-center"

  return (
    <div className={wrapperClass}>
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="group relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:scale-105"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #00ffff 0%, #00d4ff 100%)"
            : "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)",
          boxShadow: isDark
            ? "0 0 12px rgba(0, 255, 255, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)"
            : "0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.3)"
        }}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        aria-pressed={isDark}
      >
        {isDark && (
          <span className="absolute inset-0 rounded-full opacity-60 blur-sm bg-gradient-to-r from-cyan-400 to-blue-400" />
        )}
        <span
          className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            transform: isDark ? "translateX(22px)" : "translateX(2px)",
            boxShadow: isDark
              ? "0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 255, 255, 0.2)"
              : "0 2px 4px rgba(0, 0, 0, 0.2)"
          }}
        >
          {isDark ? (
            <Moon className="h-3 w-3 text-slate-700 transition-transform duration-300 group-hover:rotate-12" strokeWidth={2.5} />
          ) : (
            <Sun className="h-3 w-3 text-amber-500 transition-transform duration-300 group-hover:rotate-90" strokeWidth={2.5} />
          )}
        </span>
        <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: isDark
              ? "radial-gradient(circle at center, rgba(0, 255, 255, 0.2) 0%, transparent 70%)"
              : "radial-gradient(circle at center, rgba(148, 163, 184, 0.15) 0%, transparent 70%)"
          }}
        />
      </button>
    </div>
  )
}

