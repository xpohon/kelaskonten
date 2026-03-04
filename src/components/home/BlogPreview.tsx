"use client";

import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/Container";

const previewArticles = [
  {
    title: "7 Cara Meningkatkan Traffic Website yang Terbukti Bekerja di 2025",
    slug: "cara-meningkatkan-traffic-website",
    excerpt:
      "Pelajari strategi yang terbukti untuk mendatangkan traffic organik ke website Anda, dari SEO on-page hingga content marketing yang terukur.",
    category: "SEO",
    readTime: 8,
    date: "28 Feb 2025",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Panduan Lengkap Menulis Artikel SEO yang Naik ke Halaman 1 Google",
    slug: "cara-menulis-artikel-seo",
    excerpt:
      "Step-by-step menulis artikel yang disukai mesin pencari dan dibaca manusia. Dari riset keyword hingga optimasi on-page.",
    category: "Penulisan Konten",
    readTime: 10,
    date: "25 Feb 2025",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    title: "Copywriting: Seni Menulis yang Mengubah Pembaca Jadi Pembeli",
    slug: "copywriting-adalah",
    excerpt:
      "Kenali formula copywriting yang digunakan brand-brand besar dan bagaimana Anda bisa mengaplikasikannya untuk bisnis Anda.",
    category: "Copywriting",
    readTime: 9,
    date: "20 Feb 2025",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
];

export default function BlogPreview() {
  return (
    <section className="py-20 sm:py-28 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Blog"
          title="Insight & Strategi dari Tim Kami"
          description="Artikel yang kami tulis bukan hanya untuk klien — tapi juga untuk Anda. Baca dan buktikan kualitas tulisan kami."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {previewArticles.map((article, index) => (
            <AnimatedSection key={article.slug} delay={index * 0.1}>
              <Link href={`/blog/${article.slug}`} className="group block h-full">
                <div className="h-full rounded-2xl bg-card-bg border border-card-border hover:border-neon/30 overflow-hidden transition-all duration-300">
                  {/* Thumbnail placeholder */}
                  <div className={`h-48 bg-gradient-to-br ${article.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
                    <span className="relative text-3xl font-heading font-bold text-white/20">
                      KontenPro
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-0.5 text-xs font-medium text-neon bg-neon/10 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs text-muted">{article.readTime} min</span>
                    </div>

                    <h3 className="text-lg font-heading font-bold leading-snug group-hover:text-neon transition-colors mb-3">
                      {article.title}
                    </h3>

                    <p className="text-sm text-muted leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm text-neon font-medium">
                      Baca selengkapnya
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-foreground border border-card-border rounded-xl hover:border-neon hover:text-neon transition-all"
          >
            Lihat Semua Artikel
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
