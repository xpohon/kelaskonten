import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import slugify from "slugify";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as { role: string };
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const article = await prisma.article.findUnique({ where: { id } });

    if (!article) {
      return NextResponse.json({ error: "Artikel tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ article });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as { role: string };
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, content, excerpt, category, coverImage, readTime, author, seoTitle, seoDescription } = body;

    // Check article exists
    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Artikel tidak ditemukan" }, { status: 404 });
    }

    // Regenerate slug if title changed
    let slug = existing.slug;
    if (title && title !== existing.title) {
      slug = slugify(title, { lower: true, strict: true });
      const slugExists = await prisma.article.findFirst({
        where: { slug, id: { not: id } },
      });
      if (slugExists) {
        let counter = 2;
        while (await prisma.article.findFirst({
          where: { slug: `${slug}-${counter}`, id: { not: id } },
        })) {
          counter++;
        }
        slug = `${slug}-${counter}`;
      }
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        ...(title && { title }),
        slug,
        ...(content && { content }),
        ...(excerpt && { excerpt }),
        ...(category && { category }),
        coverImage: coverImage ?? existing.coverImage,
        readTime: readTime ? parseInt(readTime) : existing.readTime,
        author: author || existing.author,
        seoTitle: seoTitle ?? existing.seoTitle,
        seoDescription: seoDescription ?? existing.seoDescription,
      },
    });

    return NextResponse.json({ article });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as { role: string };
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    await prisma.article.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
