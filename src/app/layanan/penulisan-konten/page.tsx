import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PenulisanKontenContent from "@/components/layanan/PenulisanKontenContent";

export const metadata: Metadata = {
  title: "Jasa Penulisan Artikel & Konten SEO Profesional | KelasKonten",
  description:
    "Artikel SEO-friendly berkualitas tinggi yang ranking di Google. 300+ klien puas, riset keyword mendalam, revisi sampai puas.",
  openGraph: {
    title: "Jasa Penulisan Artikel & Konten SEO Profesional | KelasKonten",
    description:
      "Artikel SEO-friendly berkualitas tinggi yang ranking di Google. 300+ klien puas, riset keyword mendalam, revisi sampai puas.",
  },
  alternates: { canonical: "/layanan/penulisan-konten" },
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
      name: "Penulisan Konten",
      item: "https://kelaskonten.id/layanan/penulisan-konten",
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Jasa Penulisan Artikel & Konten SEO",
  description:
    "Layanan penulisan artikel SEO-friendly berkualitas tinggi. Riset keyword mendalam, optimasi on-page, dan revisi sampai puas.",
  provider: {
    "@type": "Organization",
    name: "KelasKonten",
    url: "https://kelaskonten.id",
  },
  areaServed: { "@type": "Country", name: "Indonesia" },
  serviceType: "Content Writing",
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "150000",
      priceCurrency: "IDR",
      description: "1 artikel 500 kata, SEO-friendly, 1 revisi",
    },
    {
      "@type": "Offer",
      name: "Growth",
      price: "500000",
      priceCurrency: "IDR",
      description: "5 artikel 800 kata, riset keyword, 2 revisi",
    },
    {
      "@type": "Offer",
      name: "Bulanan",
      price: "1500000",
      priceCurrency: "IDR",
      description: "20 artikel/bulan, editorial calendar, unlimited revisi",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Berapa lama waktu pengerjaan satu artikel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Untuk artikel standar 500-800 kata, waktu pengerjaan 2-3 hari kerja. Artikel panjang 1500+ kata membutuhkan 4-5 hari kerja. Untuk paket bulanan, kami menyusun editorial calendar sehingga artikel dikirim secara terjadwal.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah artikel yang ditulis benar-benar original?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "100% original. Setiap artikel melewati pengecekan plagiarism menggunakan Copyscape dan Grammarly sebelum dikirim ke klien. Kami juga memberikan laporan originalitas bersama setiap artikel.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah bisa request topik atau keyword tertentu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tentu! Anda bisa memberikan topik dan keyword target. Jika tidak memiliki ide, tim kami akan melakukan riset keyword dan menyarankan topik-topik yang berpotensi mendatangkan traffic tinggi ke website Anda.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa kali revisi yang didapatkan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paket Starter mendapat 1 kali revisi, paket Growth mendapat 2 kali revisi, dan paket Bulanan mendapat unlimited revisi. Kami berkomitmen mengerjakan sampai Anda puas dengan hasilnya.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah artikel sudah termasuk gambar dan optimasi SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Semua artikel sudah termasuk optimasi SEO on-page (meta title, meta description, heading structure, internal linking suggestion). Untuk gambar, kami menyediakan rekomendasi gambar dan alt text. Gambar custom tersedia sebagai add-on.",
      },
    },
    {
      "@type": "Question",
      name: "Bagaimana jika saya tidak puas dengan hasil artikelnya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kepuasan klien adalah prioritas kami. Jika setelah revisi Anda masih tidak puas, kami akan menulis ulang artikel dari awal tanpa biaya tambahan. Jika tetap tidak sesuai, kami berikan refund penuh — tanpa syarat.",
      },
    },
  ],
};

export default function PenulisanKontenPage() {
  return (
    <>
      <Navbar />
      <main>
        <PenulisanKontenContent />
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
