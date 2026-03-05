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

    const user = session.user as { id: string; role: string };
    const { orderId, content } = await request.json();

    if (!orderId || !content?.trim()) {
      return NextResponse.json({ error: "Order ID dan pesan harus diisi" }, { status: 400 });
    }

    // Cek order ada dan user punya akses
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: { userId: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order tidak ditemukan" }, { status: 404 });
    }

    // Hanya pemilik order atau admin yang boleh kirim pesan
    if (user.role !== "ADMIN" && order.userId !== user.id) {
      return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });
    }

    const message = await prisma.message.create({
      data: {
        orderId,
        senderId: user.id,
        content: content.trim(),
      },
    });

    return NextResponse.json({ message });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
