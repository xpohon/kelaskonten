import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PortfolioContent from "@/components/portfolio/PortfolioContent";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Portofolio — Hasil Kerja Nyata Kami",
  description:
    "Lihat showcase konten sosial media, artikel SEO, dan copywriting yang telah kami buat. Bukti nyata kemampuan tim KelasKonten.",
  openGraph: {
    title: "Portofolio — Hasil Kerja Nyata Kami | KelasKonten",
    description:
      "Lihat showcase konten sosial media, artikel SEO, dan copywriting yang telah kami buat.",
  },
  alternates: { canonical: "/portofolio" },
};

export default async function PortfolioPage() {
  const portfolios = await prisma.portfolio.findMany({
    orderBy: { order: "asc" },
  });
  const articles = await prisma.article.findMany({
    take: 3,
    orderBy: { views: "desc" },
    select: { title: true, slug: true, category: true, views: true, readTime: true },
  });

  return (
    <>
      <Navbar />
      <Breadcrumb
        items={[
          { label: "Beranda", href: "/" },
          { label: "Portofolio" },
        ]}
      />
      <main className="pt-4 pb-16">
        <PortfolioContent portfolios={portfolios} articles={articles} />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Beranda", item: "https://kelaskonten.id" },
              { "@type": "ListItem", position: 2, name: "Portofolio", item: "https://kelaskonten.id/portofolio" },
            ],
          }),
        }}
      />
    </>
  );
}
