"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Essntials/Navbar";
import Footer from "@/components/Essntials/footer";
import {
  ArrowRight,
  Search,
  Menu,
  X,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Calendar,
  Clock,
} from "lucide-react";

// --- MOCK DATA ---
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of Web Development: Beyond Next.js 14",
    excerpt:
      "Exploring the new frontiers of server components, partial prerendering, and what it means for the developer experience in 2026.",
    category: "Development",
    date: "Jan 05, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS Architectures",
    excerpt:
      "How to organize your styles for large scale applications without losing your mind.",
    category: "Design",
    date: "Jan 02, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2555&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 3,
    title: "The Psychology of UI Animation",
    excerpt:
      "Why micro-interactions matter more than you think for user retention.",
    category: "UX/UI",
    date: "Dec 28, 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 4,
    title: "Serverless Databases: A Comprehensive Guide",
    excerpt:
      "Comparing the top players in the market and which one suits your startup.",
    category: "Backend",
    date: "Dec 15, 2025",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2668&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 5,
    title: "AI Integration in React Apps",
    excerpt:
      "Building a custom chatbot using the OpenAI API and React streams.",
    category: "AI",
    date: "Dec 10, 2025",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    featured: false,
  },
];

const CATEGORIES = ["All", "Development", "Design", "UX/UI", "Backend", "AI"];

// --- COMPONENTS ---

const Blog3 = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? BLOG_POSTS.filter((post) => !post.featured)
      : BLOG_POSTS.filter(
          (post) => post.category === activeCategory && !post.featured
        );

  const featuredPost = BLOG_POSTS.find((post) => post.featured);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-black selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6"
            >
              Insights & <br />{" "}
              <span className="text-gray-400">Perspectives.</span>
            </motion.h1>
            <p className="text-lg text-gray-600">
              Deep dives into technology, design, and the future of digital
              products.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full md:w-80 bg-white border border-gray-200 rounded-full py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Featured Post (Bento Large) */}
        {activeCategory === "All" && featuredPost && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-16 group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-200 grid grid-cols-1 lg:grid-cols-2"
          >
            <div className="h-64 lg:h-auto overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6 text-sm font-medium">
                <span className="bg-black text-white px-3 py-1 rounded-full">
                  {featuredPost.category}
                </span>
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar size={14} /> {featuredPost.date}
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock size={14} /> {featuredPost.readTime}
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-gray-600 transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-gray-600 text-lg mb-8 line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <button className="flex items-center gap-2 text-black font-bold group/btn">
                Read Full Story
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover/btn:translate-x-2"
                />
              </button>
            </div>
          </motion.div>
        )}

        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-4 mb-10 gap-3 no-scrollbar">
          {CATEGORIES.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-black text-white shadow-lg shadow-black/20"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="h-56 overflow-hidden relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white/90 backdrop-blur-sm text-black text-xs font-bold px-3 py-1.5 rounded-full border border-gray-100">
                    {post.category}
                  </span>
                </div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                  {post.excerpt}
                </p>

                <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src="https://ui-avatars.com/api/?name=Admin&background=random"
                        alt="Author"
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-700">
                      Aicyro Team
                    </span>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-gray-300 group-hover:text-black -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section (Visual Break) */}
        <div className="mt-20 rounded-3xl bg-black text-white p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-500 via-black to-black"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join our monthly digest
            </h2>
            <p className="text-gray-400 mb-8">
              Get the latest articles, tutorials, and free resources delivered
              straight to your inbox. No spam, we promise.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="name@email.com"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:bg-white/20 transition-all"
              />
              <button className="bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-gray-200 transition-all">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog3;
