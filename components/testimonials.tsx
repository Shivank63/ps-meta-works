"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "Fashion Brand X",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    content:
      "PS Meta Works transformed our social media presence. Their viral campaign increased our engagement by 300% and directly led to a significant boost in sales.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CEO",
    company: "Tech Startup Y",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    content:
      "Working with PS Meta Works was a game-changer for our product launch. Their innovative approach to meme marketing helped us reach audiences we never thought possible.",
    rating: 5,
  },
  {
    name: "Scart Williams",
    role: "Brand Manager",
    company: "Beverage Company Z",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    content:
      "The team at PS Meta Works truly understands how to create content that resonates with Gen Z. Our influencer campaign exceeded all expectations.",
    rating: 4,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 rounded-full mb-2">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </motion.div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          </button>

          {/* Testimonials Carousel */}
          <div className="overflow-hidden px-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="py-8"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl relative">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full opacity-50"></div>
                  <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4 w-24 h-24 bg-pink-100 dark:bg-pink-900/30 rounded-full opacity-50"></div>

                  <div className="relative">
                    {/* Content */}
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-100 dark:border-purple-900/30 relative">
                          <Image
                            src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                            alt={testimonials[currentIndex].name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <motion.div
                          className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                        >
                          <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-1">
                            <span className="text-sm">👍</span>
                          </div>
                        </motion.div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-6 italic">
                          "{testimonials[currentIndex].content}"
                        </p>

                        <div>
                          <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                          </p>

                          <div className="flex items-center mt-2 justify-center md:justify-start">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < testimonials[currentIndex].rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  currentIndex === index
                    ? "bg-purple-600"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
