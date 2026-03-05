import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

// POST — Admin tambah scope item
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as { id: string; role: string };
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Hanya admin" }, { status: 403 });
    }

    const { id } = await params;
    const { content } = await request.json();

    if (!content?.trim()) {
      return NextResponse.json({ error: "Content wajib diisi" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
      return NextResponse.json({ error: "Order tidak ditemukan" }, { status: 404 });
    }

    if (order.scopeApprovedAt) {
      return NextResponse.json({ error: "Scope sudah disetujui, tidak bisa diubah" }, { status: 400 });
    }

    const count = await prisma.scopeItem.count({ where: { orderId: id } });

    const item = await prisma.scopeItem.create({
      data: {
        orderId: id,
        content: content.trim(),
        sortOrder: count,
      },
    });

    return NextResponse.json({ item });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE — Admin hapus scope item
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as { id: string; role: string };
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Hanya admin" }, { status: 403 });
    }

    const { id } = await params;
    const { itemId } = await request.json();

    if (!itemId) {
      return NextResponse.json({ error: "itemId wajib" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
      return NextResponse.json({ error: "Order tidak ditemukan" }, { status: 404 });
    }

    if (order.scopeApprovedAt) {
      return NextResponse.json({ error: "Scope sudah disetujui, tidak bisa diubah" }, { status: 400 });
    }

    // Verify item belongs to this order
    const item = await prisma.scopeItem.findFirst({
      where: { id: itemId, orderId: id },
    });

    if (!item) {
      return NextResponse.json({ error: "Item tidak ditemukan" }, { status: 404 });
    }

    await prisma.scopeItem.delete({ where: { id: itemId } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
