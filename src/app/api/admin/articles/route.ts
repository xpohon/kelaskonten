import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import slugify from "slugify";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as { role: string };
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ articles });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as { role: string };
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { title, content, excerpt, category, coverImage, readTime, author, seoTitle, seoDescription } = body;

    if (!title || !content || !excerpt || !category) {
      return NextResponse.json({ error: "Title, content, excerpt, dan category wajib diisi" }, { status: 400 });
    }

    // Generate unique slug
    let slug = slugify(title, { lower: true, strict: true });
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (existing) {
      let counter = 2;
      while (await prisma.article.findUnique({ where: { slug: `${slug}-${counter}` } })) {
        counter++;
      }
      slug = `${slug}-${counter}`;
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        category,
        coverImage: coverImage || null,
        readTime: readTime ? parseInt(readTime) : 5,
        author: author || "Tim KelasKonten",
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        status: "PUBLISHED",
        generatedByAI: false,
      },
    });

    return NextResponse.json({ article });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
