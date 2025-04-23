"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  { emoji: "🚀", label: "Campaigns Launched", value: 250, suffix: "+" },
  { emoji: "🎯", label: "Impressions Reached", value: 500, suffix: "M+" },
  { emoji: "💼", label: "Clients Served", value: 120, suffix: "+" },
  { emoji: "🧠", label: "Memes Gone Viral", value: 1000, suffix: "+" },
]

export default function BuzzNumbers() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat, index) => {
        const duration = 2000 // 2 seconds
        const frameDuration = 1000 / 60 // 60fps
        const totalFrames = Math.round(duration / frameDuration)
        const increment = stat.value / totalFrames

        let currentFrame = 0
        const counter = setInterval(() => {
          currentFrame++
          setCounts((prev) => {
            const newCounts = [...prev]
            newCounts[index] = Math.min(Math.round(increment * currentFrame), stat.value)
            return newCounts
          })

          if (currentFrame === totalFrames) {
            clearInterval(counter)
          }
        }, frameDuration)

        return () => clearInterval(counter)
      })
    }
  }, [isInView])

  // Floating emoji particles
  const emojis = ["🔥", "😂", "💡", "🎉", "👀", "💯", "⚡", "✨"]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 relative overflow-hidden">
      {/* Floating emoji background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {emojis.map((emoji, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl opacity-20"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              x: [Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 rounded-full mb-2">
              Our Buzz in Numbers
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Results that speak for themselves</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We've helped brands of all sizes achieve remarkable results through innovative digital strategies.
            </p>
          </motion.div>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg relative overflow-hidden group"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                <div className="text-3xl mb-3">{stat.emoji}</div>
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {counts[index]}
                  {stat.suffix}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-700">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: isInView ? "100%" : 0 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
