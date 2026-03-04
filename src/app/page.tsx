import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ClientMarquee from "@/components/home/ClientMarquee";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialSection from "@/components/home/TestimonialSection";
import BlogPreview from "@/components/home/BlogPreview";
import InstagramPreview from "@/components/home/InstagramPreview";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KelasKonten",
  url: "https://kelaskonten.id",
  logo: "https://kelaskonten.id/logo.svg",
  description:
    "Jasa SEO, penulisan konten, dan copywriting profesional Indonesia. 300+ klien puas dengan hasil nyata.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+62-812-3456-7890",
    contactType: "customer service",
    areaServed: "ID",
    availableLanguage: "Indonesian",
  },
  sameAs: [
    "https://instagram.com/kelaskontenid",
    "https://linkedin.com/company/kelaskonten",
    "https://twitter.com/kelaskontenid",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Riana Putri" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Setelah 3 bulan pakai KelasKonten, traffic organik naik 245% dan followers Instagram nambah hampir 3.000 orang secara organik.",
      datePublished: "2025-01-15",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Budi Hartono" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Dalam 4 bulan, 12 keyword utama kami masuk halaman 1 Google. Lead dari organik search naik 3x lipat. Worth every rupiah.",
      datePublished: "2025-02-10",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Sari Dewi" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Email marketing open rate naik dari 12% ke 34%. Tim-nya responsif dan benar-benar paham brand voice kami.",
      datePublished: "2025-01-28",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Andi Prasetyo" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "KelasKonten yang pertama kali benar-benar deliver hasil. Artikel mereka konsisten ranking dan traffic blog kami naik 5x dalam 6 bulan.",
      datePublished: "2024-12-20",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Maya Anggraini" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Konversi landing page kami naik 47% setelah copywriting-nya dirombak total oleh KelasKonten.",
      datePublished: "2025-02-05",
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KelasKonten",
  url: "https://kelaskonten.id",
  description:
    "Jasa SEO, penulisan konten, dan copywriting profesional Indonesia.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://kelaskonten.id/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "KelasKonten",
  url: "https://kelaskonten.id",
  logo: "https://kelaskonten.id/logo.svg",
  image: "https://kelaskonten.id/og-image.svg",
  description:
    "Jasa SEO, penulisan konten, dan copywriting profesional Indonesia. Membantu 300+ bisnis tumbuh dengan konten berkualitas.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressRegion: "DKI Jakarta",
    addressCountry: "ID",
  },
  telephone: "+62-812-3456-7890",
  priceRange: "Rp 150.000 - Rp 3.500.000",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: { "@type": "Country", name: "Indonesia" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Layanan KelasKonten",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO & Backlink Building",
          url: "https://kelaskonten.id/layanan/seo",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Penulisan Artikel & Konten SEO",
          url: "https://kelaskonten.id/layanan/penulisan-konten",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Copywriting & Konten Sosial Media",
          url: "https://kelaskonten.id/layanan/copywriting",
        },
      },
    ],
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cara Memesan Jasa Konten & SEO di KelasKonten",
  description:
    "Proses sederhana 3 langkah untuk memulai proyek konten Anda bersama KelasKonten.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Konsultasi & Analisis",
      text: "Ceritakan kebutuhan Anda. Tim kami akan menganalisis bisnis, kompetitor, dan target audiens Anda untuk membuat strategi yang tepat sasaran.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Eksekusi & Produksi",
      text: "Tim spesialis kami langsung bekerja. Setiap konten melewati proses riset, penulisan, editing, dan quality check sebelum dikirim ke Anda.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Laporan & Optimasi",
      text: "Anda mendapatkan laporan transparan dengan data nyata. Kami terus optimasi berdasarkan performa untuk hasil yang makin baik setiap bulan.",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ClientMarquee />
        <StatsSection />
        <ServicesSection />
        <HowItWorks />
        <TestimonialSection />
        <BlogPreview />
        <InstagramPreview />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}
