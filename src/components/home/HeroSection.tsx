"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/10 rounded-full blur-[128px]" />
        <div className="absolute top-20 right-20 w-2 h-2 bg-neon rounded-full animate-glow" />
        <div className="absolute top-40 left-[15%] w-1.5 h-1.5 bg-purple-light rounded-full animate-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-32 right-[30%] w-2 h-2 bg-neon/60 rounded-full animate-glow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Floating geometric elements */}
      <div className="absolute top-32 right-[10%] w-20 h-20 border border-neon/20 rounded-2xl rotate-12 animate-float" />
      <div className="absolute bottom-40 left-[8%] w-16 h-16 border border-purple/20 rounded-full animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute top-[60%] right-[5%] w-12 h-12 bg-gradient-to-br from-neon/10 to-purple/10 rounded-xl rotate-45 animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-sm font-medium text-neon bg-neon/5 border border-neon/20 rounded-full">
              <span className="w-2 h-2 bg-neon rounded-full animate-pulse" />
              Dipercaya 300+ bisnis Indonesia
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] tracking-tight"
          >
            Konten yang{" "}
            <span className="gradient-text">Menghasilkan,</span>
            <br />
            Bukan Sekadar{" "}
            <span className="relative">
              Mengisi Halaman
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 2 100 2 150 6C200 10 250 4 298 8" stroke="#4fffb0" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
              </svg>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-muted max-w-2xl leading-relaxed"
          >
            Kami menulis artikel yang naik ke halaman 1 Google, copy yang
            mengkonversi pengunjung jadi pembeli, dan strategi SEO yang bekerja
            bahkan saat Anda tidur.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/pesan"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold bg-neon text-[#0a0a0f] rounded-xl hover:shadow-[0_0_30px_rgba(79,255,176,0.3)] hover:scale-[1.02] transition-all"
            >
              Mulai Proyek Saya — Gratis Konsultasi
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/portofolio"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-foreground border border-card-border rounded-xl hover:border-neon hover:text-neon transition-all"
            >
              Lihat Portofolio Hasil Nyata
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center gap-8 text-sm text-muted"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-neon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Artikel rata-rata top 10 dalam 90 hari
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-neon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Konversi naik rata-rata 34%
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-neon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Hemat 15 jam/minggu
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
