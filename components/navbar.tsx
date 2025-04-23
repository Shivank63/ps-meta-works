"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Menu, X } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const menuItems = [
  { name: "Home", href: "#home", icon: "🏠" },
  { name: "Services", href: "#services", icon: "🛠️" },
  { name: "Projects", href: "#projects", icon: "🚀" },
  { name: "Team", href: "#team", icon: "👥" },
  { name: "Blog", href: "#blog", icon: "📝" },
  { name: "Contact", href: "#contact", icon: "✉️" },
]

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { setTheme, theme } = useTheme()
  const navRef = useRef<HTMLDivElement>(null)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Hide navbar on scroll down, show on scroll up
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }

      setLastScrollY(window.scrollY)

      // Update active section based on scroll position
      const sections = document.querySelectorAll("section[id]")
      let currentSection = "home"

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100
        const sectionHeight = (section as HTMLElement).offsetHeight

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.id
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Calculate scroll progress
  const scrollProgress =
    typeof document !== "undefined"
      ? (scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100
      : 0

  // Magnetic effect for menu items
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    target.style.transform = `translate(${(x - rect.width / 2) / 10}px, ${(y - rect.height / 2) / 10}px)`
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translate(0, 0)"
  }

  // Smooth scroll to section with animation
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)

    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)

    if (element) {
      // Get the target element's position
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - 80 // Adjust for navbar height

      // Animate scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Update URL hash without scrolling
      setTimeout(() => {
        history.pushState(null, "", href)
        setActiveSection(targetId)
      }, 1000)
    }
  }

  return (
    <>
      <motion.div
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/10 dark:bg-black/10",
          "border-b border-white/10 dark:border-gray-800/30",
          "shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]",
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
              className="flex items-center"
            >
              <Link
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
              >
                PS Meta Works
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={`px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 flex items-center group ${
                      activeSection === item.href.replace("#", "") ? "text-purple-600 dark:text-purple-400" : ""
                    }`}
                  >
                    <span className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.icon}
                    </span>
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-all duration-300 ${
                        activeSection === item.href.replace("#", "") ? "w-full" : "w-0"
                      }`}
                    ></span>
                  </Link>
                </motion.div>
              ))}

              {/* Theme Toggle */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                aria-label="Toggle theme"
                whileHover={{ rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-purple-600" />
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 mr-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                aria-label="Toggle theme"
                whileHover={{ rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-purple-600" />
                )}
              </motion.button>

              <Button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                variant="ghost"
                size="icon"
                aria-label="Toggle menu"
                className="text-gray-700 dark:text-gray-200"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="h-0.5 bg-gray-200 dark:bg-gray-800 w-full">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.7)]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-3">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className={`block px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 ${
                        activeSection === item.href.replace("#", "")
                          ? "bg-gray-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400"
                          : ""
                      }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
