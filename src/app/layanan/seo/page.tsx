import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SEOContent from "@/components/layanan/SEOContent";

export const metadata: Metadata = {
  title: "Jasa SEO Profesional Indonesia — Ranking Halaman 1 Google | KelasKonten",
  description:
    "Tingkatkan traffic organik bisnis Anda dengan jasa SEO profesional. Audit menyeluruh, backlink berkualitas, rata-rata top 10 dalam 90 hari.",
  openGraph: {
    title: "Jasa SEO Profesional Indonesia — Ranking Halaman 1 Google | KelasKonten",
    description:
      "Tingkatkan traffic organik bisnis Anda dengan jasa SEO profesional. Audit menyeluruh, backlink berkualitas, rata-rata top 10 dalam 90 hari.",
  },
  alternates: { canonical: "/layanan/seo" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Beranda", item: "https://kelaskonten.id" },
    { "@type": "ListItem", position: 2, name: "Layanan", item: "https://kelaskonten.id/layanan" },
    { "@type": "ListItem", position: 3, name: "SEO", item: "https://kelaskonten.id/layanan/seo" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Jasa SEO Profesional",
  description:
    "Layanan SEO profesional untuk meningkatkan ranking website di Google. Termasuk audit teknikal, riset keyword, on-page optimization, link building, dan monitoring.",
  provider: {
    "@type": "Organization",
    name: "KelasKonten",
    url: "https://kelaskonten.id",
  },
  areaServed: { "@type": "Country", name: "Indonesia" },
  serviceType: "SEO Services",
  offers: [
    {
      "@type": "Offer",
      name: "Basic SEO",
      price: "500000",
      priceCurrency: "IDR",
      description: "5 keyword target, audit on-page, laporan bulanan",
    },
    {
      "@type": "Offer",
      name: "Pro SEO",
      price: "1500000",
      priceCurrency: "IDR",
      description: "15 keyword, on+off page, backlink building, laporan mingguan",
    },
    {
      "@type": "Offer",
      name: "Enterprise SEO",
      price: "3500000",
      priceCurrency: "IDR",
      description: "Unlimited keyword, full SEO strategy, dedicated manager",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Berapa lama hasil SEO bisa terlihat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Umumnya hasil SEO mulai terlihat dalam 30-90 hari, tergantung kompetisi keyword dan kondisi website Anda saat ini. Rata-rata klien kami mencapai halaman 1 Google dalam 90 hari untuk keyword medium competition.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah ada jaminan ranking halaman 1 Google?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak ada yang bisa menjamin ranking #1 di Google karena algoritma terus berubah. Namun, kami menjamin proses SEO white-hat yang terbukti efektif. 87% klien kami berhasil masuk top 10 Google dalam 90 hari pertama.",
      },
    },
    {
      "@type": "Question",
      name: "Apa bedanya paket Basic, Pro, dan Enterprise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paket Basic fokus pada optimasi on-page dasar dengan 5 keyword target. Paket Pro mencakup on-page dan off-page SEO dengan backlink building untuk 15 keyword. Paket Enterprise menawarkan strategi SEO menyeluruh tanpa batas keyword dengan dedicated manager.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah saya bisa melihat laporan progress SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tentu! Semua paket mendapatkan laporan berkala. Paket Basic mendapat laporan bulanan, paket Pro mendapat laporan mingguan, dan paket Enterprise mendapat akses dashboard real-time plus meeting bulanan.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah KelasKonten menggunakan teknik SEO black-hat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak. Kami hanya menggunakan teknik SEO white-hat yang sesuai dengan Google Webmaster Guidelines. Teknik black-hat mungkin memberikan hasil cepat tapi berisiko terkena penalti Google yang bisa merusak website Anda secara permanen.",
      },
    },
    {
      "@type": "Question",
      name: "Bisakah saya membatalkan langganan kapan saja?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Anda bisa membatalkan langganan kapan saja tanpa biaya penalti. Namun, kami merekomendasikan minimal 3 bulan untuk melihat hasil yang signifikan karena SEO adalah investasi jangka panjang.",
      },
    },
  ],
};

export default function SEOPage() {
  return (
    <>
      <Navbar />
      <Breadcrumb
        items={[
          { label: "Beranda", href: "/" },
          { label: "Layanan" },
          { label: "SEO" },
        ]}
      />
      <main>
        <SEOContent />
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
