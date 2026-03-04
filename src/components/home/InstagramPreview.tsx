"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/Container";

const instaPosts = [
  {
    title: "3 Alasan Website Anda Tidak Muncul di Google",
    category: "SEO",
    gradient: "from-emerald-600 to-teal-700",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
  {
    title: "Formula AIDA untuk Caption yang Menjual",
    category: "Copywriting",
    gradient: "from-violet-600 to-purple-700",
    icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  },
  {
    title: "Engagement +156% dalam 30 Hari",
    category: "Hasil Klien",
    gradient: "from-pink-600 to-rose-700",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    title: "Checklist SEO On-Page 2025",
    category: "SEO",
    gradient: "from-cyan-600 to-blue-700",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    title: "5 Hook Caption yang Pasti Dibaca",
    category: "Konten",
    gradient: "from-amber-600 to-orange-700",
    icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
  },
  {
    title: "Behind the Scenes: Proses Riset Kami",
    category: "BTS",
    gradient: "from-indigo-600 to-blue-800",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
];

export default function InstagramPreview() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="@kontenproid"
          title="Konten Sosial Media yang Kami Buat"
          description="Ini bukan mockup biasa — ini contoh nyata konten yang kami produksi untuk klien. Follow kami untuk tips marketing gratis setiap hari."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {instaPosts.map((post, index) => (
            <AnimatedSection key={post.title} delay={index * 0.08}>
              <div className={`group relative aspect-square rounded-2xl bg-gradient-to-br ${post.gradient} p-4 sm:p-6 flex flex-col justify-between overflow-hidden cursor-pointer`}>
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-20 h-20 border border-white/30 rounded-full" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border border-white/20 rounded-xl rotate-12" />
                </div>

                <div className="relative">
                  <span className="inline-block px-2 py-0.5 text-[10px] sm:text-xs font-medium text-white/90 bg-white/20 rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>

                <div className="relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={post.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {post.title}
                  </h3>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/portofolio"
            className="inline-flex items-center gap-2 text-sm text-neon font-medium hover:underline"
          >
            Lihat semua portofolio kami
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
