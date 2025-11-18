"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Wave and geometric pattern system
    let time = 0

    class FloatingOrb {
      x: number
      y: number
      baseX: number
      baseY: number
      radius: number
      speed: number
      angle: number
      pulseSpeed: number

      constructor() {
        this.baseX = Math.random() * canvas.width
        this.baseY = Math.random() * canvas.height
        this.x = this.baseX
        this.y = this.baseY
        this.radius = Math.random() * 3 + 1
        this.speed = Math.random() * 0.02 + 0.01
        this.angle = Math.random() * Math.PI * 2
        this.pulseSpeed = Math.random() * 0.02 + 0.01
      }

      update(t: number) {
        this.angle += this.speed
        this.x = this.baseX + Math.cos(this.angle) * 50
        this.y = this.baseY + Math.sin(this.angle) * 30
        this.radius = 2 + Math.sin(t * this.pulseSpeed) * 1
      }

      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3)
        gradient.addColorStop(0, theme === "dark" ? "rgba(0, 255, 255, 0.9)" : "rgba(100, 150, 120, 0.5)")
        gradient.addColorStop(0.5, theme === "dark" ? "rgba(0, 255, 255, 0.4)" : "rgba(100, 150, 120, 0.3)")
        gradient.addColorStop(1, "rgba(0, 255, 255, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    class WaveLine {
      y: number
      amplitude: number
      frequency: number
      speed: number
      offset: number

      constructor(y: number) {
        this.y = y
        this.amplitude = Math.random() * 30 + 20
        this.frequency = Math.random() * 0.01 + 0.005
        this.speed = Math.random() * 0.02 + 0.01
        this.offset = Math.random() * Math.PI * 2
      }

      draw(t: number) {
        ctx.beginPath()
        ctx.strokeStyle = theme === "dark" ? "rgba(0, 255, 255, 0.25)" : "rgba(100, 150, 120, 0.2)"
        ctx.lineWidth = 2

        for (let x = 0; x < canvas.width; x += 5) {
          const y = this.y + Math.sin(x * this.frequency + t * this.speed + this.offset) * this.amplitude
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }
    }

    class GeometricShape {
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      sides: number
      vx: number
      vy: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 40 + 20
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.02
        this.sides = Math.floor(Math.random() * 3) + 3 // 3-5 sides
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.rotation += this.rotationSpeed

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        ctx.beginPath()
        for (let i = 0; i < this.sides; i++) {
          const angle = (Math.PI * 2 * i) / this.sides
          const x = Math.cos(angle) * this.size
          const y = Math.sin(angle) * this.size
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()

        ctx.strokeStyle = theme === "dark" ? "rgba(0, 255, 255, 0.15)" : "rgba(100, 150, 120, 0.15)"
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.restore()
      }
    }

    // Create elements
    const orbs: FloatingOrb[] = []
    for (let i = 0; i < 40; i++) {
      orbs.push(new FloatingOrb())
    }

    const waves: WaveLine[] = []
    for (let i = 0; i < 5; i++) {
      waves.push(new WaveLine((canvas.height / 6) * (i + 1)))
    }

    const shapes: GeometricShape[] = []
    for (let i = 0; i < 8; i++) {
      shapes.push(new GeometricShape())
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      time += 0.01

      // Clear with fade effect
      ctx.fillStyle = theme === "dark" ? "rgba(13, 13, 13, 0.08)" : "rgba(250, 248, 245, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw waves
      waves.forEach((wave) => wave.draw(time))

      // Draw and update geometric shapes
      shapes.forEach((shape) => {
        shape.update()
        shape.draw()
      })

      // Draw and update orbs
      orbs.forEach((orb) => {
        orb.update(time)
        orb.draw()
      })

      // Draw connections between nearby orbs
      ctx.strokeStyle = theme === "dark" ? "rgba(0, 255, 255, 0.15)" : "rgba(100, 150, 120, 0.1)"
      ctx.lineWidth = 1

      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const dx = orbs[i].x - orbs[j].x
          const dy = orbs[i].y - orbs[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(orbs[i].x, orbs[i].y)
            ctx.lineTo(orbs[j].x, orbs[j].y)
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-40" style={{ zIndex: 0 }} />
}
