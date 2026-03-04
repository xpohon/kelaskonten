"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/Container";

const services = [
  {
    title: "SEO & Backlink Building",
    href: "/layanan/seo",
    description:
      "Website Anda layak ditemukan. Kami bawa bisnis Anda ke halaman 1 Google dengan strategi SEO white-hat yang sustainable, bukan trik instan yang berbahaya.",
    features: [
      "Audit SEO teknikal menyeluruh",
      "Riset keyword berbasis data",
      "On-page & off-page optimization",
      "Backlink building berkualitas",
      "Laporan transparan mingguan",
    ],
    result: "Rata-rata top 10 Google dalam 90 hari",
    gradient: "from-emerald-500/20 to-teal-500/20",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    accent: "neon",
  },
  {
    title: "Penulisan Artikel & Konten",
    href: "/layanan/penulisan-konten",
    description:
      "Konten asal-asalan tidak akan pernah ranking. Kami menulis artikel yang disukai Google DAN dibaca manusia — riset mendalam, SEO-optimized, dan engaging.",
    features: [
      "Riset keyword + topik trending",
      "Artikel panjang & mendalam",
      "SEO on-page teroptimasi",
      "Tone sesuai brand voice",
      "Revisi hingga puas",
    ],
    result: "327+ artikel terkirim bulan ini",
    gradient: "from-violet-500/20 to-purple-500/20",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    accent: "purple",
  },
  {
    title: "Copywriting & Konten Sosial Media",
    href: "/layanan/copywriting",
    description:
      "Caption cantik tanpa strategi = konten mati. Kami buat copy yang bukan cuma dilihat, tapi diklik, di-share, dan menghasilkan penjualan nyata.",
    features: [
      "Caption berformula (AIDA, PAS)",
      "Content calendar bulanan",
      "Desain brief per post",
      "Email marketing copy",
      "A/B testing copy",
    ],
    result: "Engagement naik rata-rata 156%",
    gradient: "from-pink-500/20 to-rose-500/20",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    accent: "purple-light",
  },
];

export default function ServicesSection() {
  return (
    <section id="layanan" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Layanan Kami"
          title="Tiga Pilar Pertumbuhan Bisnis Digital Anda"
          description="Setiap layanan dirancang untuk saling melengkapi. SEO mendatangkan traffic, konten membangun kepercayaan, dan copywriting mengkonversi menjadi penjualan."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.15}>
              <Link href={service.href} className="block group h-full">
                <div className="relative h-full p-6 lg:p-8 rounded-2xl bg-card-bg border border-card-border hover:border-neon/30 transition-all duration-300 overflow-hidden">
                  {/* Background gradient */}
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative">
                    {/* Icon */}
                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-neon/10 text-neon mb-6">
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-neon transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                          <svg className="w-4 h-4 text-neon mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Result badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 text-neon text-xs font-medium">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      {service.result}
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
