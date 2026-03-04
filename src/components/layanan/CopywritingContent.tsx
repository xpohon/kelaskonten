"use client";

import Link from "next/link";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import Container, { Section, SectionHeader } from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

/* ───────────────────────── data ───────────────────────── */

const captionBeforeAfter = [
  {
    platform: "Instagram — Produk Skincare",
    before: {
      text: "Cream wajah terbaru kami sudah tersedia. Bahan alami. Harga terjangkau. Yuk beli sekarang! #skincare #creamwajah #jualan",
      problems: ["Tidak ada hook", "Fitur, bukan benefit", "CTA lemah"],
    },
    after: {
      text: "Capek bangun pagi lihat jerawat baru?\n\nKamu sudah coba 10 produk. Hasilnya? Nol.\n\nMasalahnya bukan di kulitmu. Masalahnya di bahan yang kamu pakai.\n\nGlowCream dibuat dari 7 bahan aktif yang bekerja di lapisan dermis — bukan sekadar menutup di permukaan.\n\nHasilnya terlihat di minggu pertama. Atau uang kembali.\n\nKetuk link di bio. Stock terbatas untuk 50 orang pertama.",
      strengths: ["Hook emosional", "Problem-agitation", "Garansi & urgency"],
    },
  },
  {
    platform: "Instagram — Jasa Konsultasi",
    before: {
      text: "Kami menyediakan jasa konsultasi bisnis. Berpengalaman lebih dari 5 tahun. Hubungi kami untuk info lebih lanjut.",
      problems: ["Membosankan", "Tidak spesifik", "Tidak ada value proposition"],
    },
    after: {
      text: "Bisnis sudah jalan 2 tahun tapi omzet stuck di angka yang sama?\n\nBukan karena kamu kurang kerja keras.\n\nTapi karena strategi yang sama menghasilkan hasil yang sama.\n\n237 pemilik bisnis sudah keluar dari jebakan ini dengan framework Scale-Up Method kami.\n\nRata-rata pertumbuhan: 3.2x dalam 6 bulan.\n\nSlot konsultasi gratis bulan ini tinggal 5.\n\nDM \"SCALE\" untuk booking.",
      strengths: ["Relatable pain point", "Social proof", "Scarcity + CTA jelas"],
    },
  },
];

const pricingPlans = [
  {
    name: "Basic",
    price: "200.000",
    period: "/paket",
    desc: "Untuk yang baru mulai konsisten di sosial media",
    features: [
      "10 caption sosial media",
      "1 platform (IG/FB/TikTok)",
      "Hashtag research",
      "1 kali revisi per caption",
      "Pengerjaan 3-5 hari",
    ],
    cta: "Pesan Basic",
    popular: false,
  },
  {
    name: "Pro",
    price: "750.000",
    period: "/paket",
    desc: "Multi-platform dengan email marketing",
    features: [
      "30 caption sosial media",
      "Multi-platform (IG + FB + TikTok)",
      "3 email marketing sequence",
      "1 naskah iklan (ads copy)",
      "Content calendar",
      "2 kali revisi per konten",
      "A/B testing suggestion",
    ],
    cta: "Pilih Pro",
    popular: true,
  },
  {
    name: "Brand Voice",
    price: "2.000.000",
    period: "/paket",
    desc: "Bangun identitas brand yang konsisten dan kuat",
    features: [
      "Brand voice guideline lengkap",
      "60 caption sosial media",
      "6 email marketing sequence",
      "3 naskah iklan",
      "Strategi konten 3 bulan",
      "Unlimited revisi",
      "Dedicated copywriter",
      "Monthly strategy call",
    ],
    cta: "Bangun Brand Voice",
    popular: false,
  },
];

const emailMockup = {
  subject: "Kamu lupa sesuatu di keranjang... (dan kami simpankan)",
  preheader: "Item favoritmu hampir habis. Jangan sampai kehabisan!",
  sections: [
    {
      type: "greeting",
      content: "Hai Sari,",
    },
    {
      type: "body",
      content:
        "Kemarin kamu mampir ke toko kami dan menemukan sesuatu yang kamu suka. Tapi kamu belum checkout.\n\nKami paham — kadang butuh waktu untuk memutuskan. Tapi ini yang perlu kamu tahu:",
    },
    {
      type: "highlight",
      content: "Stock Hydrating Serum tinggal 12 unit. Dan 8 orang lain juga sedang melihat produk ini.",
    },
    {
      type: "body",
      content:
        "Sebagai tanda terima kasih karena sudah mampir, kami berikan diskon khusus 15% yang berlaku 24 jam ke depan.",
    },
    {
      type: "cta",
      content: "Selesaikan Pesanan — Hemat 15%",
    },
    {
      type: "ps",
      content: "P.S. Diskon ini otomatis hilang besok jam 23:59. Jangan sampai menyesal!",
    },
  ],
};

const faqs = [
  {
    q: "Apa bedanya copywriting dengan penulisan konten biasa?",
    a: "Penulisan konten fokus pada memberikan informasi (artikel, blog). Copywriting fokus pada persuasi — membuat orang mengambil action seperti membeli, mendaftar, atau menghubungi. Copywriting menggunakan teknik psikologi dan formula proven seperti AIDA, PAS, dan BAB.",
  },
  {
    q: "Untuk platform apa saja copywriting bisa digunakan?",
    a: "Kami menulis copy untuk Instagram, Facebook, TikTok, LinkedIn, Twitter/X, email marketing, landing page, iklan Google Ads, Facebook Ads, dan website. Setiap platform memiliki gaya yang berbeda dan kami menyesuaikan tone sesuai platform.",
  },
  {
    q: "Apakah saya perlu menyediakan brief atau brand guideline?",
    a: "Tidak harus. Jika Anda sudah memiliki brand guideline, kami akan mengikutinya. Jika belum, kami bisa membuatkan brand voice guideline sebagai bagian dari paket Brand Voice kami.",
  },
  {
    q: "Berapa lama waktu pengerjaan caption sosial media?",
    a: "Untuk paket 10 caption, pengerjaan 2-3 hari kerja. Paket 30 caption membutuhkan 5-7 hari kerja. Untuk paket bulanan, kami menyiapkan content calendar bulanan yang dikirim di awal bulan.",
  },
  {
    q: "Apakah copywriting bisa meningkatkan penjualan saya?",
    a: "Copywriting yang baik terbukti meningkatkan konversi. Rata-rata klien kami melihat peningkatan engagement 40-60% dan peningkatan konversi 20-35% setelah menggunakan layanan copywriting kami. Namun, hasil bervariasi tergantung industri dan produk.",
  },
  {
    q: "Apakah ada contoh portfolio copywriting KontenPro?",
    a: "Tentu! Anda bisa melihat sampel karya kami di halaman portofolio. Kami juga bisa mengirimkan contoh spesifik sesuai industri Anda saat konsultasi awal — cukup hubungi kami via WhatsApp.",
  },
];

/* ───────────────────────── component ───────────────────────── */

export default function CopywritingContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-60 right-0 w-[400px] h-[400px] bg-neon/5 rounded-full blur-[100px] pointer-events-none" />

        <Container>
          <AnimatedSection direction="up">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="purple" size="md">Copywriting & Sosial Media</Badge>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                Kata-kata yang <span className="gradient-text">Mengkonversi</span> Pengunjung Jadi Pembeli
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                Caption cantik tanpa strategi = konten mati. Yang Anda butuhkan bukan sekadar penulis
                — tapi copywriter yang paham psikologi pembeli.
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
                  <Button variant="outline" size="lg">Lihat Paket Harga</Button>
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-neon" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  +40% Avg. Engagement Rate
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-neon" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Framework AIDA & PAS
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-neon" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Multi-Platform Expert
                </div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Caption Before / After ── */}
      <Section>
        <Container>
          <SectionHeader
            badge="Before & After"
            title="Inilah Bedanya Caption Biasa vs. Caption yang Menjual"
            description="Lihat transformasi nyata. Dari caption yang diabaikan menjadi caption yang menghasilkan engagement dan penjualan."
          />

          <div className="space-y-12">
            {captionBeforeAfter.map((example, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.15}>
                <div className="mb-4">
                  <Badge variant="muted" size="md">{example.platform}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Before */}
                  <Card variant="default" padding="lg" hover={false} className="border-red-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10">
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-red-400 uppercase tracking-wider">Sebelum</span>
                    </div>

                    <div className="bg-surface rounded-xl p-4 mb-4">
                      <p className="text-sm text-muted leading-relaxed whitespace-pre-line">{example.before.text}</p>
                    </div>

                    <div className="space-y-2">
                      {example.before.problems.map((p) => (
                        <div key={p} className="flex items-center gap-2 text-xs text-red-400">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          {p}
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* After */}
                  <Card variant="neon" padding="lg" hover={false}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-neon/10">
                        <svg className="w-4 h-4 text-neon" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-neon uppercase tracking-wider">Sesudah — KontenPro</span>
                    </div>

                    <div className="bg-surface rounded-xl p-4 mb-4">
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{example.after.text}</p>
                    </div>

                    <div className="space-y-2">
                      {example.after.strengths.map((s) => (
                        <div key={s} className="flex items-center gap-2 text-xs text-neon">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {s}
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Pricing ── */}
      <Section id="pricing" className="bg-surface">
        <Container>
          <SectionHeader
            badge="Paket Harga"
            title="Investasi dalam Kata-kata yang Bekerja"
            description="Dari caption sosmed hingga brand voice lengkap. Pilih paket yang sesuai ambisi bisnis Anda."
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

      {/* ── Email Marketing Showcase ── */}
      <Section id="email-showcase">
        <Container size="md">
          <SectionHeader
            badge="Email Marketing"
            title="Email yang Dibaca, Diklik, dan Menghasilkan Penjualan"
            description="Ini contoh email abandoned cart yang kami buat. Open rate rata-rata: 42%. Click rate: 18%."
          />

          <AnimatedSection>
            <Card variant="glass" padding="none" hover={false} className="overflow-hidden">
              {/* Email Header */}
              <div className="bg-surface border-b border-card-border p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center text-xs font-bold text-neon">
                    K
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">KontenPro Store</p>
                    <p className="text-xs text-muted">no-reply@kontenpro.id</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="text-muted">Subject: </span>
                    <span className="font-semibold text-foreground">{emailMockup.subject}</span>
                  </p>
                  <p className="text-xs text-muted">{emailMockup.preheader}</p>
                </div>
              </div>

              {/* Email Body */}
              <div className="p-6 sm:p-8 space-y-4">
                {emailMockup.sections.map((section, i) => {
                  if (section.type === "greeting") {
                    return (
                      <p key={i} className="text-foreground font-medium">{section.content}</p>
                    );
                  }
                  if (section.type === "body") {
                    return (
                      <p key={i} className="text-sm text-muted leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
                    );
                  }
                  if (section.type === "highlight") {
                    return (
                      <div key={i} className="bg-neon/5 border border-neon/20 rounded-xl p-4">
                        <p className="text-sm text-neon font-medium">{section.content}</p>
                      </div>
                    );
                  }
                  if (section.type === "cta") {
                    return (
                      <div key={i} className="text-center py-2">
                        <span className="inline-block px-8 py-3 bg-neon text-[#0a0a0f] font-semibold rounded-xl text-sm">
                          {section.content}
                        </span>
                      </div>
                    );
                  }
                  if (section.type === "ps") {
                    return (
                      <p key={i} className="text-xs text-muted italic border-t border-card-border pt-4">
                        {section.content}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Annotation bar */}
              <div className="bg-purple/5 border-t border-purple/20 p-4 sm:p-6">
                <p className="text-xs text-purple-light font-medium mb-2">Teknik yang digunakan:</p>
                <div className="flex flex-wrap gap-2">
                  {["Personalisasi nama", "Scarcity (stock terbatas)", "Social proof", "Urgency (batas waktu)", "P.S. line persuasif"].map(
                    (t) => (
                      <Badge key={t} variant="purple" size="sm">{t}</Badge>
                    )
                  )}
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── FAQ ── */}
      <Section className="bg-surface" id="faq">
        <Container size="md">
          <SectionHeader
            badge="FAQ"
            title="Pertanyaan yang Sering Diajukan"
            description="Semua yang perlu Anda ketahui tentang layanan copywriting kami."
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
              <div className="absolute top-0 left-0 w-64 h-64 bg-purple/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold">
                  Siap Punya Konten yang{" "}
                  <span className="gradient-text">Benar-benar Menjual?</span>
                </h2>
                <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
                  Kompetitor Anda sudah investasi di copywriting profesional. Setiap hari tanpa copy
                  yang kuat, Anda kehilangan calon pembeli yang seharusnya bisa Anda konversi.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/pesan">
                    <Button size="lg">
                      Konsultasi Gratis Sekarang
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                  </Link>
                  <Link href="/portofolio">
                    <Button variant="outline" size="lg">
                      Lihat Portofolio
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
