"use client";

import Link from "next/link";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import Container, { Section, SectionHeader } from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

/* ───────────────────────── data ───────────────────────── */

const beforeAfter = {
  before: {
    label: "Artikel Asal-asalan",
    items: [
      "Judul generik tanpa keyword",
      "Tidak ada riset — hanya opini penulis",
      "Struktur berantakan, tanpa heading",
      "Tidak ada internal/external link",
      "Keyword stuffing berlebihan",
      "Tidak ada CTA atau next step",
    ],
  },
  after: {
    label: "Artikel KelasKonten",
    items: [
      "Judul memikat dengan keyword target",
      "Riset mendalam dari 10+ sumber terpercaya",
      "Heading terstruktur H1-H2-H3",
      "Internal link + referensi otoritatif",
      "Keyword natural, density optimal 1-2%",
      "CTA jelas yang mengarahkan pembaca",
    ],
  },
};

const pricingPlans = [
  {
    name: "Starter",
    price: "150.000",
    period: "/artikel",
    desc: "Satu artikel berkualitas untuk mulai membangun kehadiran online",
    features: [
      "1 artikel 500 kata",
      "SEO-friendly & original",
      "Riset topik dasar",
      "Meta title & description",
      "1 kali revisi",
      "Pengerjaan 2-3 hari",
    ],
    cta: "Pesan Sekarang",
    popular: false,
  },
  {
    name: "Growth",
    price: "500.000",
    period: "/paket",
    desc: "Mulai konsisten membangun traffic organik",
    features: [
      "5 artikel 800 kata",
      "Riset keyword mendalam",
      "Optimasi SEO on-page lengkap",
      "Internal linking strategy",
      "2 kali revisi per artikel",
      "Pengerjaan 7-10 hari",
      "Laporan keyword & performance",
    ],
    cta: "Pilih Growth",
    popular: true,
  },
  {
    name: "Bulanan",
    price: "1.500.000",
    period: "/bulan",
    desc: "Mesin konten lengkap untuk website Anda",
    features: [
      "20 artikel/bulan",
      "Editorial calendar terencana",
      "Riset keyword + competitor analysis",
      "Full SEO optimization",
      "Unlimited revisi",
      "Dedicated content writer",
      "Laporan performa mingguan",
      "Konsultasi strategi konten",
    ],
    cta: "Mulai Bulanan",
    popular: false,
  },
];

const writingProcess = [
  {
    step: "01",
    title: "Brief & Riset Keyword",
    desc: "Kami pelajari bisnis Anda, identifikasi target audience, dan riset keyword dengan volume tinggi dan kompetisi sesuai.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    ),
  },
  {
    step: "02",
    title: "Outline & Struktur",
    desc: "Membuat outline artikel dengan heading structure yang SEO-friendly. Anda bisa review outline sebelum kami mulai menulis.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h10M4 18h10" /></svg>
    ),
  },
  {
    step: "03",
    title: "Penulisan Konten",
    desc: "Penulis berpengalaman menulis artikel yang informatif, engaging, dan menjawab search intent. Bukan hasil AI tanpa editing.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
    ),
  },
  {
    step: "04",
    title: "Optimasi SEO",
    desc: "Optimasi meta tag, alt text, internal linking, keyword density, dan readability score untuk memastikan artikel siap ranking.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
  },
  {
    step: "05",
    title: "Review & QA",
    desc: "Pengecekan plagiarism, grammar, fakta, dan kualitas tulisan oleh editor senior. Artikel hanya dikirim jika lolos semua QA.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  },
  {
    step: "06",
    title: "Kirim & Revisi",
    desc: "Artikel dikirim sesuai jadwal. Jika ada yang perlu diubah, revisi dikerjakan dalam 24 jam. Sampai Anda puas.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
  },
];

const faqs = [
  {
    q: "Berapa lama waktu pengerjaan satu artikel?",
    a: "Untuk artikel standar 500-800 kata, waktu pengerjaan 2-3 hari kerja. Artikel panjang 1500+ kata membutuhkan 4-5 hari kerja. Untuk paket bulanan, kami menyusun editorial calendar sehingga artikel dikirim secara terjadwal.",
  },
  {
    q: "Apakah artikel yang ditulis benar-benar original?",
    a: "100% original. Setiap artikel melewati pengecekan plagiarism menggunakan Copyscape dan Grammarly sebelum dikirim ke klien. Kami juga memberikan laporan originalitas bersama setiap artikel.",
  },
  {
    q: "Apakah bisa request topik atau keyword tertentu?",
    a: "Tentu! Anda bisa memberikan topik dan keyword target. Jika tidak memiliki ide, tim kami akan melakukan riset keyword dan menyarankan topik-topik yang berpotensi mendatangkan traffic tinggi ke website Anda.",
  },
  {
    q: "Berapa kali revisi yang didapatkan?",
    a: "Paket Starter mendapat 1 kali revisi, paket Growth mendapat 2 kali revisi, dan paket Bulanan mendapat unlimited revisi. Kami berkomitmen mengerjakan sampai Anda puas dengan hasilnya.",
  },
  {
    q: "Apakah artikel sudah termasuk gambar dan optimasi SEO?",
    a: "Semua artikel sudah termasuk optimasi SEO on-page (meta title, meta description, heading structure, internal linking suggestion). Untuk gambar, kami menyediakan rekomendasi gambar dan alt text. Gambar custom tersedia sebagai add-on.",
  },
  {
    q: "Bagaimana jika saya tidak puas dengan hasil artikelnya?",
    a: "Kepuasan klien adalah prioritas kami. Jika setelah revisi Anda masih tidak puas, kami akan menulis ulang artikel dari awal tanpa biaya tambahan. Jika tetap tidak sesuai, kami berikan refund penuh — tanpa syarat.",
  },
];

/* ───────────────────────── component ───────────────────────── */

export default function PenulisanKontenContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-neon/5 rounded-full blur-[100px] pointer-events-none" />

        <Container>
          <AnimatedSection direction="up">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="purple" size="md">Jasa Penulisan Konten</Badge>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                Konten yang <span className="gradient-text">Ranking di Google</span> dan Menghasilkan Leads
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                Menulis konten asal-asalan itu murah. Tapi konten yang ranking di Google
                dan menghasilkan leads? Itu butuh keahlian.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/pesan">
                  <Button size="lg">
                    Pesan Artikel Sekarang
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </Link>
                <Link href="#pricing">
                  <Button variant="outline" size="lg">Lihat Paket Harga</Button>
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-neon" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  100% Original & Plagiarism-Free
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-neon" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  5,000+ Artikel Ditulis
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-neon" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Revisi Sampai Puas
                </div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Before / After ── */}
      <Section>
        <Container>
          <SectionHeader
            badge="Perbedaan Nyata"
            title="Artikel Biasa vs. Artikel KelasKonten"
            description="Konten bukan sekadar kata-kata. Ini perbandingan langsung antara artikel asal-asalan dan artikel yang kami tulis."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Before */}
            <AnimatedSection direction="left">
              <Card variant="default" padding="lg" hover={false} className="h-full border-red-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-red-400">{beforeAfter.before.label}</h3>
                </div>
                <ul className="space-y-4">
                  {beforeAfter.before.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>

            {/* After */}
            <AnimatedSection direction="right">
              <Card variant="neon" padding="lg" hover={false} className="h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-neon/10">
                    <svg className="w-5 h-5 text-neon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-neon">{beforeAfter.after.label}</h3>
                </div>
                <ul className="space-y-4">
                  {beforeAfter.after.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-neon shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      {/* ── Pricing ── */}
      <Section id="pricing" className="bg-surface">
        <Container>
          <SectionHeader
            badge="Paket Harga"
            title="Pilih Paket yang Sesuai Kebutuhan Anda"
            description="Mulai dari satu artikel sampai langganan bulanan. Semua dilengkapi riset keyword dan optimasi SEO."
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
                      <Badge variant="neon" size="md">Best Value</Badge>
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

      {/* ── Writing Process ── */}
      <Section id="proses">
        <Container>
          <SectionHeader
            badge="Proses Kami"
            title="Bagaimana Kami Menulis Artikel yang Ranking"
            description="Bukan sekadar mengetik. Setiap artikel melewati 6 tahap ketat sebelum sampai ke tangan Anda."
          />

          <div className="relative">
            {/* Vertical line connector for desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-card-border -translate-x-1/2" />

            <div className="space-y-8 lg:space-y-12">
              {writingProcess.map((item, i) => (
                <AnimatedSection key={item.step} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                  <div className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                    <div className="flex-1 w-full">
                      <Card variant="gradient" padding="lg" hover>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-neon/10 text-neon shrink-0">
                            {item.icon}
                          </div>
                          <div>
                            <span className="text-xs text-neon font-mono font-bold">STEP {item.step}</span>
                            <h3 className="text-xl font-heading font-bold mt-1">{item.title}</h3>
                            <p className="text-sm text-muted mt-2 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Center dot */}
                    <div className="hidden lg:flex w-4 h-4 rounded-full bg-neon shrink-0 shadow-[0_0_12px_rgba(79,255,176,0.4)]" />

                    <div className="flex-1 hidden lg:block" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── FAQ ── */}
      <Section className="bg-surface" id="faq">
        <Container size="md">
          <SectionHeader
            badge="FAQ"
            title="Pertanyaan yang Sering Diajukan"
            description="Semua yang perlu Anda ketahui tentang layanan penulisan konten kami."
          />

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <details className="group rounded-2xl bg-card-bg border border-card-border overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none select-none">
                    <span className="font-heading font-semibold text-foreground">{faq.q}</span>
                    <svg
                      className="w-5 h-5 text-muted shrink-0 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-sm text-muted leading-relaxed">{faq.a}</div>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section>
        <Container>
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card-bg to-surface border border-card-border p-10 sm:p-16 text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold">
                  Lihat Kualitas Tulisan Kami <span className="gradient-text">Secara Langsung</span>
                </h2>
                <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
                  Jangan percaya kata-kata kami. Lihat sendiri artikel-artikel yang sudah kami tulis
                  dan bagaimana mereka ranking di halaman 1 Google.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/blog">
                    <Button size="lg">
                      Lihat Sampel Artikel Kami
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                  </Link>
                  <Link href="/pesan">
                    <Button variant="outline" size="lg">
                      Pesan Artikel Sekarang
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
