import { prisma } from "@/lib/db";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kelaskonten.id";

  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: "desc" },
    take: 20,
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog KelasKonten</title>
    <link>${baseUrl}/blog</link>
    <description>Tips SEO, Copywriting &amp; Content Marketing dari KelasKonten</description>
    <language>id</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${articles
      .map(
        (a) => `<item>
      <title>${escapeXml(a.title)}</title>
      <link>${baseUrl}/blog/${a.slug}</link>
      <description>${escapeXml(a.excerpt)}</description>
      <pubDate>${a.publishedAt.toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/blog/${a.slug}</guid>
      <category>${escapeXml(a.category)}</category>
    </item>`
      )
      .join("\n    ")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
