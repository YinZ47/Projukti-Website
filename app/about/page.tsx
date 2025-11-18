"use client"

import { CliNavbar } from "@/components/cli-navbar"
import { ThreeBackground } from "@/components/three-background"
import { LandingHero } from "@/components/landing-hero"
import { Lightbulb, Heart, Users, Target, Code, Bot, Rocket, BookOpen, Zap } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: Users,
      title: "Student-Led, Student-Focused",
      description:
        "Every decision we make is guided by students, for students. We understand your challenges because we live them. This isn't just an organization you join—it's a community you belong to.",
    },
    {
      icon: BookOpen,
      title: "Growth Through Doing",
      description:
        "We believe the best way to learn is by building. Theory has its place, but nothing compares to hands-on creation. Here, you won't just study technology—you'll shape it.",
    },
    {
      icon: Heart,
      title: "Excellence Without Gatekeeping",
      description:
        "Striving for excellence doesn't mean excluding those who are still learning. We maintain high standards while keeping our doors wide open to all skill levels.",
    },
    {
      icon: Zap,
      title: "Collaboration Over Competition",
      description:
        "We've cultivated a workspace where collaboration trumps competition, where asking questions is encouraged, and where failure is a stepping stone to success.",
    },
  ]

  const initiatives = [
    {
      icon: Code,
      title: "SaaS Development",
      subtitle: "Software That Serves",
      description:
        "We create Software-as-a-Service solutions centered on efficiency, user-friendliness, and impact. From productivity tools to platforms connecting students with opportunities, every product serves a genuine need.",
      highlights: [
        "Discovery: Engage with users to understand pain points",
        "Design: Prioritize intuitive interfaces",
        "Development: Modern technologies and best practices",
        "Testing: Real user feedback guides iterations",
        "Launch & Support: Continuous improvement",
      ],
    },
    {
      icon: Bot,
      title: "Robotics",
      subtitle: "Engineering the Physical Future",
      description:
        "Our robotics initiative explores the cutting edge of automation, AI, and mechanical engineering. We tackle projects that challenge us to think creatively and work collaboratively.",
      highlights: [
        "Autonomous systems and intelligent navigation",
        "Robotic process automation",
        "IoT integration and smart systems",
        "Competition-ready robots for events",
        "Research pushing boundaries",
      ],
    },
  ]

  return (
    <div className="relative min-h-screen">
      <ThreeBackground />
      <CliNavbar />

      <main className="relative z-10 container mx-auto px-4 pt-24 pb-16 max-w-6xl">
        {/* Terminal prompt */}
        <div className="mb-8 text-sm text-muted-foreground">
          <span className="text-primary">student@projukti-lipi</span>
          <span className="text-foreground/60">:</span>
          <span className="text-accent">~/about</span>
          <span className="text-foreground/60">$</span>
          <span className="ml-2">cat about.md</span>
        </div>

        <div className="space-y-16">
          {/* Shared Landing Hero */}
          <LandingHero title="About Projukti-Lipi" subtitle="Where Ambition Meets Opportunity" commandText="cat about.md" showImmediately={true} ctaHref="/projects" ctaText="View Our Projects" />

          {/* Our Story */}
          <div className="border border-border rounded-lg p-8 bg-card shadow-md space-y-6">
            <div className="flex items-start gap-4">
              <Lightbulb className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Our Story</h2>
                <p className="text-foreground/90 leading-relaxed">
                  Projukti-Lipi was founded on a powerful belief: that talent exists everywhere, but opportunity does
                  not. We've witnessed countless students with brilliant ideas and untapped potential become discouraged
                  by environments that prioritize exclusivity over inclusivity, experience over enthusiasm.
                </p>
                <p className="text-foreground/90 leading-relaxed">
                  Born from the frustrations and aspirations of students like you, Projukti-Lipi emerged as a response
                  to the gap between academic excellence and practical innovation. We saw peers who excelled in their
                  coursework but struggled to find spaces where they could explore their creative and technical
                  ambitions.
                </p>
                <p className="text-lg text-foreground font-bold bg-primary/10 p-4 rounded border-l-4 border-primary shadow-sm">
                  So we built something different—a community that puts students first, always.
                </p>
              </div>
            </div>
          </div>

          {/* Philosophy */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary text-glow">
              <span className="text-accent">#</span> Our Philosophy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="border-2 border-primary/30 rounded-lg p-6 bg-card/90 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/20 border border-primary/30 group-hover:bg-primary/30 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <h3 className="text-lg font-bold text-primary">{feature.title}</h3>
                        <p className="text-sm text-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Our Environment */}
          <div className="border-2 border-primary/30 rounded-lg p-8 bg-card/95 backdrop-blur-sm shadow-lg shadow-primary/10 space-y-6">
            <h2 className="text-2xl font-bold text-primary">
              <span className="text-accent">#</span> Our Environment
            </h2>
            <p className="text-foreground leading-relaxed">
              We've cultivated a workspace where collaboration trumps competition, where asking questions is encouraged,
              and where failure is recognized as a stepping stone to success. Our entirely student-led structure means
              you're not just a member—you're a stakeholder in our collective growth.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Mentorship from peers who remember starting from scratch",
                "Flexible project teams adapting to your schedule",
                "Regular workshops and knowledge-sharing sessions",
                "Judgment-free zone celebrating experimentation",
                "Leadership opportunities for all members",
                "Cross-disciplinary collaboration",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 border-2 border-accent/30 rounded-lg p-4 bg-secondary/50 hover:border-accent hover:shadow-md hover:shadow-accent/20 transition-all"
                >
                  <span className="text-primary text-xl">▸</span>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Our Initiatives */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-primary text-glow mb-2">
                <span className="text-accent">#</span> Our Initiatives
              </h2>
              <p className="text-lg text-muted-foreground">Building Tomorrow's Solutions Today</p>
            </div>

            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon
              return (
                <div
                  key={index}
                  className="border-2 border-accent/30 rounded-lg p-8 bg-card/90 shadow-lg shadow-accent/10 space-y-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-4 rounded-lg bg-accent/20 border border-accent/30">
                      <Icon className="h-8 w-8 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-primary">{initiative.title}</h3>
                      <p className="text-accent font-semibold">{initiative.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-foreground leading-relaxed">{initiative.description}</p>

                  <div className="space-y-2">
                    {initiative.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-sm text-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Cross-Pollination */}
          <div className="border-2 border-accent/30 rounded-lg p-8 bg-card/90 shadow-lg shadow-accent/10">
            <div className="flex items-start gap-4">
              <Target className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-primary">Cross-Pollination of Skills</h2>
                <p className="text-foreground leading-relaxed">
                  One of the unique strengths of Projukti-Lipi is how our initiatives complement each other. SaaS
                  developers gain appreciation for hardware constraints. Robotics enthusiasts discover the power of
                  cloud computing and data analytics. This holistic approach to technology prepares our members for the
                  interconnected challenges of modern innovation.
                </p>
              </div>
            </div>
          </div>

          {/* Join Our Journey */}
          <div className="border-l-4 border-accent pl-6 py-6 space-y-6">
            <div className="flex items-start gap-4">
              <Rocket className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-primary text-glow">Join Our Journey</h2>
                <p className="text-lg text-foreground leading-relaxed">
                  Projukti-Lipi isn't just looking for members—we're building a movement. A movement of students who
                  refuse to let their potential go unrealized. Who believe that ambition, combined with the right
                  environment and support, can achieve extraordinary things.
                </p>
                <p className="text-foreground leading-relaxed">
                  We don't ask for your resume. We don't require years of experience. We only ask for your curiosity,
                  your commitment to learning, and your willingness to contribute to something bigger than yourself.
                </p>
                <blockquote className="border-l-4 border-primary pl-6 italic text-accent text-lg bg-primary/10 p-4 rounded-r">
                  Your journey starts here. Your ambitions find wings here. Your story becomes part of our legacy here.
                </blockquote>
                <p className="text-xl font-bold text-primary text-glow">
                  Welcome to Projukti-Lipi—where every student's potential is recognized, nurtured, and unleashed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
