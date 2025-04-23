"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import ScrollReveal from "./scroll-reveal"

const facts = [
  { emoji: "🔥", title: "Top 1% Creators", description: "Ranked among the most innovative digital agencies" },
  { emoji: "📈", title: "10M+ Campaign Reach", description: "Our campaigns reach millions across platforms" },
  { emoji: "💼", title: "100+ Brand Partnerships", description: "Trusted by leading brands worldwide" },
]

export default function AboutUs() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <ScrollReveal>
              <span className="inline-block px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 rounded-full mb-2">
                About PS Meta Works
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                We Create Digital Experiences That Break The Internet
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Founded in 2020, PS Meta Works has quickly established itself as a leader in viral marketing and trend
                creation. We combine creative strategy, data-driven insights, and cultural relevance to create campaigns
                that don't just participate in conversations—they start them.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Our team of strategists, designers, and trend analysts work together to identify opportunities and
                create content that resonates with today's digital audience.
              </p>
            </ScrollReveal>
          </motion.div>

          {/* Animation/Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="aspect-video relative">
            <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop"
                  alt="PS Meta Works team collaborating on a digital marketing strategy"
                  fill
                  className="object-cover"
                />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* Fun Facts */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {facts.map((fact, index) => (
            <ScrollReveal key={index} delay={index * 0.1} direction={index % 2 === 0 ? "up" : "down"}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="text-4xl mb-4">{fact.emoji}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{fact.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{fact.description}</p>

                  {/* Hidden GIF that reflect  on click */}
                  <div className="absolute inset-0 bg-white dark:bg-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-0 group-active:opacity-100 transition-opacity duration-300">
                  <Image
                      src={`https://media.giphy.com/media/${index === 0 ? "l0HlQXlQ3nHyLMvte" : index === 1 ? "l46Cy1rHbQ92uuLXa" : "3o7aD5euYp5vZJ1Ztu"}/giphy.gif`}
                      alt={fact.title}
                      width={300}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
