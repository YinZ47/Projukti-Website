"use client"

import { useEffect, useState } from "react"
import { TypingText } from "@/components/typing-text"

interface PageTerminalIntroProps {
  commandText: string
  onComplete?: () => void
  skipKey?: string // unique key for this page's intro in sessionStorage
}

export function PageTerminalIntro({ commandText, onComplete, skipKey = "intro-seen" }: PageTerminalIntroProps) {
  const [showIntro, setShowIntro] = useState(true)
  const [hasSeenBefore, setHasSeenBefore] = useState(false)

  useEffect(() => {
    // Check if user has seen this intro in this session
    const seen = sessionStorage.getItem(skipKey)
    if (seen === "true") {
      setHasSeenBefore(true)
      setShowIntro(false)
      if (onComplete) onComplete()
    }

    // Add ESC key listener
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showIntro) {
        skipIntro()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [skipKey, onComplete, showIntro])

  const handleComplete = () => {
    // Mark as seen in sessionStorage
    sessionStorage.setItem(skipKey, "true")
    setShowIntro(false)
    if (onComplete) onComplete()
  }

  const skipIntro = () => {
    sessionStorage.setItem(skipKey, "true")
    setShowIntro(false)
    if (onComplete) onComplete()
  }

  if (!showIntro) return null

  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center animate-in fade-in duration-300">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-4">
          {/* Terminal prompt */}
          <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
            <span className="text-primary font-semibold">student@projukti-lipi</span>
            <span>:</span>
            <span className="text-accent font-semibold">~</span>
            <span>$</span>
          </div>

          {/* Typing command */}
          <div className="text-lg font-mono">
            <span className="text-accent font-semibold">$</span>{" "}
            <TypingText text={commandText} delay={50} onComplete={handleComplete} />
          </div>

          {/* Skip button (subtle, appears after a moment) */}
          <button
            onClick={skipIntro}
            className="absolute bottom-8 right-8 text-xs font-mono text-muted-foreground hover:text-primary transition-colors opacity-50 hover:opacity-100 animate-in fade-in duration-1000 delay-500"
          >
            [press ESC to skip]
          </button>
        </div>
      </div>
    </div>
  )
}
