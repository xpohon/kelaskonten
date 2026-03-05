import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

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

    const { orderId, fileName, fileUrl, category, description } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: "orderId wajib" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return NextResponse.json({ error: "Order tidak ditemukan" }, { status: 404 });
    }

    const deliverable = await prisma.deliverable.create({
      data: {
        orderId,
        fileName,
        fileUrl,
        category: category || "Umum",
        description: description || null,
      },
    });

    return NextResponse.json({ deliverable });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
