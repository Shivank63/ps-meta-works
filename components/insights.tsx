"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const categories = [
  { id: "all", name: "All Posts" },
  { id: "trends", name: "🔥 Trending" },
  { id: "strategy", name: "🧠 Strategy" },
  { id: "case-studies", name: "📊 Case Studies" },
  { id: "tools", name: "🛠️ Tools & Tech" },
]

const blogPosts = [
  {
    id: 1,
    title: "How We Created a TikTok Trend That Generated 50M Views",
    excerpt: "A behind-the-scenes look at our viral campaign strategy and execution.",
    image: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg",
    category: "case-studies",
    date: "May 15, 2023",
    readTime: "8 min read",
    reactions: {
      "🔥": 124,
      "👏": 89,
      "🤯": 56,
    },
  },
  {
    id: 2,
    title: "5 Emerging Social Media Trends to Watch in 2023",
    excerpt: "Stay ahead of the curve with these predictions for the next big things in social.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", 
    category: "trends",
    date: "April 28, 2023",
    readTime: "6 min read",
    reactions: {
      "🔥": 98,
      "👏": 45,
      "🤯": 23,
    },
  },
  {
    id: 3,
    title: "The Psychology Behind Viral Content: What Makes People Share",
    excerpt: "Understanding the emotional triggers that drive sharing behavior online.",
    image: "https://images.pexels.com/photos/3184466/pexels-photo-3184466.jpeg", 
    category: "strategy",
    date: "April 10, 2023",
    readTime: "10 min read",
    reactions: {
      "🔥": 156,
      "👏": 112,
      "🤯": 78,
    },
  },
  {
    id: 4,
    title: "AR Filters: The Ultimate Guide to Creating Engaging Experiences",
    excerpt: "How to design AR filters that users will love and share with their networks.",
    image: "https://images.pexels.com/photos/3184467/pexels-photo-3184467.jpeg", 
    category: "tools",
    date: "March 22, 2023",
    readTime: "12 min read",
    reactions: {
      "🔥": 87,
      "👏": 63,
      "🤯": 41,
    },
  },
  {
    id: 5,
    title: "Meme Marketing 101: How to Connect with Gen Z Authentically",
    excerpt: "Strategies for brands looking to leverage meme culture without trying too hard.",
    image: "https://images.pexels.com/photos/3184468/pexels-photo-3184468.jpeg", 
    category: "strategy",
    date: "March 5, 2023",
    readTime: "7 min read",
    reactions: {
      "🔥": 203,
      "👏": 145,
      "🤯": 92,
    },
  },
  {
    id: 6,
    title: "How We Helped a Startup Go Viral on a Shoestring Budget",
    excerpt: "Case study: Achieving massive reach without massive spending.",
    image: "https://images.pexels.com/photos/3184469/pexels-photo-3184469.jpeg", 
    category: "case-studies",
    date: "February 18, 2023",
    readTime: "9 min read",
    reactions: {
      "🔥": 112,
      "👏": 87,
      "🤯": 54,
    },
  },
];



export default function Insights() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)

  const filteredPosts =
    activeCategory === "all" ? blogPosts : blogPosts.filter((post) => post.category === activeCategory)

  return (
    <section id="blog" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 rounded-full mb-2">
              Insights
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Latest from Our Blog</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Dive into our latest thoughts on trends, strategies, and case studies from the world of viral marketing.
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredPost(post.id)}
                onHoverEnd={() => setHoveredPost(null)}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                      hoveredPost === post.id ? "scale-110" : "scale-100"
                    }`}
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                    {categories.find((c) => c.id === post.category)?.name.split(" ")[0]}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white line-clamp-2">{post.title}</h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      {Object.entries(post.reactions).map(([emoji, count]) => (
                        <button
                          key={emoji}
                          className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                        >
                          <span className="mr-1">{emoji}</span>
                          <span>{count}</span>
                        </button>
                      ))}
                    </div>

                    <Link
                      href="#"
                      className="text-purple-600 dark:text-purple-400 font-medium flex items-center group-hover:underline"
                    >
                      Read More
                      <motion.span animate={{ x: hoveredPost === post.id ? 5 : 0 }} transition={{ duration: 0.3 }}>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </motion.span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-medium rounded-full border border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-purple-500/10 transition-shadow duration-300"
          >
            View All Posts
          </motion.button>
        </div>
      </div>
    </section>
  )
}
