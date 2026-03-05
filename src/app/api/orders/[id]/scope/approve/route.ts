import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

// POST — Client approve scope
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as { id: string; name: string; role: string };
    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: { scopeItems: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order tidak ditemukan" }, { status: 404 });
    }

    // Hanya pemilik order atau admin yang bisa approve
    if (order.userId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });
    }

    if (order.scopeApprovedAt) {
      return NextResponse.json({ error: "Scope sudah disetujui sebelumnya" }, { status: 400 });
    }

    if (order.scopeItems.length === 0) {
      return NextResponse.json({ error: "Belum ada scope item untuk disetujui" }, { status: 400 });
    }

    // Approve scope & start work
    await prisma.order.update({
      where: { id },
      data: {
        scopeApprovedAt: new Date(),
        status: "IN_PROGRESS",
      },
    });

    // Auto-message
    await prisma.message.create({
      data: {
        orderId: id,
        senderId: user.id,
        content: `Scope pekerjaan telah disetujui oleh ${user.name}. Pengerjaan dimulai.`,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
