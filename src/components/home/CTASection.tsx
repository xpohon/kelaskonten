"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon/10 via-purple/10 to-neon/5" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-neon/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple/10 rounded-full blur-[80px]" />

          <div className="relative border border-neon/20 rounded-3xl p-8 sm:p-12 lg:p-16 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-neon bg-neon/10 border border-neon/20 rounded-full">
              <span className="w-2 h-2 bg-neon rounded-full animate-pulse" />
              Slot konsultasi gratis tersedia minggu ini
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 max-w-3xl mx-auto leading-tight">
              Mulai Gratis —{" "}
              <span className="gradient-text">Konsultasi 30 Menit</span>{" "}
              Tanpa Bayar
            </h2>

            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              Ceritakan tantangan bisnis Anda. Kami akan berikan rekomendasi
              strategi konten yang bisa langsung Anda implementasikan — bahkan
              jika Anda tidak jadi menggunakan jasa kami.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pesan"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold bg-neon text-[#0a0a0f] rounded-xl hover:shadow-[0_0_30px_rgba(79,255,176,0.3)] hover:scale-[1.02] transition-all"
              >
                Dapatkan Audit SEO Gratis Sekarang
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-foreground border border-card-border rounded-xl hover:border-neon hover:text-neon transition-all"
              >
                Lihat Sampel Artikel Kami
              </Link>
            </div>

            <p className="mt-6 text-xs text-muted">
              Tanpa kartu kredit. Tanpa kontrak. Tanpa spam.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
