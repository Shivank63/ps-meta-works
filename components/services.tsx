"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"

const services = [
  {
    icon: "🎯",
    title: "Campaign Strategy",
    description: "Data-driven campaign planning that aligns with your brand goals and audience interests.",
    features: ["Audience Analysis", "Trend Forecasting", "Platform Selection", "KPI Setting"],
  },
  {
    icon: "🔥",
    title: "Trend Hijacking",
    description: "Quickly capitalize on emerging trends to keep your brand relevant and engaging.",
    features: ["Real-time Monitoring", "Rapid Response", "Cultural Relevance", "Engagement Tracking"],
  },
  {
    icon: "🎨",
    title: "Viral Design",
    description: "Eye-catching visuals and designs that are optimized for sharing and engagement.",
    features: ["Scroll-stopping Graphics", "Shareable Templates", "Platform-specific Formats", "Brand Consistency"],
  },
  {
    icon: "📊",
    title: "Influencer Analytics",
    description: "Identify and partner with the right influencers to amplify your message authentically.",
    features: ["Influencer Vetting", "Performance Tracking", "ROI Measurement", "Relationship Management"],
  },
  {
    icon: "🧠",
    title: "Meme Marketing",
    description: "Leverage the power of internet culture to create relatable, shareable content.",
    features: ["Cultural Relevance", "Format Innovation", "Engagement Optimization", "Trend Adaptation"],
  },
]

export default function Services() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 rounded-full mb-2">
              Our Services
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Faster iteration. More innovation.</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We provide end-to-end solutions to help your brand stand out in today's crowded digital landscape.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Service Tabs */}
          <motion.div
            className="lg:w-1/3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center text-left p-4 rounded-lg transition-all duration-300 whitespace-nowrap lg:whitespace-normal ${
                  activeTab === index
                    ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-l-4 border-purple-500 text-purple-600 dark:text-purple-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800/50"
                }`}
              >
                <span className="text-2xl mr-3">{service.icon}</span>
                <span className="font-medium">{service.title}</span>
                {activeTab === index && <ChevronRight className="ml-auto h-5 w-5 text-purple-500" />}
              </button>
            ))}
          </motion.div>

          {/* Service Content */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
              >
                <div className="flex items-center mb-6">
                  <span className="text-4xl mr-4">{services[activeTab].icon}</span>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{services[activeTab].title}</h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">{services[activeTab].description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services[activeTab].features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="h-2 w-2 rounded-full bg-purple-500 mr-3"></div>
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
