"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    title: "Konsultasi & Analisis",
    description:
      "Ceritakan kebutuhan Anda. Tim kami akan menganalisis bisnis, kompetitor, dan target audiens Anda untuk membuat strategi yang tepat sasaran.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Eksekusi & Produksi",
    description:
      "Tim spesialis kami langsung bekerja. Setiap konten melewati proses riset, penulisan, editing, dan quality check sebelum dikirim ke Anda.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Laporan & Optimasi",
    description:
      "Anda mendapatkan laporan transparan dengan data nyata. Kami terus optimasi berdasarkan performa untuk hasil yang makin baik setiap bulan.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Cara Kerja"
          title="Dari Brief ke Hasil dalam 3 Langkah"
          description="Proses kami dirancang agar Anda bisa fokus menjalankan bisnis. Kami yang urus kontennya."
        />

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connector line - desktop only */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-neon/30 via-purple/30 to-neon/30" />

          {steps.map((step, index) => (
            <AnimatedSection key={step.number} delay={index * 0.15}>
              <div className="relative text-center">
                {/* Step number circle */}
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-card-bg border border-card-border relative z-10">
                  <span className="text-neon">{step.icon}</span>
                </div>

                {/* Step number badge */}
                <span className="inline-block px-3 py-1 mb-3 text-xs font-bold text-neon bg-neon/10 rounded-full">
                  STEP {step.number}
                </span>

                <h3 className="text-xl font-heading font-bold mb-3">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
