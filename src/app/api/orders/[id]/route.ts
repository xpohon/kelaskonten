import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

// Status yang valid untuk transisi
const VALID_STATUSES = [
  "PENDING_PAYMENT",
  "SCOPE_REVIEW",
  "IN_PROGRESS",
  "REVIEW",
  "REVISION",
  "COMPLETED",
  "CANCELLED",
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as { id: string; role: string };
    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        payment: true,
        user: { select: { name: true, email: true } },
        deliverables: true,
        scopeItems: { orderBy: { sortOrder: "asc" } },
        messages: {
          include: { sender: { select: { name: true, role: true } } },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order tidak ditemukan" }, { status: 404 });
    }

    // Ownership check: hanya pemilik order atau admin yang boleh lihat
    if (user.role !== "ADMIN" && order.userId !== user.id) {
      return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });
    }

    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as { id: string; role: string };

    // Hanya ADMIN yang boleh update order
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Hanya admin yang dapat mengubah order" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    // Cek order ada
    const existingOrder = await prisma.order.findUnique({ where: { id } });
    if (!existingOrder) {
      return NextResponse.json({ error: "Order tidak ditemukan" }, { status: 404 });
    }

    // Whitelist field — hanya field tertentu yang boleh diupdate
    const allowedData: Record<string, unknown> = {};
    if (body.status && VALID_STATUSES.includes(body.status)) {
      allowedData.status = body.status;
    }

    if (Object.keys(allowedData).length === 0) {
      return NextResponse.json({ error: "Tidak ada perubahan valid" }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id },
      data: allowedData,
    });

    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
