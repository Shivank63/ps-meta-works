"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Play } from "lucide-react"
import Link from "next/link"
import ParticleBackground from "./particle-background"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      const { width, height, left, top } = containerRef.current.getBoundingClientRect()

      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      const elements = containerRef.current.querySelectorAll(".parallax")
      elements.forEach((el) => {
        const speed = Number.parseFloat((el as HTMLElement).dataset.speed || "0.1")
        const xOffset = x * 100 * speed
        const yOffset = y * 100 * speed
        ;(el as HTMLElement).style.transform = `translate(${xOffset}px, ${yOffset}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle background */}
      <ParticleBackground />

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>

        {/* Animated blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-pink-600/20 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-[0.03] pointer-events-none"></div>
      </div>

      <div ref={containerRef} className="container mx-auto px-4 z-10 py-20 md:py-0">
        <div className="flex flex-col items-center text-center">
          {/* Headline with glitch animation */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 parallax"
            data-speed="0.05"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="relative inline-block">
              <span className="absolute inset-0 text-purple-600 dark:text-purple-400 animate-glitch-1 opacity-70">
                We Turn Brands Into Buzz.
              </span>
              <span className="absolute inset-0 text-pink-500 dark:text-pink-400 animate-glitch-2 opacity-70">
                We Turn Brands Into Buzz.
              </span>
              <span className="relative bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                We Turn Brands Into Buzz.
              </span>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mb-10 parallax"
            data-speed="0.1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            At PS Meta Works, we don't follow trends — we set them.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-16 parallax"
            data-speed="0.15"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="#contact"
              className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full overflow-hidden shadow-lg hover:shadow-purple-500/25 transition-shadow duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
              <span className="relative flex items-center">
                🚀 Let's Work Together
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  →
                </motion.span>
              </span>
            </Link>

            <Link
              href="#"
              className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-800 border border-purple-200 dark:border-gray-700 rounded-full overflow-hidden shadow-lg hover:shadow-purple-500/10 transition-shadow duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                <Play className="w-4 h-4 mr-2" /> Watch Our Reel
              </span>
            </Link>
          </motion.div>

          {/* Scroll down indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll Down</span>
            <ArrowDown className="w-5 h-5 text-purple-500" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
