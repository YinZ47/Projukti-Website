"use client"

import { useEffect, useState } from "react"
import { CliNavbar } from "@/components/cli-navbar"
import { ThreeBackground } from "@/components/three-background"
import { LandingHero } from "@/components/landing-hero"
import { PageTerminalIntro } from "@/components/page-terminal-intro"
import { ExternalLink, Cpu, DollarSign, Package, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

interface Project {
  title: string
  subtitle: string
  description: string
  imageSrc: string
  progress: number
  timelineUrl?: string
  category: string
}

interface ProjectData {
  projects: Project[]
}

const categoryIcons = {
  Robotics: Cpu,
  SaaS: DollarSign,
  "AI/ML": Eye,
  Default: Package,
}

const projectColors = [
  "border-[oklch(0.65_0.18_155)] hover:border-[oklch(0.75_0.20_155)] hover:shadow-[oklch(0.65_0.18_155)]/30",
  "border-[oklch(0.55_0.15_150)] hover:border-[oklch(0.65_0.17_150)] hover:shadow-[oklch(0.55_0.15_150)]/30",
  "border-[oklch(0.45_0.12_145)] hover:border-[oklch(0.55_0.14_145)] hover:shadow-[oklch(0.45_0.12_145)]/30",
  "border-[oklch(0.35_0.10_160)] hover:border-[oklch(0.45_0.12_160)] hover:shadow-[oklch(0.35_0.10_160)]/30",
  "border-[oklch(0.75_0.15_165)] hover:border-[oklch(0.85_0.17_165)] hover:shadow-[oklch(0.75_0.15_165)]/30",
]

export default function ProjectsPage() {
  const [data, setData] = useState<ProjectData | null>(null)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    fetch("/projukti-lipi-data.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Failed to load project data:", err))
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-primary">Loading projects...</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen scanlines">
      <PageTerminalIntro 
        commandText="ls -la" 
        onComplete={() => setShowContent(true)}
        skipKey="projects-intro-seen"
      />
      <ThreeBackground />
      <CliNavbar />

      <main className={`relative z-10 container mx-auto px-4 pt-24 pb-16 max-w-6xl transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Terminal prompt */}
        <div className="mb-8 text-sm font-mono text-muted-foreground">
          <span className="text-primary font-semibold">student@projukti-lipi</span>
          <span>:</span>
          <span className="text-accent font-semibold">~/projects</span>
          <span>$</span>
          <span className="ml-2">ls -la</span>
        </div>

        <div className="mb-12">
          <LandingHero title="Our Projects" subtitle="From robotics to SaaS — our work in progress" commandText="ls -la" showImmediately={true} ctaHref="/projects" ctaText="Browse Projects" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.projects.map((project, index) => {
            const CategoryIcon = categoryIcons[project.category as keyof typeof categoryIcons] || categoryIcons.Default
            const colorClass = projectColors[index % projectColors.length]

            return (
              <div
                key={index}
                className={`border-2 rounded-lg overflow-hidden bg-card shadow-md transition-all duration-300 group ${colorClass}`}
              >
                {/* Project Image */}
                <div className="relative h-56 bg-muted dark:bg-white/95 overflow-hidden flex items-center justify-center p-8 border-b border-border">
                  <Image
                    src={imageErrors[index] ? "/placeholder.svg" : project.imageSrc}
                    alt={project.title}
                    width={300}
                    height={200}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={() => setImageErrors(prev => ({ ...prev, [index]: true }))}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/50 via-transparent to-transparent pointer-events-none" />

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground font-mono">
                      <CategoryIcon className="h-3 w-3 mr-1" />
                      {project.category}
                    </Badge>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1 text-foreground group-hover:font-extrabold group-hover:text-primary transition-all">
                      {project.title}
                    </h3>
                    <p className="text-sm text-accent font-semibold mb-3">{project.subtitle}</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">{project.description}</p>
                  </div>

                  {/* Progress Section */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground/80 font-mono">Progress</span>
                      <span className="text-primary font-bold font-mono">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  {/* Actions */}
                  {project.timelineUrl && (
                    <div className="pt-2">
                      <Button asChild size="sm" variant="outline" className="font-mono w-full bg-transparent">
                        <Link href={project.timelineUrl}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Timeline
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 border-2 border-primary/30 rounded-lg p-8 bg-card/90 backdrop-blur-sm text-center shadow-lg shadow-primary/10">
          <h2 className="text-2xl font-bold mb-3 text-primary text-glow">Want to Join Our Journey?</h2>
          <p className="text-foreground/90 mb-6 max-w-2xl mx-auto">
            We're always looking for passionate students who want to make a difference. Join Projukti-Lipi and turn your
            ambitions into reality.
          </p>
          <Button asChild size="lg" className="font-mono">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
