"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState("")
  const fullText = "Brewing Virality..."

  useEffect(() => {
    // Animate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 30)

    // Typewriter effect
    let currentIndex = 0
    const textInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.substring(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(textInterval)
      }
    }, 100)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-black z-50"
      exit={{
        y: "-100%",
        transition: {
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
    >
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="relative w-32 h-32 mb-8"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 blur-xl opacity-50 animate-pulse"></div>
        <div className="relative flex items-center justify-center w-full h-full">
          <motion.div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            PS
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="text-2xl font-medium text-gray-800 dark:text-gray-200 mb-8 h-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {text}
        <span className="inline-block w-1 h-6 ml-1 bg-purple-500 animate-blink"></span>
      </motion.div>

      <div className="w-64 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 to-pink-500"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </motion.div>
  )
}
