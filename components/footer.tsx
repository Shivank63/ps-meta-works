"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, Linkedin, Youtube, ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-lg bg-white/30 dark:bg-black/30"></div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4 inline-block"
            >
              PS Meta Works
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              We create viral moments that transform brands into cultural
              phenomena. Our data-driven approach ensures your message doesn't
              just reach audiences—it resonates with them.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:shadow-purple-500/20 transition-shadow duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </motion.a>
              <motion.a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:shadow-purple-500/20 transition-shadow duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:shadow-purple-500/20 transition-shadow duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </motion.a>
              <motion.a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:shadow-purple-500/20 transition-shadow duration-300"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              Navigation
            </h3>
            <ul className="space-y-2">
              {["Home", "Services", "Projects", "Team", "Blog", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              Newsletter
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Subscribe to get the latest trends and insights.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-medium"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PS Meta Works. All rights
            reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="#"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              Cookies Policy
            </Link>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:shadow-purple-500/20 transition-shadow duration-300 mt-4 md:mt-0"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </motion.button>
        </div>

        {/* Easter egg */}
        <div className="text-center mt-8">
          <motion.p
            className="text-xs text-gray-500 dark:text-gray-500 cursor-pointer group"
            whileHover={{ scale: 1.05 }}
          >
            Made with{" "}
            <span className="group-hover:text-purple-500 transition-colors duration-300">
              💜
            </span>{" "}
            to break the internet.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
