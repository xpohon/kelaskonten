"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/Container";

const faqs = [
  {
    q: "Berapa lama sampai artikel saya ranking di Google?",
    a: "Berdasarkan data klien kami, artikel SEO-optimized rata-rata mulai masuk top 10 Google dalam 60-90 hari. Beberapa keyword low-competition bahkan bisa ranking dalam 2-3 minggu. Yang penting adalah konsistensi — semakin banyak konten berkualitas yang Anda publish, semakin cepat domain authority Anda naik.",
  },
  {
    q: "Apa bedanya KontenPro dengan jasa konten lain?",
    a: "Kami tidak sekadar menulis — kami meriset. Setiap artikel dimulai dari riset keyword mendalam, analisis kompetitor, dan pemahaman target audiens Anda. Plus, kami memberikan laporan performa konten bulanan sehingga Anda bisa melihat ROI langsung dari investasi konten Anda.",
  },
  {
    q: "Apakah saya bisa request revisi?",
    a: "Tentu! Setiap paket kami menyertakan revisi. Paket Starter mendapatkan 1 revisi, Growth 2 revisi, dan paket Bulanan mendapatkan unlimited revisi. Kami ingin Anda benar-benar puas dengan hasilnya.",
  },
  {
    q: "Bagaimana proses onboarding-nya?",
    a: "Prosesnya simple: (1) Konsultasi gratis 30 menit untuk memahami kebutuhan Anda, (2) Kami kirim proposal dengan strategi dan timeline, (3) Setelah deal, kami mulai riset dan produksi dalam 3 hari kerja. Anda tidak perlu repot — cukup berikan brief dan kami yang eksekusi.",
  },
  {
    q: "Apakah bisa untuk industri spesifik/niche?",
    a: "Sangat bisa! Kami sudah menangani berbagai industri: e-commerce, kesehatan, properti, F&B, edukasi, fintech, dan banyak lagi. Tim writer kami akan melakukan riset mendalam tentang industri Anda sebelum menulis.",
  },
  {
    q: "Berapa minimal order untuk memulai?",
    a: "Anda bisa mulai dari 1 artikel saja dengan paket Starter (Rp 150.000). Tidak ada kontrak jangka panjang yang mengikat. Tapi berdasarkan pengalaman, klien yang mengambil paket bulanan mendapatkan hasil terbaik karena konsistensi konten.",
  },
  {
    q: "Apakah kalian juga menangani posting konten ke sosmed saya?",
    a: "Untuk saat ini, kami fokus pada produksi konten (copywriting, caption, dan visual brief). Posting dilakukan oleh tim Anda sendiri. Namun kami menyediakan content calendar lengkap dengan jadwal posting optimal dan panduan visual untuk setiap post.",
  },
  {
    q: "Bagaimana cara bayar? Apakah aman?",
    a: "Kami menggunakan Midtrans sebagai payment gateway resmi yang sudah terlisensi Bank Indonesia. Anda bisa bayar via transfer bank, e-wallet (GoPay, OVO, DANA), atau kartu kredit. Semua transaksi terenkripsi dan aman.",
  },
  {
    q: "Apakah ada garansi hasil?",
    a: "Kami memberikan garansi kepuasan pada kualitas tulisan — revisi hingga Anda puas. Untuk ranking SEO, kami tidak bisa menjamin posisi spesifik (siapapun yang menjanjikan ini sedang berbohong), tapi track record kami membuktikan rata-rata klien mendapatkan peningkatan traffic 200%+ dalam 6 bulan.",
  },
  {
    q: "Bisa lihat sampel artikel atau portofolio dulu?",
    a: "Absolutely! Blog kami sendiri adalah showcase terbaik — semua artikel ditulis oleh tim yang sama yang akan mengerjakan project Anda. Cek halaman Blog dan Portofolio kami untuk melihat kualitas kerja kami secara langsung.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-28 bg-surface/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="FAQ"
          title="Pertanyaan yang Sering Ditanyakan"
          description="Belum menemukan jawaban? Hubungi kami untuk konsultasi gratis."
        />

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-card-border bg-card-bg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex items-center justify-between w-full p-5 sm:p-6 text-left"
              >
                <span className="text-sm sm:text-base font-medium text-foreground pr-4">
                  {faq.q}
                </span>
                <svg
                  className={`w-5 h-5 text-muted shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-muted leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}
