"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Preloader from "@/components/preloader"
import Hero from "@/components/hero"
import AboutUs from "@/components/about-us"
import Services from "@/components/services"
import BuzzNumbers from "@/components/buzz-numbers"
import LiveSocialProof from "@/components/live-social-proof"
import Projects from "@/components/projects"
import Testimonials from "@/components/testimonials"
import Team from "@/components/team"
import Insights from "@/components/insights"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import CustomCursor from "@/components/cursor"
import { motion } from "framer-motion"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Preloader />
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden"
    >
      <CustomCursor />
      <Navbar />
      <Hero />
      <AboutUs />
      <Services />
      <LiveSocialProof />
      <BuzzNumbers />
      <Projects />
      <Testimonials />
      <Team />
      <Insights />
      <Contact />
      <Footer />
    </motion.main>
  )
}
