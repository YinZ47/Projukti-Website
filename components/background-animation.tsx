"use client"

import { useEffect, useRef } from "react"

export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      speed: number
      char: string
      opacity: number
    }> = []

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 2,
        char: chars[Math.floor(Math.random() * chars.length)],
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    const isDark = document.documentElement.classList.contains("dark")
  let cursorX = -9999
  let cursorY = -9999

    function animate() {
      if (!ctx || !canvas) return

      ctx.fillStyle = isDark ? "rgba(18, 18, 25, 0.05)" : "rgba(245, 242, 235, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.fillStyle = isDark ? `rgba(34, 197, 94, ${particle.opacity})` : `rgba(74, 144, 94, ${particle.opacity})`
        ctx.font = "14px monospace"
        ctx.fillText(particle.char, particle.x, particle.y)

        particle.y += particle.speed

        if (particle.y > canvas.height) {
          particle.y = -20
          particle.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    // simple cursor follower
    const handleMove = (e: MouseEvent) => {
      cursorX = e.clientX
      cursorY = e.clientY
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${cursorX - 12}px, ${cursorY - 12}px, 0)`
        followerRef.current.style.opacity = `0.9`
      }
    }

    const handleLeave = () => {
      if (followerRef.current) followerRef.current.style.opacity = `0`
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseleave", handleLeave)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30" style={{ zIndex: 0 }} />
      <div
        ref={followerRef}
        className="pointer-events-none fixed w-6 h-6 rounded-full bg-primary/60 blur-md transition-opacity duration-200"
        style={{ zIndex: 10, opacity: 0 }}
      />
    </>
  )
}
