"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  once?: boolean
  className?: string
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  className = "",
}: ScrollRevealProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, amount: 0.3 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, inView, once])

  const getDirectionVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { y: 50, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      case "down":
        return {
          hidden: { y: -50, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      case "left":
        return {
          hidden: { x: 50, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      case "right":
        return {
          hidden: { x: -50, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      default:
        return {
          hidden: { y: 50, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getDirectionVariants()}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
