"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Interactive AR Experience",
    client: "Entertainment Brand A",
    description: "Created an AR filter that was used over 10M times across Instagram and TikTok.",
    image: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?q=80&w=2670&auto=format&fit=crop",
    metrics: [
      { label: "Uses", value: "10M+" },
      { label: "Average Time", value: "45s" },
      { label: "Brand Lift", value: "28%" },
    ],
  },
  {
    title: "Meme Marketing Campaign",
    client: "Tech Startup Y",
    description: "Developed a series of relatable memes that increased brand awareness by 200%.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop",
    metrics: [
      { label: "Shares", value: "1.2M" },
      { label: "Brand Mentions", value: "300K" },
      { label: "Website Traffic", value: "+150%" },
    ],
  },
  {
    title: "Influencer Collaboration",
    client: "Beverage Company Z",
    description: "Partnered with 50 micro-influencers to create authentic content that resonated with Gen Z.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop",
    metrics: [
      { label: "Reach", value: "15M" },
      { label: "Conversion Rate", value: "8.5%" },
      { label: "ROI", value: "320%" },
    ],
  },
]

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>, dragAmount: number) => {
    if (Math.abs(dragAmount) > 100) {
      if (dragAmount > 0) {
        prevProject()
      } else {
        nextProject()
      }
    }
  }

  return (
    <section id="projects" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 rounded-full mb-2">
              Our Projects
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Case Studies</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Explore our most successful campaigns and see how we've helped brands achieve their goals.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevProject}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          </button>

          <button
            onClick={nextProject}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Next project"
          >
            <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          </button>

          {/* Projects Carousel */}
          <div ref={containerRef} className="overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={containerRef}
              onDragEnd={(e, info) => handleDrag(e as React.MouseEvent<HTMLDivElement>, info.offset.x)}
              className="flex"
              animate={{ x: -currentIndex * 100 + "%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="min-w-full px-4"
                  whileHover={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
                    onClick={() => setSelectedProject(index)}
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
                          <Play className="h-8 w-8 text-purple-600" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-purple-600 dark:text-purple-400 mb-2">{project.client}</div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  currentIndex === index
                    ? "bg-purple-600"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image
                  src={projects[selectedProject].image || "/placeholder.svg"}
                  alt={projects[selectedProject].title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="p-8">
                <div className="text-sm text-purple-600 dark:text-purple-400 mb-2">
                  {projects[selectedProject].client}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  {projects[selectedProject].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">{projects[selectedProject].description}</p>

                <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Campaign Results</h4>
                <div className="grid grid-cols-3 gap-4">
                  {projects[selectedProject].metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center"
                    >
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{metric.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
