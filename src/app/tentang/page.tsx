import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TentangContent from "@/components/tentang/TentangContent";

export const metadata: Metadata = {
  title: "Tentang KontenPro — Tim di Balik Konten Berkualitas",
  description:
    "Kenali tim KontenPro yang telah membantu 300+ bisnis Indonesia tumbuh dengan konten berkualitas. Berpengalaman, terpercaya, dan berorientasi hasil.",
  openGraph: {
    title: "Tentang KontenPro — Tim di Balik Konten Berkualitas",
    description:
      "Kenali tim KontenPro yang telah membantu 300+ bisnis Indonesia tumbuh dengan konten berkualitas. Berpengalaman, terpercaya, dan berorientasi hasil.",
  },
  alternates: { canonical: "/tentang" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Beranda", item: "https://kontenpro.id" },
    { "@type": "ListItem", position: 2, name: "Tentang", item: "https://kontenpro.id/tentang" },
  ],
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KontenPro",
  url: "https://kontenpro.id",
  foundingDate: "2020",
  description:
    "KontenPro adalah agensi konten digital Indonesia yang membantu 300+ bisnis tumbuh dengan SEO, penulisan konten, dan copywriting profesional.",
  founder: {
    "@type": "Person",
    name: "Andi Nugroho",
    jobTitle: "Founder & SEO Strategist",
  },
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 10,
    maxValue: 25,
  },
  areaServed: { "@type": "Country", name: "Indonesia" },
};

export default function TentangPage() {
  return (
    <>
      <Navbar />
      <main>
        <TentangContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </>
  );
}
