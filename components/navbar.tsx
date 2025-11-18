"use client"

import { useState, useEffect } from "react"
import ThemeToggle from "./theme-toggle"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ["home", "about", "projects", "contact"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent",
      )}
    >
      <nav className="container mx-auto px-4 py-1.5 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("home")}
          className="font-mono text-lg font-bold text-primary hover:text-accent transition-colors"
        >
          {"<AAA />"}
        </button>

        <div className="flex items-center gap-6">
          {["home", "about", "projects", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={cn(
                "font-mono text-sm capitalize transition-colors relative group hidden md:block",
                activeSection === section
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {section}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all",
                  activeSection === section ? "w-full" : "w-0 group-hover:w-full",
                )}
              />
            </button>
          ))}

          <div className="relative z-60">
            {/* embed the toggle inside navbar so it won't be overlapped; hidden on very small screens */}
            <div className="-mr-2">
              <ThemeToggle embedded />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
