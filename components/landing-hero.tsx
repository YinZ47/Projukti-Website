"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { TypingText } from "@/components/typing-text"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Terminal } from "lucide-react"

interface LandingHeroProps {
  title: string
  subtitle?: string
  imageSrc?: string
  commandText?: string
  showImmediately?: boolean
  ctaHref?: string
  ctaText?: string
}

export function LandingHero({
  title,
  subtitle,
  imageSrc = "/images/projukti-lipi-logo.png",
  commandText = "cat mission.txt",
  showImmediately = false,
  ctaHref = "/projects",
  ctaText = "View Our Projects",
}: LandingHeroProps) {
  const [showContent, setShowContent] = useState(showImmediately)

  useEffect(() => {
    if (showImmediately) setShowContent(true)
  }, [showImmediately])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
        <span className="text-primary font-semibold">student@projukti-lipi</span>
        <span>:</span>
        <span className="text-accent font-semibold">~</span>
        <span>$</span>
      </div>

      <div className="space-y-6">
        <div className="text-lg font-mono">
          <span className="text-accent font-semibold">$</span>{" "}
          <TypingText
            text={commandText}
            delay={60}
            onComplete={() => setTimeout(() => setShowContent(true), 400)}
          />
        </div>

        {showContent && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="border-l-4 border-primary pl-6 space-y-6">
              <div className="flex items-center gap-6">
                {imageSrc && (
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image src={imageSrc} alt="logo" fill className="object-contain" />
                  </div>
                )}
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground">{title}</h1>
                  {subtitle && (
                    <p className="text-xl md:text-2xl text-accent font-semibold leading-relaxed mt-2">{subtitle}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Button asChild className="font-mono mr-4" size="lg">
                <Link href={ctaHref}>
                  <Terminal className="mr-2 h-4 w-4" /> {ctaText}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
