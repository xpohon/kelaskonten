import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mammoth from "mammoth";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

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

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Ukuran file maksimal 4MB" }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    const isDocx =
      fileName.endsWith(".docx") ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    const isPdf = fileName.endsWith(".pdf") || file.type === "application/pdf";

    if (!isDocx && !isPdf) {
      return NextResponse.json({ error: "Format file harus DOCX atau PDF" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let title = "";
    let excerpt = "";
    let content = "";

    if (isDocx) {
      const result = await mammoth.convertToHtml({ buffer });
      const html = result.value;

      // Extract title from first <h1>
      const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
      if (h1Match) {
        title = h1Match[1].replace(/<[^>]*>/g, "").trim();
      }

      // Remove the first <h1> from content
      let remaining = h1Match ? html.replace(h1Match[0], "").trim() : html;

      // Extract excerpt from first <p>
      const pMatch = remaining.match(/<p[^>]*>(.*?)<\/p>/i);
      if (pMatch) {
        excerpt = pMatch[1].replace(/<[^>]*>/g, "").trim();
        remaining = remaining.replace(pMatch[0], "").trim();
      }

      content = remaining;
    } else {
      // PDF parsing - use require for pdf-parse v1 (no ESM default export)
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse");
      const pdfData = await pdfParse(buffer);
      const text = pdfData.text.trim();

      // Split by double newlines to get paragraphs
      const paragraphs = text
        .split(/\n\s*\n/)
        .map((p: string) => p.replace(/\n/g, " ").trim())
        .filter((p: string) => p.length > 0);

      title = paragraphs[0] || "";
      excerpt = paragraphs[1] || "";
      content = paragraphs
        .slice(2)
        .map((p: string) => `<p>${p}</p>`)
        .join("\n");
    }

    // Estimate read time (200 words per minute)
    const plainText = content.replace(/<[^>]*>/g, "");
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    return NextResponse.json({
      title,
      excerpt,
      content,
      readTime: String(readTime),
      fileName: file.name,
    });
  } catch (error) {
    console.error("Document parse error:", error);
    return NextResponse.json(
      { error: "Gagal memproses dokumen. Pastikan file tidak rusak." },
      { status: 500 }
    );
  }
}
