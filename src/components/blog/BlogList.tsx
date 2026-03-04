"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: number;
  publishedAt: Date;
  coverImage: string | null;
  author: string;
}

const categories = ["Semua", "SEO", "Penulisan Konten", "Copywriting", "Media Sosial"];

const categoryGradients: Record<string, string> = {
  SEO: "from-emerald-500/20 to-teal-500/20",
  "Penulisan Konten": "from-violet-500/20 to-purple-500/20",
  Copywriting: "from-pink-500/20 to-rose-500/20",
  "Media Sosial": "from-amber-500/20 to-orange-500/20",
};

export default function BlogList({ articles }: { articles: Article[] }) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchCategory = activeCategory === "Semua" || a.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  return (
    <div>
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card-bg border border-card-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-neon transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm rounded-xl transition-all ${
                activeCategory === cat
                  ? "bg-neon text-[#0a0a0f] font-semibold"
                  : "bg-card-bg border border-card-border text-muted hover:text-foreground hover:border-neon/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/blog/${article.slug}`} className="group block h-full">
              <div className="h-full rounded-2xl bg-card-bg border border-card-border hover:border-neon/30 overflow-hidden transition-all duration-300">
                <div className={`h-44 bg-gradient-to-br ${categoryGradients[article.category] || "from-gray-500/20 to-gray-600/20"} flex items-center justify-center relative`}>
                  <span className="text-2xl font-heading font-bold text-white/15">
                    KontenPro
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-0.5 text-xs font-medium text-neon bg-neon/10 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted">
                      {article.readTime} min baca
                    </span>
                  </div>
                  <h2 className="text-base font-heading font-bold leading-snug group-hover:text-neon transition-colors mb-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>{article.author}</span>
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted">Tidak ada artikel ditemukan.</p>
        </div>
      )}
    </div>
  );
}
