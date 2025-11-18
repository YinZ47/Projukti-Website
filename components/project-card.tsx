"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Lock } from "lucide-react"
import { useState } from "react"

interface ProjectCardProps {
  name: string
  description: string
  repo_url: string
  languages: string[]
  language_percent?: Record<string, number>
  license?: string
  visibility?: string
  homepage?: string
}

export function ProjectCard({
  name,
  description,
  repo_url,
  languages,
  language_percent,
  license,
  visibility,
  homepage,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [copied, setCopied] = useState(false)
  const [transform, setTransform] = useState<string>("")

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch (e) {
      // ignore silently
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = (x / rect.width) * 2 - 1 // -1 .. 1
    const py = (y / rect.height) * 2 - 1
    const rotateX = (-py * 6).toFixed(2)
    const rotateY = (px * 6).toFixed(2)
    const translateY = (-Math.abs(py) * 6).toFixed(2)
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px)`)
  }

  return (
    <Card
      className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setTransform("")
      }}
      onMouseMove={handleMouseMove}
      style={{ transform }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-mono text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
              {name}
              {visibility === "private" && <Lock className="h-4 w-4 text-muted-foreground" />}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {languages.map((lang) => (
            <Badge key={lang} variant="secondary" className="font-mono text-xs bg-secondary/50 hover:bg-secondary">
              {lang}
              {language_percent && language_percent[lang] && (
                <span className="ml-1 text-muted-foreground">{language_percent[lang].toFixed(1)}%</span>
              )}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-mono text-primary hover:text-accent transition-colors"
          >
            View Repository
            <ExternalLink className="h-3 w-3" />
          </a>

          <button
            type="button"
            onClick={() => copyToClipboard(repo_url)}
            className="ml-2 inline-flex items-center gap-1 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Copy repository URL"
          >
            Copy URL
          </button>

          {copied && (
            <span className="ml-2 text-xs font-mono text-success">Copied!</span>
          )}

          {homepage && (
            <a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-mono text-primary hover:text-accent transition-colors"
            >
              Live Demo
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        {license && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs font-mono text-muted-foreground">License: {license}</p>
          </div>
        )}
      </div>
    </Card>
  )
}
