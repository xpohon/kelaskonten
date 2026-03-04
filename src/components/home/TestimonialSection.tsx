"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/Container";

const testimonials = [
  {
    name: "Riana Putri",
    role: "Founder",
    company: "Riana Hijab",
    content:
      "Awalnya skeptis sama jasa konten. Tapi setelah 3 bulan pakai KelasKonten, traffic organik naik 245% dan followers Instagram nambah hampir 3.000 orang secara organik. Sekarang saya bisa fokus ke produk, konten sudah beres.",
    rating: 5,
    result: "Traffic +245%",
    avatar: "RP",
  },
  {
    name: "Budi Hartono",
    role: "Marketing Manager",
    company: "AutoParts Indonesia",
    content:
      "SEO itu investasi jangka panjang, dan KelasKonten membuktikannya. Dalam 4 bulan, 12 keyword utama kami masuk halaman 1 Google. Lead dari organik search naik 3x lipat. Worth every rupiah.",
    rating: 5,
    result: "12 keyword page 1",
    avatar: "BH",
  },
  {
    name: "Sari Dewi",
    role: "CEO",
    company: "KedaiKopi Nusantara",
    content:
      "Copywriting mereka beda banget. Caption Instagram kami yang dulunya flat sekarang banjir komentar. Email marketing open rate naik dari 12% ke 34%. Tim-nya responsif dan benar-benar paham brand voice kami.",
    rating: 5,
    result: "Open rate 12% → 34%",
    avatar: "SD",
  },
  {
    name: "Andi Prasetyo",
    role: "Founder",
    company: "EdukasiOnline",
    content:
      "Kami sudah coba 3 jasa konten sebelumnya. KelasKonten yang pertama kali benar-benar deliver hasil. Artikel mereka konsisten ranking dan traffic blog kami naik 5x dalam 6 bulan. Kualitas penulisannya top.",
    rating: 5,
    result: "Traffic 5x dalam 6 bulan",
    avatar: "AP",
  },
  {
    name: "Maya Anggraini",
    role: "Digital Marketing Head",
    company: "RumahSkincare",
    content:
      "Dari awal konsultasi sudah kerasa profesionalnya. Mereka tidak asal tulis — riset dulu, analisis kompetitor, baru eksekusi. Hasilnya? Konversi landing page kami naik 47% setelah copywriting-nya dirombak total.",
    rating: 5,
    result: "Konversi +47%",
    avatar: "MA",
  },
];

export default function TestimonialSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Testimoni"
          title="Apa Kata Klien Kami"
          description="Bukan sekadar janji — ini adalah hasil nyata yang dirasakan oleh klien kami."
        />

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative p-8 sm:p-12 rounded-2xl bg-card-bg border border-card-border"
            >
              {/* Quote mark */}
              <div className="absolute top-6 left-8 text-6xl text-neon/10 font-serif leading-none">
                &ldquo;
              </div>

              <div className="relative">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-lg sm:text-xl text-foreground leading-relaxed mb-8">
                  {testimonials[active].content}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon to-purple flex items-center justify-center text-sm font-bold text-background">
                      {testimonials[active].avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonials[active].name}
                      </p>
                      <p className="text-sm text-muted">
                        {testimonials[active].role}, {testimonials[active].company}
                      </p>
                    </div>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-neon/10 text-neon text-sm font-medium">
                    {testimonials[active].result}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === active
                    ? "bg-neon w-8"
                    : "bg-card-border hover:bg-muted"
                }`}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
