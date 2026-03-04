import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArticleContent from "@/components/blog/ArticleContent";
import { prisma } from "@/lib/db";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) return { title: "Artikel Tidak Ditemukan" };

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      type: "article",
      publishedTime: article.publishedAt.toISOString(),
      authors: [article.author],
      tags: [article.category],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) notFound();

  // Increment views
  await prisma.article.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });

  const relatedArticles = await prisma.article.findMany({
    where: { category: article.category, slug: { not: slug } },
    take: 3,
    orderBy: { views: "desc" },
  });

  return (
    <>
      <Navbar />
      <ArticleContent article={article} relatedArticles={relatedArticles} />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.seoDescription || article.excerpt,
            author: {
              "@type": "Organization",
              name: "KelasKonten",
            },
            publisher: {
              "@type": "Organization",
              name: "KelasKonten",
              logo: {
                "@type": "ImageObject",
                url: "https://kelaskonten.id/logo.png",
              },
            },
            datePublished: article.publishedAt.toISOString(),
            dateModified: article.updatedAt.toISOString(),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://kelaskonten.id/blog/${slug}`,
            },
          }),
        }}
      />
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
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: `https://kelaskonten.id/blog/${slug}`,
              },
            ],
          }),
        }}
      />
    </>
  );
}
