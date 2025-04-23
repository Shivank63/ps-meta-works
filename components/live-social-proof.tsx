"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Rocket, PartyPopper, Award } from "lucide-react"

const socialProofs = [
  { icon: <Rocket className="h-4 w-4" />, text: "🚀 Just launched XYZ campaign!" },
  { icon: <PartyPopper className="h-4 w-4" />, text: "🎉 2.5M views in 12 hours!" },
  { icon: <Award className="h-4 w-4" />, text: "🔥 Brand X just joined us!" },
  { icon: <Rocket className="h-4 w-4" />, text: "💡 New viral concept in the works!" },
  { icon: <PartyPopper className="h-4 w-4" />, text: "📈 500K new followers this month!" },
]

export default function SocialProof() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    const animateMarquee = async () => {
      // Wait for the component to be mounted first
      await controls.start({
        x: "-100%",
        transition: { duration: 20, ease: "linear", repeat: Number.POSITIVE_INFINITY },
      })
    }

    animateMarquee()
  }, [controls])

  return (
    <div className="py-4 bg-primary/5 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative">
        <motion.div ref={marqueeRef} animate={controls} className="flex whitespace-nowrap">
          {[...socialProofs, ...socialProofs].map((item, index) => (
            <div
              key={index}
              className="inline-flex items-center px-6 py-2 mx-2 rounded-full bg-background border border-border shadow-sm"
            >
              <span className="flex items-center justify-center mr-2 text-primary">{item.icon}</span>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
