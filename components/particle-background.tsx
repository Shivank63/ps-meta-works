"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mousePosition = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        initParticles()
      }
    }

    const initParticles = () => {
      particles.current = []
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100)

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          color: getRandomColor(),
        })
      }
    }

    const getRandomColor = () => {
      const colors = [
        "rgba(168, 85, 247, 0.5)", // Purple
        "rgba(217, 70, 239, 0.5)", // Fuchsia
        "rgba(236, 72, 153, 0.5)", // Pink
        "rgba(244, 114, 182, 0.5)", // Light Pink
        "rgba(139, 92, 246, 0.5)", // Violet
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach((particle, index) => {
        // Move particles
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX *= -1
        }

        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY *= -1
        }

        // Mouse interaction
        const dx = mousePosition.current.x - particle.x
        const dy = mousePosition.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          const force = (100 - distance) / 500
          particle.speedX -= Math.cos(angle) * force
          particle.speedY -= Math.sin(angle) * force
        }

        // Apply some friction
        particle.speedX *= 0.99
        particle.speedY *= 0.99

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Connect particles that are close to each other
        for (let j = index + 1; j < particles.current.length; j++) {
          const otherParticle = particles.current[j]
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(138, 43, 226, ${0.2 - distance / 500})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animationFrameId.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
