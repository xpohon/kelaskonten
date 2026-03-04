"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import Container, { Section, SectionHeader } from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

/* ───────────────────────── data ───────────────────────── */

const processSteps = [
  {
    num: "01",
    title: "Audit Teknikal",
    desc: "Kami membedah website Anda secara menyeluruh: kecepatan, crawlability, indexing, dan 200+ faktor teknikal lainnya.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
  },
  {
    num: "02",
    title: "Riset Keyword",
    desc: "Menemukan keyword dengan volume tinggi dan kompetisi rendah yang paling relevan dengan bisnis Anda.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    ),
  },
  {
    num: "03",
    title: "On-Page Optimization",
    desc: "Optimasi meta tag, heading structure, internal linking, schema markup, dan konten halaman agar sesuai standar Google.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
    ),
  },
  {
    num: "04",
    title: "Pembuatan Konten",
    desc: "Konten SEO-friendly yang informatif, engaging, dan menjawab search intent pengguna. Bukan sekadar keyword stuffing.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    ),
  },
  {
    num: "05",
    title: "Link Building",
    desc: "Backlink berkualitas dari website otoritatif di niche Anda. Manual outreach, bukan spam directory.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
    ),
  },
  {
    num: "06",
    title: "Monitoring & Laporan",
    desc: "Tracking ranking, traffic, dan konversi secara berkala. Anda tahu persis ROI dari setiap rupiah yang diinvestasikan.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    ),
  },
];

const pricingPlans = [
  {
    name: "Basic",
    price: "500.000",
    period: "/bulan",
    desc: "Cocok untuk bisnis kecil yang baru memulai SEO",
    features: [
      "5 keyword target",
      "Audit on-page dasar",
      "Optimasi meta tag & heading",
      "Laporan bulanan",
      "Email support",
    ],
    cta: "Mulai Basic",
    popular: false,
  },
  {
    name: "Pro",
    price: "1.500.000",
    period: "/bulan",
    desc: "Untuk bisnis yang serius ingin mendominasi Google",
    features: [
      "15 keyword target",
      "On-page + off-page SEO",
      "Backlink building berkualitas",
      "Pembuatan 4 artikel/bulan",
      "Laporan mingguan",
      "WhatsApp support",
      "Competitor analysis",
    ],
    cta: "Pilih Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "3.500.000",
    period: "/bulan",
    desc: "Strategi SEO menyeluruh untuk dominasi total",
    features: [
      "Unlimited keyword target",
      "Full SEO strategy & execution",
      "Dedicated account manager",
      "8 artikel premium/bulan",
      "Technical SEO mendalam",
      "Dashboard real-time",
      "Meeting bulanan",
      "Priority support 24/7",
    ],
    cta: "Hubungi Kami",
    popular: false,
  },
];

const trafficData = [
  { month: "Jan", value: 15 },
  { month: "Feb", value: 22 },
  { month: "Mar", value: 35 },
  { month: "Apr", value: 48 },
  { month: "Mei", value: 65 },
  { month: "Jun", value: 82 },
];

const keywordRankings = [
  { keyword: "jasa seo jakarta", before: 47, after: 3, change: "+44" },
  { keyword: "agency seo indonesia", before: 52, after: 7, change: "+45" },
  { keyword: "optimasi website", before: 31, after: 2, change: "+29" },
  { keyword: "jasa backlink berkualitas", before: 68, after: 5, change: "+63" },
  { keyword: "seo profesional", before: 29, after: 1, change: "+28" },
];

const monthlyChecklist = [
  { task: "Audit teknikal & crawl error fix", icon: "🔧" },
  { task: "Riset keyword baru & update target", icon: "🔍" },
  { task: "Optimasi on-page halaman prioritas", icon: "📝" },
  { task: "Pembuatan & publikasi konten baru", icon: "📄" },
  { task: "Outreach backlink ke website otoritatif", icon: "🔗" },
  { task: "Monitoring ranking & kompetitor", icon: "📊" },
  { task: "Analisis performa & rekomendasi", icon: "📈" },
  { task: "Laporan lengkap ke klien", icon: "📋" },
  { task: "Review & update strategi", icon: "🎯" },
];

const faqs = [
  {
    q: "Berapa lama hasil SEO bisa terlihat?",
    a: "Umumnya hasil SEO mulai terlihat dalam 30-90 hari, tergantung kompetisi keyword dan kondisi website Anda saat ini. Rata-rata klien kami mencapai halaman 1 Google dalam 90 hari untuk keyword medium competition.",
  },
  {
    q: "Apakah ada jaminan ranking halaman 1 Google?",
    a: "Tidak ada yang bisa menjamin ranking #1 di Google karena algoritma terus berubah. Namun, kami menjamin proses SEO white-hat yang terbukti efektif. 87% klien kami berhasil masuk top 10 Google dalam 90 hari pertama.",
  },
  {
    q: "Apa bedanya paket Basic, Pro, dan Enterprise?",
    a: "Paket Basic fokus pada optimasi on-page dasar dengan 5 keyword target. Paket Pro mencakup on-page dan off-page SEO dengan backlink building untuk 15 keyword. Paket Enterprise menawarkan strategi SEO menyeluruh tanpa batas keyword dengan dedicated manager.",
  },
  {
    q: "Apakah saya bisa melihat laporan progress SEO?",
    a: "Tentu! Semua paket mendapatkan laporan berkala. Paket Basic mendapat laporan bulanan, paket Pro mendapat laporan mingguan, dan paket Enterprise mendapat akses dashboard real-time plus meeting bulanan.",
  },
  {
    q: "Apakah KontenPro menggunakan teknik SEO black-hat?",
    a: "Tidak. Kami hanya menggunakan teknik SEO white-hat yang sesuai dengan Google Webmaster Guidelines. Teknik black-hat mungkin memberikan hasil cepat tapi berisiko terkena penalti Google yang bisa merusak website Anda secara permanen.",
  },
  {
    q: "Bisakah saya membatalkan langganan kapan saja?",
    a: "Ya, Anda bisa membatalkan langganan kapan saja tanpa biaya penalti. Namun, kami merekomendasikan minimal 3 bulan untuk melihat hasil yang signifikan karena SEO adalah investasi jangka panjang.",
  },
];

/* ───────────────────────── component ───────────────────────── */

export default function SEOContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        {/* bg glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-neon/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple/10 rounded-full blur-[100px] pointer-events-none" />

        <Container>
          <AnimatedSection direction="up">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="neon" size="md">Jasa SEO Profesional Indonesia</Badge>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                Bawa Website Anda ke{" "}
                <span className="gradient-text">Halaman 1 Google</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                Website Anda layak ditemukan di Google. Tapi tanpa strategi SEO yang benar,
                Anda tenggelam di halaman 10 — tak terlihat, tak tersentuh traffic.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/pesan">
                  <Button size="lg">
                    Konsultasi Gratis
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </Link>
                <Link href="#pricing">
                  <Button variant="outline" size="lg">
                    Lihat Paket Harga
                  </Button>
                </Link>
              </div>

              {/* trust signals */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-neon" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Rata-rata Top 10 dalam 90 Hari
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-neon" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  300+ Klien Puas
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-neon" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  100% White-Hat SEO
                </div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Proses Kerja SEO ── */}
      <Section id="proses">
        <Container>
          <SectionHeader
            badge="Proses Kerja"
            title="6 Langkah Menuju Halaman 1 Google"
            description="Setiap langkah dirancang berdasarkan data dan pengalaman menangani 300+ website di berbagai industri."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step) => (
              <StaggerItem key={step.num}>
                <Card variant="gradient" padding="lg" className="h-full relative group">
                  <span className="absolute top-6 right-6 text-5xl font-heading font-bold text-card-border group-hover:text-neon/10 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-neon/10 text-neon mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ── Pricing ── */}
      <Section id="pricing" className="bg-surface">
        <Container>
          <SectionHeader
            badge="Paket Harga"
            title="Investasi SEO Sesuai Budget Anda"
            description="Tanpa kontrak jangka panjang. Mulai kapan saja, berhenti kapan saja. Tapi kami yakin Anda tidak akan mau berhenti."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pricingPlans.map((plan) => (
              <StaggerItem key={plan.name}>
                <Card
                  variant={plan.popular ? "neon" : "default"}
                  padding="none"
                  hover
                  className={`h-full flex flex-col ${plan.popular ? "relative" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="neon" size="md">Paling Populer</Badge>
                    </div>
                  )}

                  <div className="p-8 pb-0">
                    <h3 className="text-xl font-heading font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted mt-1">{plan.desc}</p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-sm text-muted">Rp</span>
                      <span className="text-4xl font-heading font-bold gradient-text">{plan.price}</span>
                      <span className="text-sm text-muted">{plan.period}</span>
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <ul className="space-y-3 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm">
                          <svg className="w-5 h-5 text-neon shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/pesan" className="mt-8 block">
                      <Button
                        variant={plan.popular ? "primary" : "outline"}
                        className="w-full"
                        size="lg"
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ── SEO Report Mockup ── */}
      <Section id="report">
        <Container>
          <SectionHeader
            badge="Laporan Transparan"
            title="Anda Melihat Semua Data. Tanpa yang Disembunyikan."
            description="Setiap bulan, kami kirimkan laporan lengkap yang menunjukkan persis bagaimana SEO bekerja untuk bisnis Anda."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Traffic Growth Chart */}
            <AnimatedSection direction="left">
              <Card variant="glass" padding="lg" hover={false}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading font-bold text-lg">Pertumbuhan Traffic Organik</h3>
                  <Badge variant="success" size="sm">+447%</Badge>
                </div>

                <div className="flex items-end gap-3 h-48">
                  {trafficData.map((d) => (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs text-muted">{d.value}K</span>
                      <motion.div
                        className="w-full rounded-t-lg bg-gradient-to-t from-neon/30 to-neon"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${d.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                      />
                      <span className="text-xs text-muted">{d.month}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </AnimatedSection>

            {/* Keyword Rankings Table */}
            <AnimatedSection direction="right">
              <Card variant="glass" padding="lg" hover={false}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading font-bold text-lg">Ranking Keyword</h3>
                  <Badge variant="neon" size="sm">Top 10</Badge>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-card-border">
                        <th className="text-left py-3 text-muted font-medium">Keyword</th>
                        <th className="text-center py-3 text-muted font-medium">Sebelum</th>
                        <th className="text-center py-3 text-muted font-medium">Sesudah</th>
                        <th className="text-right py-3 text-muted font-medium">Naik</th>
                      </tr>
                    </thead>
                    <tbody>
                      {keywordRankings.map((row) => (
                        <tr key={row.keyword} className="border-b border-card-border/50">
                          <td className="py-3 text-foreground">{row.keyword}</td>
                          <td className="py-3 text-center text-red-400">#{row.before}</td>
                          <td className="py-3 text-center text-neon font-bold">#{row.after}</td>
                          <td className="py-3 text-right">
                            <Badge variant="success" size="sm">{row.change}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      {/* ── Monthly Checklist ── */}
      <Section className="bg-surface">
        <Container>
          <SectionHeader
            badge="Setiap Bulan"
            title="Ini yang Kami Kerjakan untuk Anda"
            description="Bukan sekadar janji. Ini checklist nyata yang kami eksekusi setiap bulan untuk setiap klien."
          />

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {monthlyChecklist.map((item) => (
              <StaggerItem key={item.task}>
                <Card variant="default" padding="md" className="flex items-center gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-medium text-foreground">{item.task}</span>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ── FAQ ── */}
      <Section id="faq">
        <Container size="md">
          <SectionHeader
            badge="FAQ"
            title="Pertanyaan yang Sering Diajukan"
            description="Belum menemukan jawabannya? Hubungi kami via WhatsApp untuk konsultasi gratis."
          />

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <FAQItem question={faq.q} answer={faq.a} />
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section className="bg-surface">
        <Container>
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card-bg to-surface border border-card-border p-10 sm:p-16 text-center">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-neon/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold">
                  Siap Mendominasi <span className="gradient-text">Halaman 1 Google?</span>
                </h2>
                <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
                  Setiap hari tanpa SEO adalah hari di mana kompetitor Anda mencuri traffic yang seharusnya milik Anda.
                  Mulai sekarang.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/pesan">
                    <Button size="lg">
                      Mulai Konsultasi Gratis
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                  </Link>
                  <Link href="https://wa.me/6281234567890" target="_blank">
                    <Button variant="outline" size="lg">
                      Chat via WhatsApp
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </Section>
    </>
  );
}

/* ── FAQ accordion item ── */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-2xl bg-card-bg border border-card-border overflow-hidden">
      <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none select-none">
        <span className="font-heading font-semibold text-foreground">{question}</span>
        <svg
          className="w-5 h-5 text-muted shrink-0 transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="px-6 pb-6 text-sm text-muted leading-relaxed">{answer}</div>
    </details>
  );
}
