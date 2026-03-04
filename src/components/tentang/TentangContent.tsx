"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import Container, { Section, SectionHeader } from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

/* ───────────────────────── data ───────────────────────── */

const teamMembers = [
  {
    name: "Andi Nugroho",
    role: "Founder & SEO Strategist",
    initials: "AN",
    color: "bg-neon/20 text-neon",
    bio: "8+ tahun di digital marketing. Pernah menangani SEO untuk startup unicorn dan enterprise. Obsesi: membuat bisnis kecil bisa bersaing di Google.",
  },
  {
    name: "Sari Wulandari",
    role: "Head of Content",
    initials: "SW",
    color: "bg-purple/20 text-purple-light",
    bio: "Mantan editor majalah bisnis nasional. Memimpin tim penulis yang menghasilkan 200+ artikel berkualitas setiap bulan. Standarnya: jika tidak layak baca, tidak layak publish.",
  },
  {
    name: "Rizki Pratama",
    role: "Senior Copywriter",
    initials: "RP",
    color: "bg-blue-500/20 text-blue-400",
    bio: "Spesialis konversi dengan pengalaman di agency multinasional. Sudah menulis copy yang menghasilkan miliaran rupiah penjualan untuk klien di berbagai industri.",
  },
  {
    name: "Dina Rahayu",
    role: "Social Media Specialist",
    initials: "DR",
    color: "bg-pink-500/20 text-pink-400",
    bio: "Pernah handle akun dengan 500K+ followers. Paham algoritma setiap platform dan tahu persis konten seperti apa yang viral — dan yang lebih penting, yang menghasilkan.",
  },
];

const values = [
  {
    title: "Hasil, Bukan Janji",
    desc: "Kami tidak menjual harapan. Setiap strategi diukur dengan data nyata — traffic, ranking, konversi. Jika tidak berhasil, kami evaluasi dan perbaiki.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    ),
  },
  {
    title: "Transparan 100%",
    desc: "Anda tahu persis apa yang kami kerjakan, berapa biayanya, dan apa hasilnya. Tidak ada biaya tersembunyi, tidak ada laporan yang dimanipulasi.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    ),
  },
  {
    title: "Kualitas Tanpa Kompromi",
    desc: "Setiap artikel, caption, dan strategi melewati quality check berlapis. Kami lebih baik terlambat sehari daripada mengirim karya yang tidak memenuhi standar.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
    ),
  },
  {
    title: "Partner, Bukan Vendor",
    desc: "Kami tidak sekadar mengerjakan order. Kami menjadi bagian dari tim Anda — memahami bisnis, tujuan, dan tantangan Anda untuk memberikan solusi terbaik.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    ),
  },
];

const milestones = [
  { year: "2020", title: "Didirikan", desc: "KelasKonten lahir dari frustrasi: mengapa konten berkualitas begitu susah ditemukan di Indonesia?" },
  { year: "2021", title: "50 Klien Pertama", desc: "Dari mulut ke mulut, kami tumbuh organik. Bukti bahwa kualitas berbicara lebih keras dari iklan." },
  { year: "2022", title: "200 Artikel/Bulan", desc: "Tim berkembang menjadi 15 orang. Produksi konten meningkat tanpa mengorbankan kualitas." },
  { year: "2023", title: "Top 10 Agency", desc: "Diakui sebagai salah satu content agency terbaik di Indonesia oleh beberapa platform review." },
  { year: "2024", title: "300+ Klien Puas", desc: "Milestone yang membuktikan konsistensi kami. Rata-rata klien bertahan 12+ bulan bersama kami." },
  { year: "2025", title: "Expanding", desc: "Memperluas layanan ke SEA market. Karena konten berkualitas tidak mengenal batas negara." },
];

const trustedBy = [
  "TokoBangunan.id",
  "SehatPlus",
  "RumahKreatif",
  "DigitalMart",
  "EduPlatform",
  "GreenTech ID",
  "FinanceHub",
  "TravelNusa",
];

/* ───────────────────────── component ───────────────────────── */

export default function TentangContent() {
  return (
    <>
      {/* ── Hero / Brand Story ── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-neon/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple/10 rounded-full blur-[100px] pointer-events-none" />

        <Container size="md">
          <AnimatedSection direction="up">
            <div className="text-center">
              <Badge variant="neon" size="md">Tentang KelasKonten</Badge>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                Tim di Balik <span className="gradient-text">Konten Berkualitas</span>
              </h1>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="mt-12 max-w-3xl mx-auto space-y-6 text-lg text-muted leading-relaxed">
              <p>
                KelasKonten dimulai dari frustrasi yang sama dengan yang Anda rasakan: <span className="text-foreground font-medium">konten yang tidak menghasilkan apa-apa.</span>
              </p>
              <p>
                Founder kami, Andi Nugroho, menghabiskan 5 tahun bekerja di agency digital besar. Tahu apa yang dia temukan?
                Sebagian besar konten yang diproduksi hanya sekadar memenuhi kuota — bukan menghasilkan dampak nyata untuk bisnis klien.
              </p>
              <p>
                Artikel ditulis asal-asalan. SEO dilakukan setengah hati. Caption sosmed dibuat tanpa riset. Dan klien?
                Klien diminta sabar menunggu hasil yang tidak pernah datang.
              </p>
              <p className="text-foreground font-medium">
                Itu yang memotivasi lahirnya KelasKonten di tahun 2020.
              </p>
              <p>
                Misi kami sederhana: membuktikan bahwa konten berkualitas bisa menghasilkan <span className="text-neon">ROI yang nyata dan terukur</span>.
                Bukan sekadar metriks vanity. Tapi traffic yang berubah jadi leads. Leads yang berubah jadi penjualan.
              </p>
              <p>
                Hari ini, dengan 300+ klien puas dan ribuan konten yang sudah kami produksi,
                kami masih memegang prinsip yang sama: <span className="text-foreground font-medium">setiap kata harus bekerja untuk bisnis Anda.</span>
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Team ── */}
      <Section>
        <Container>
          <SectionHeader
            badge="Tim Kami"
            title="Manusia di Balik Setiap Konten"
            description="Bukan freelancer random. Ini adalah tim tetap yang berdedikasi untuk kesuksesan konten Anda."
          />

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <StaggerItem key={member.name}>
                <Card variant="gradient" padding="lg" className="h-full text-center">
                  {/* Avatar */}
                  <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl font-heading font-bold ${member.color}`}>
                    {member.initials}
                  </div>

                  <h3 className="mt-4 text-lg font-heading font-bold">{member.name}</h3>
                  <p className="text-sm text-neon font-medium">{member.role}</p>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{member.bio}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ── Values ── */}
      <Section className="bg-surface">
        <Container>
          <SectionHeader
            badge="Nilai Kami"
            title="Prinsip yang Tidak Bisa Ditawar"
            description="Empat pilar yang menjadi fondasi setiap keputusan dan karya yang kami hasilkan."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <Card variant="default" padding="lg" className="h-full">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-neon/10 text-neon shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold">{value.title}</h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed">{value.desc}</p>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ── Timeline ── */}
      <Section>
        <Container size="md">
          <SectionHeader
            badge="Perjalanan Kami"
            title="Dari Nol Sampai 300+ Klien"
            description="Setiap milestone adalah bukti bahwa fokus pada kualitas selalu membuahkan hasil."
          />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-card-border sm:-translate-x-px" />

            <div className="space-y-8 sm:space-y-12">
              {milestones.map((ms, i) => (
                <AnimatedSection key={ms.year} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                  <div className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                    {/* Content */}
                    <div className={`flex-1 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                      <Card variant="gradient" padding="md" hover>
                        <span className="text-xs font-mono font-bold text-neon">{ms.year}</span>
                        <h3 className="text-lg font-heading font-bold mt-1">{ms.title}</h3>
                        <p className="text-sm text-muted mt-2 leading-relaxed">{ms.desc}</p>
                      </Card>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-6 z-10">
                      <motion.div
                        className="w-3 h-3 rounded-full bg-neon shadow-[0_0_12px_rgba(79,255,176,0.4)]"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring" }}
                      />
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden sm:block flex-1" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Trusted By ── */}
      <Section className="bg-surface" padding="sm">
        <Container>
          <AnimatedSection>
            <div className="text-center">
              <p className="text-sm text-muted uppercase tracking-widest font-medium mb-8">Dipercaya oleh</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {trustedBy.map((brand) => (
                  <div
                    key={brand}
                    className="flex items-center justify-center h-16 rounded-xl bg-card-bg border border-card-border px-6"
                  >
                    <span className="text-sm font-heading font-bold text-muted">{brand}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section>
        <Container>
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card-bg to-surface border border-card-border p-10 sm:p-16 text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-neon/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold">
                  Siap Bekerja Sama dengan Tim yang{" "}
                  <span className="gradient-text">Peduli dengan Hasil?</span>
                </h2>
                <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
                  Kami tidak menerima semua klien. Tapi jika kami menerima Anda, kami berikan
                  100% dedikasi. Mari bicara tentang apa yang bisa kami capai bersama.
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
