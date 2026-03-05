import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/db";
import { sendArticleNotification } from "@/lib/email";
import slugify from "slugify";

export const maxDuration = 60;

const CATEGORIES = ["SEO", "Penulisan Konten", "Copywriting", "Media Sosial"];

function getTodayCategory(): string {
  const epoch = new Date("2025-01-01").getTime();
  const now = new Date();
  const daysSinceEpoch = Math.floor(
    (now.getTime() - epoch) / (1000 * 60 * 60 * 24)
  );
  return CATEGORIES[daysSinceEpoch % 4];
}

function buildPrompt(category: string, recentTitles: string[]): string {
  const categoryGuidance: Record<string, string> = {
    SEO: `Tulis artikel tentang Search Engine Optimization (SEO) untuk bisnis Indonesia.
Topik bisa mencakup: riset keyword, on-page SEO, technical SEO, link building,
local SEO untuk bisnis Indonesia, Google Search Console, Core Web Vitals,
SEO untuk e-commerce, atau tren SEO terbaru.`,

    "Penulisan Konten": `Tulis artikel tentang penulisan konten (content writing) untuk audiens Indonesia.
Topik bisa mencakup: cara menulis artikel blog yang menarik, content strategy,
storytelling dalam konten, menulis untuk berbagai platform, content calendar,
penulisan konten B2B vs B2C, atau tips meningkatkan kualitas tulisan.`,

    Copywriting: `Tulis artikel tentang copywriting untuk pasar Indonesia.
Topik bisa mencakup: menulis headline yang menarik, teknik persuasi dalam copy,
copywriting untuk landing page, email copywriting, formula copywriting (AIDA, PAS, BAB),
copywriting untuk iklan digital, atau cara menulis CTA yang efektif.`,

    "Media Sosial": `Tulis artikel tentang strategi media sosial untuk bisnis Indonesia.
Topik bisa mencakup: strategi konten Instagram, TikTok marketing, LinkedIn untuk B2B,
cara meningkatkan engagement, social media analytics, influencer marketing,
community management, atau tren media sosial terbaru.`,
  };

  const avoidTitles =
    recentTitles.length > 0
      ? `\n\nHINDARI topik yang mirip dengan artikel terbaru kami:\n${recentTitles.map((t) => `- ${t}`).join("\n")}`
      : "";

  return `Kamu adalah penulis konten profesional untuk KelasKonten, agensi digital marketing Indonesia yang melayani 300+ klien.

${categoryGuidance[category] || categoryGuidance["SEO"]}
${avoidTitles}

INSTRUKSI:
1. Tulis artikel dalam Bahasa Indonesia yang natural dan profesional
2. Panjang artikel 800-1200 kata
3. Gunakan data, statistik, atau contoh nyata yang relevan untuk pasar Indonesia
4. Struktur artikel:
   - Paragraf pembuka yang engaging (hook pembaca)
   - 3-5 subjudul (H2) dengan konten substansial di setiap bagian
   - Gunakan bullet points atau numbered lists di minimal 1 bagian
   - Paragraf penutup dengan actionable takeaway
5. Tone: profesional tapi approachable, tidak terlalu formal, sesekali gunakan "kamu/Anda"
6. Sertakan minimal 1 contoh atau studi kasus yang relevan
7. Konten harus original, informatif, dan actionable

FORMAT OUTPUT sebagai JSON (tanpa markdown code block):
{
  "title": "Judul artikel yang menarik dan SEO-friendly (maks 70 karakter)",
  "excerpt": "Ringkasan menarik 1-2 kalimat yang membuat pembaca ingin baca lebih lanjut (maks 160 karakter)",
  "content": "Konten HTML lengkap dengan tag <h2>, <p>, <ul>/<ol>, <li>, <strong>. JANGAN gunakan <h1>. Mulai langsung dengan <p> paragraf pembuka.",
  "seoTitle": "SEO title yang dioptimasi dengan keyword utama (maks 60 karakter)",
  "seoDescription": "Meta description yang menarik dengan keyword utama (maks 155 karakter)",
  "readTime": 5
}

Pastikan readTime dihitung berdasarkan panjang artikel (200 kata per menit).
Pastikan content berupa HTML valid tanpa karakter escape yang tidak perlu.
Output HANYA JSON, tanpa teks tambahan sebelum atau sesudah JSON.`;
}

export async function GET(request: Request) {
  // Verify CRON_SECRET
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Idempotency: check if already generated today
    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);
    const existingToday = await prisma.article.findFirst({
      where: {
        generatedByAI: true,
        createdAt: { gte: todayStart },
      },
    });
    if (existingToday) {
      return NextResponse.json({
        message: "Article already generated today",
        articleId: existingToday.id,
      });
    }

    // Determine today's category
    const category = getTodayCategory();

    // Fetch recent titles to avoid repetition
    const recentArticles = await prisma.article.findMany({
      where: { category },
      select: { title: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    const recentTitles = recentArticles.map((a) => a.title);

    // Call Claude API
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [{ role: "user", content: buildPrompt(category, recentTitles) }],
    });

    // Parse response
    const textContent = response.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      return NextResponse.json(
        { error: "No text in AI response" },
        { status: 500 }
      );
    }

    const jsonStr = textContent.text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const parsed = JSON.parse(jsonStr);

    // Generate unique slug
    let slug = slugify(parsed.title, { lower: true, strict: true });
    if (!slug) slug = `artikel-${Date.now()}`;
    const existingSlug = await prisma.article.findUnique({ where: { slug } });
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    // Save as DRAFT
    const article = await prisma.article.create({
      data: {
        title: parsed.title,
        slug,
        content: parsed.content,
        excerpt: parsed.excerpt,
        category,
        readTime: parsed.readTime || Math.ceil(parsed.content.split(/\s+/).length / 200),
        author: "Tim KelasKonten",
        seoTitle: parsed.seoTitle,
        seoDescription: parsed.seoDescription,
        status: "DRAFT",
        generatedByAI: true,
      },
    });

    // Send email notification (non-blocking — failure won't affect cron)
    let emailSent = false;
    try {
      const emailResult = await sendArticleNotification({
        title: parsed.title,
        category,
        excerpt: parsed.excerpt,
        articleId: article.id,
      });
      emailSent = emailResult.success;
    } catch (emailError) {
      console.error("Email notification error:", emailError);
    }

    return NextResponse.json({ success: true, articleId: article.id, category, emailSent });
  } catch (error) {
    console.error("Cron generate-article error:", error);
    return NextResponse.json(
      { error: "Failed to generate article" },
      { status: 500 }
    );
  }
}
