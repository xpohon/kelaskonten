import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import BlogList from "@/components/blog/BlogList";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Blog — Tips SEO, Copywriting & Content Marketing",
  description:
    "Baca artikel berkualitas tentang SEO, penulisan konten, copywriting, dan strategi digital marketing. Ditulis oleh tim profesional KelasKonten.",
  openGraph: {
    title: "Blog — Tips SEO, Copywriting & Content Marketing | KelasKonten",
    description:
      "Baca artikel berkualitas tentang SEO, penulisan konten, copywriting, dan strategi digital marketing.",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <Navbar />
      <Breadcrumb
        items={[
          { label: "Beranda", href: "/" },
          { label: "Blog" },
        ]}
      />
      <main className="pt-4 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-neon bg-neon/10 border border-neon/20 rounded-full">
              Blog KelasKonten
            </span>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              Insight & Strategi{" "}
              <span className="gradient-text">Digital Marketing</span>
            </h1>
            <p className="text-lg text-muted">
              Artikel yang kami tulis bukan sekadar teori — semuanya berdasarkan
              pengalaman nyata menangani 300+ klien Indonesia. Baca, praktekkan,
              dan lihat hasilnya.
            </p>
          </div>

          <BlogList articles={articles} />
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Beranda",
                item: "https://kelaskonten.id",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://kelaskonten.id/blog",
              },
            ],
          }),
        }}
      />
    </>
  );
}
