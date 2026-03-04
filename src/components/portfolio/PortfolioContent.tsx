"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface Portfolio {
  id: string;
  type: string;
  platform: string | null;
  title: string;
  description: string;
  caption: string | null;
  metrics: string | null;
  category: string;
  order: number;
}

interface ArticlePreview {
  title: string;
  slug: string;
  category: string;
  views: number;
  readTime: number;
}

const igGradients = [
  "from-emerald-600 to-teal-700",
  "from-violet-600 to-purple-700",
  "from-pink-600 to-rose-700",
  "from-cyan-600 to-blue-700",
  "from-amber-600 to-orange-700",
  "from-indigo-600 to-blue-800",
  "from-red-600 to-pink-700",
  "from-teal-600 to-green-700",
  "from-fuchsia-600 to-purple-800",
];

const filters = ["Semua", "SEO", "COPYWRITING", "CONTENT", "SOCIAL_PROOF", "BTS"];
const filterLabels: Record<string, string> = {
  Semua: "Semua",
  SEO: "SEO",
  COPYWRITING: "Copywriting",
  CONTENT: "Konten",
  SOCIAL_PROOF: "Hasil Klien",
  BTS: "Behind the Scenes",
};

export default function PortfolioContent({
  portfolios,
  articles,
}: {
  portfolios: Portfolio[];
  articles: ArticlePreview[];
}) {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [expandedCaption, setExpandedCaption] = useState<string | null>(null);

  const igPosts = portfolios.filter((p) => p.type === "INSTAGRAM");
  const linkedinPosts = portfolios.filter((p) => p.type === "LINKEDIN");

  const filteredIg =
    activeFilter === "Semua"
      ? igPosts
      : igPosts.filter((p) => p.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-neon bg-neon/10 border border-neon/20 rounded-full">
          Portofolio
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
          Bukti Nyata, <span className="gradient-text">Bukan Janji</span>
        </h1>
        <p className="text-lg text-muted">
          Ini bukan sekadar mockup cantik. Ini adalah contoh konten yang kami
          produksi untuk klien — lengkap dengan caption, strategi, dan hasilnya.
        </p>
      </div>

      {/* Instagram Section */}
      <section className="mb-24">
        <SectionHeader
          badge="@kontenproid"
          title="Instagram Feed"
          description="Konten Instagram yang kami buat untuk klien dan akun sendiri."
          align="left"
        />

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 text-sm rounded-xl transition-all ${
                activeFilter === f
                  ? "bg-neon text-[#0a0a0f] font-semibold"
                  : "bg-card-bg border border-card-border text-muted hover:border-neon/30"
              }`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredIg.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`relative aspect-square rounded-2xl bg-gradient-to-br ${igGradients[index % igGradients.length]} p-5 sm:p-6 flex flex-col justify-between overflow-hidden cursor-pointer`}
                  onClick={() =>
                    setExpandedCaption(
                      expandedCaption === post.id ? null : post.id
                    )
                  }
                >
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-16 h-16 border border-white/30 rounded-full" />
                    <div className="absolute bottom-4 left-4 w-10 h-10 border border-white/20 rounded-lg rotate-12" />
                  </div>
                  <div className="relative">
                    <span className="inline-block px-2 py-0.5 text-[10px] sm:text-xs font-medium text-white/90 bg-white/20 rounded-full backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                  <div className="relative">
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-[10px] sm:text-xs text-white/70">
                      {post.description}
                    </p>
                  </div>
                </div>

                {/* Expanded caption */}
                <AnimatePresence>
                  {expandedCaption === post.id && post.caption && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 p-4 rounded-xl bg-card-bg border border-card-border overflow-hidden"
                    >
                      <p className="text-xs text-muted whitespace-pre-line leading-relaxed">
                        {post.caption}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* LinkedIn Section */}
      <section className="mb-24">
        <SectionHeader
          badge="LinkedIn"
          title="LinkedIn Posts"
          description="Konten profesional yang kami buat untuk thought leadership."
          align="left"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {linkedinPosts.map((post, i) => (
            <AnimatedSection key={post.id} delay={i * 0.1}>
              <div className="p-6 rounded-2xl bg-card-bg border border-card-border hover:border-neon/30 transition-all">
                {/* LinkedIn header mockup */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon to-purple flex items-center justify-center text-xs font-bold text-background">
                    KP
                  </div>
                  <div>
                    <p className="text-sm font-semibold">KontenPro</p>
                    <p className="text-xs text-muted">
                      Jasa SEO & Konten Profesional
                    </p>
                  </div>
                </div>
                <h3 className="text-base font-bold mb-3">{post.title}</h3>
                <p className="text-sm text-muted whitespace-pre-line leading-relaxed line-clamp-12">
                  {post.caption}
                </p>
                {post.metrics && (
                  <div className="mt-4 pt-3 border-t border-card-border text-xs text-muted">
                    {post.metrics}
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Article Performance */}
      <section className="mb-16">
        <SectionHeader
          badge="Artikel"
          title="Performa Artikel Kami"
          description="Data nyata dari blog KontenPro sendiri."
          align="left"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group p-6 rounded-2xl bg-card-bg border border-card-border hover:border-neon/30 transition-all"
            >
              <span className="text-xs font-medium text-neon">{article.category}</span>
              <h3 className="mt-2 text-base font-bold group-hover:text-neon transition-colors">
                {article.title}
              </h3>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted">
                <span>{article.views.toLocaleString()} views</span>
                <span>{article.readTime} min baca</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
