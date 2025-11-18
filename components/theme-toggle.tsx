"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

type Props = {
  embedded?: boolean
}

export default function ThemeToggle({ embedded = false }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    const savedTheme = (typeof window !== "undefined" && localStorage.getItem("site-theme")) as
      | "light"
      | "dark"
      | null
    const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = (savedTheme as any) || (prefersDark ? "dark" : "light")

    setTheme(initialTheme)
    if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    if (typeof window !== "undefined") localStorage.setItem("site-theme", newTheme)
    if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const wrapperClass = embedded
    ? "relative flex items-center gap-3"
    : "fixed top-4 right-4 z-[70] flex items-center gap-3"

  const pillClass = `relative inline-flex h-8 w-20 items-center rounded-full p-1 transition-all duration-300 ${
    theme === "dark" ? "bg-primary" : "bg-muted"
  }`

  const knobClass = `inline-block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-300 ${
    theme === "dark" ? "translate-x-3" : "translate-x-0"
  }`

  return (
    <div className={wrapperClass} aria-hidden={false}>
      <span className="text-sm text-muted-foreground hidden sm:block">Light</span>

      <button
        aria-pressed={theme === "dark"}
        onClick={toggleTheme}
        className={pillClass}
        aria-label="Toggle color theme"
      >
        <span className={knobClass} />
      </button>

      <span className="text-sm text-muted-foreground hidden sm:block">Dark</span>
    </div>
  )
}
