import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CopywritingContent from "@/components/layanan/CopywritingContent";

export const metadata: Metadata = {
  title: "Jasa Copywriter Profesional & Konten Sosial Media | KelasKonten",
  description:
    "Copywriting yang mengkonversi pengunjung jadi pembeli. Caption sosmed, email marketing, dan brand voice dari copywriter Indonesia berpengalaman.",
  openGraph: {
    title: "Jasa Copywriter Profesional & Konten Sosial Media | KelasKonten",
    description:
      "Copywriting yang mengkonversi pengunjung jadi pembeli. Caption sosmed, email marketing, dan brand voice dari copywriter Indonesia berpengalaman.",
  },
  alternates: { canonical: "/layanan/copywriting" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Beranda", item: "https://kelaskonten.id" },
    { "@type": "ListItem", position: 2, name: "Layanan", item: "https://kelaskonten.id/layanan" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Copywriting",
      item: "https://kelaskonten.id/layanan/copywriting",
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Jasa Copywriter Profesional & Konten Sosial Media",
  description:
    "Layanan copywriting profesional untuk caption sosial media, email marketing, iklan, dan brand voice. Konversi lebih tinggi, engagement lebih kuat.",
  provider: {
    "@type": "Organization",
    name: "KelasKonten",
    url: "https://kelaskonten.id",
  },
  areaServed: { "@type": "Country", name: "Indonesia" },
  serviceType: "Copywriting Services",
  offers: [
    {
      "@type": "Offer",
      name: "Basic Copywriting",
      price: "200000",
      priceCurrency: "IDR",
      description: "10 caption sosmed, 1 platform",
    },
    {
      "@type": "Offer",
      name: "Pro Copywriting",
      price: "750000",
      priceCurrency: "IDR",
      description: "30 caption + 3 email marketing + 1 iklan",
    },
    {
      "@type": "Offer",
      name: "Brand Voice Package",
      price: "2000000",
      priceCurrency: "IDR",
      description: "Brand guideline + 60 caption + strategi konten",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apa bedanya copywriting dengan penulisan konten biasa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Penulisan konten fokus pada memberikan informasi (artikel, blog). Copywriting fokus pada persuasi — membuat orang mengambil action seperti membeli, mendaftar, atau menghubungi. Copywriting menggunakan teknik psikologi dan formula proven seperti AIDA, PAS, dan BAB.",
      },
    },
    {
      "@type": "Question",
      name: "Untuk platform apa saja copywriting bisa digunakan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kami menulis copy untuk Instagram, Facebook, TikTok, LinkedIn, Twitter/X, email marketing, landing page, iklan Google Ads, Facebook Ads, dan website. Setiap platform memiliki gaya yang berbeda dan kami menyesuaikan tone sesuai platform.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah saya perlu menyediakan brief atau brand guideline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak harus. Jika Anda sudah memiliki brand guideline, kami akan mengikutinya. Jika belum, kami bisa membuatkan brand voice guideline sebagai bagian dari paket Brand Voice kami.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa lama waktu pengerjaan caption sosial media?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Untuk paket 10 caption, pengerjaan 2-3 hari kerja. Paket 30 caption membutuhkan 5-7 hari kerja. Untuk paket bulanan, kami menyiapkan content calendar bulanan yang dikirim di awal bulan.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah copywriting bisa meningkatkan penjualan saya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Copywriting yang baik terbukti meningkatkan konversi. Rata-rata klien kami melihat peningkatan engagement 40-60% dan peningkatan konversi 20-35% setelah menggunakan layanan copywriting kami. Namun, hasil bervariasi tergantung industri dan produk.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah ada contoh portfolio copywriting KelasKonten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tentu! Anda bisa melihat sampel karya kami di halaman portofolio. Kami juga bisa mengirimkan contoh spesifik sesuai industri Anda saat konsultasi awal — cukup hubungi kami via WhatsApp.",
      },
    },
  ],
};

export default function CopywritingPage() {
  return (
    <>
      <Navbar />
      <main>
        <CopywritingContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
