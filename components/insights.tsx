"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
]

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory)

  return (
    <section id="blog" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Latest Insights
          </motion.h2>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeCategory === category.id
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="min-w-[300px] md:min-w-[400px] bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Link href="#" className="text-blue-600 mt-3 inline-flex items-center gap-1">
                  Read more <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
