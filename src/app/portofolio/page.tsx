import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortfolioContent from "@/components/portfolio/PortfolioContent";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Portofolio — Hasil Kerja Nyata Kami",
  description:
    "Lihat showcase konten sosial media, artikel SEO, dan copywriting yang telah kami buat. Bukti nyata kemampuan tim KontenPro.",
  openGraph: {
    title: "Portofolio — Hasil Kerja Nyata Kami | KontenPro",
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
      <main className="pt-24 pb-16">
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
              { "@type": "ListItem", position: 1, name: "Beranda", item: "https://kontenpro.id" },
              { "@type": "ListItem", position: 2, name: "Portofolio", item: "https://kontenpro.id/portofolio" },
            ],
          }),
        }}
      />
    </>
  );
}
