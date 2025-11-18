"use client"

import { useEffect, useState } from "react"

interface TypingTextProps {
  text: string
  delay?: number
  className?: string
  onComplete?: () => void
}

export function TypingText({ text, delay = 50, className = "", onComplete }: TypingTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, delay, text, onComplete])

  const completeNow = () => {
    if (!skipped) {
      setDisplayText(text)
      setCurrentIndex(text.length)
      setSkipped(true)
      if (onComplete) onComplete()
    }
  }

  return (
    <span className={className} onClick={completeNow} title="Click to finish">
      {displayText}
      {currentIndex < text.length && <span className="terminal-cursor">▊</span>}
    </span>
  )
}
