"use client"

import { CliNavbar } from "@/components/cli-navbar"
import { ThreeBackground } from "@/components/three-background"
import { LandingHero } from "@/components/landing-hero"
import { timelinePosts } from "@/data/timelinePosts"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DrishtikonTimelinePage() {
  return (
    <div className="relative min-h-screen scanlines">
      <ThreeBackground />
      <CliNavbar />

      <main className="relative z-10 container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="outline" className="font-mono bg-transparent">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Terminal prompt */}
        <div className="mb-8 text-sm font-mono text-muted-foreground">
          <span className="text-primary font-semibold">student@projukti-lipi</span>
          <span>:</span>
          <span className="text-accent font-semibold">~/timeline/drishtikon</span>
          <span>$</span>
          <span className="ml-2">cat progress.log</span>
        </div>

        <div className="mb-12">
          <LandingHero title="DRISHTIKON Timeline" subtitle="Progress updates from the humanoid endoskeleton project" commandText="cat progress.log" showImmediately={true} ctaHref="/timeline/drishtikon" ctaText="See Updates" />
        </div>

        {/* Timeline Posts */}
        <div className="space-y-8">
          {timelinePosts.map((post) => (
            <article
              key={post.id}
              className="border-2 border-primary/30 rounded-lg bg-card/90 backdrop-blur-sm p-6 shadow-lg hover:border-primary/50 transition-all duration-300"
            >
              {/* Post Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/50">
                  <Image src={post.profileImage || "/placeholder.svg"} alt={post.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{post.name}</h3>
                  <p className="text-sm text-muted-foreground font-mono">{post.day} ago</p>
                </div>
              </div>

              {/* Post Description */}
              <div className="mb-4 text-foreground/90 whitespace-pre-line leading-relaxed">{post.description}</div>

              {/* Post Images */}
              {post.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {post.images.map((image, idx) => (
                    <div
                      key={idx}
                      className={`relative overflow-hidden rounded-lg border border-border ${
                        post.images.length === 1 ? "col-span-2 h-96" : "h-48"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Progress update image ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 border-2 border-primary/30 rounded-lg p-8 bg-card/90 backdrop-blur-sm text-center shadow-lg shadow-primary/10">
          <h2 className="text-2xl font-bold mb-3 text-primary text-glow">Stay Updated</h2>
          <p className="text-foreground/90 mb-6 max-w-2xl mx-auto">
            Want to follow our progress more closely? Connect with us on LinkedIn or reach out directly.
          </p>
          <Button asChild size="lg" className="font-mono">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
