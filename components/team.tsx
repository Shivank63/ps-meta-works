"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Linkedin, Twitter, Mail } from "lucide-react"
import Image from "next/image"

const teamMembers = [
  {
    name: "Alex Rodriguez",
    role: "Founder & Creative Director",
    bio: "Former creative lead at major agencies with 10+ years of experience in viral marketing.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      email: "alex@psmetaworks.com",
    },
  },
  {
    name: "Jamie Chen",
    role: "Head of Strategy",
    bio: "Data-driven strategist with a background in consumer psychology and trend forecasting.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      email: "jamie@psmetaworks.com",
    },
  },
  {
    name: "Taylor Williams",
    role: "Creative Technologist",
    bio: "AR/VR specialist who bridges the gap between cutting-edge tech and creative concepts.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2522&auto=format&fit=crop",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      email: "taylor@psmetaworks.com",
    },
  },
  {
    name: "Jordan Smith",
    role: "Social Media Director",
    bio: "Former influencer with deep knowledge of platform algorithms and content optimization.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      email: "jordan@psmetaworks.com",
    },
  },
  {
    name: "Join Our Team",
    role: "Various Positions",
    bio: "We're always looking for creative minds to join our growing team.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop",
    isJobCard: true,
  },
]

export default function Team() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)

  return (
    <section id="team" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 rounded-full mb-2">
              Our Team
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Meet the Creators</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We're a diverse team of strategists, designers, and trend analysts passionate about creating viral
              moments.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredMember(index)}
              onHoverEnd={() => setHoveredMember(null)}
              className={`relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg group ${
                member.isJobCard ? "border-2 border-dashed border-purple-300 dark:border-purple-700" : ""
              }`}
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className={`object-cover transition-transform duration-500 ${
                    hoveredMember === index ? "scale-110" : "scale-100"
                  } ${member.isJobCard ? "opacity-20" : ""}`}
                />

                {member.isJobCard && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                      className="text-6xl"
                    >
                      ✨
                    </motion.div>
                  </div>
                )}

                {!member.isJobCard && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredMember === index ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex items-end justify-center p-4"
                  >
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-purple-600 transition-colors duration-200"
                        aria-label={`${member.name}'s Twitter`}
                      >
                        <Twitter className="h-5 w-5 text-white" />
                      </a>
                      <a
                        href="#"
                        className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-purple-600 transition-colors duration-200"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <Linkedin className="h-5 w-5 text-white" />
                      </a>
                      <a
                        href="#"
                        className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-purple-600 transition-colors duration-200"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="h-5 w-5 text-white" />
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* Glowing border on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredMember === index ? 1 : 0 }}
                  className="absolute inset-0 border-4 border-purple-500 rounded-xl opacity-50"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">{member.name}</h3>
                <p className="text-purple-600 dark:text-purple-400 mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>

                {member.isJobCard && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-medium"
                  >
                    View Open Positions
                  </motion.button>
                )}
              </div>

              {/* Confetti animation on hover for job card */}
              {member.isJobCard && hoveredMember === index && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        x: Math.random() * 100 + "%",
                        y: -20,
                        opacity: 1,
                        scale: Math.random() * 0.5 + 0.5,
                      }}
                      animate={{
                        y: Math.random() * 100 + 100 + "%",
                        rotate: Math.random() * 360,
                        opacity: 0,
                      }}
                      transition={{
                        duration: Math.random() * 2 + 1,
                        ease: "easeOut",
                      }}
                      className="absolute w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: `hsl(${Math.random() * 60 + 270}, 100%, 70%)`,
                        boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
