import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await request.json();
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return NextResponse.json({ error: "Order tidak ditemukan" }, { status: 404 });
    }

    // Ownership check
    const userId = (session.user as { id: string }).id;
    if (order.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const midtransOrderId = `KP-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        orderId: order.id,
        midtransOrderId,
        amount: order.price,
        status: "PENDING",
      },
    });

    // In production, create Midtrans snap token here
    // For sandbox, we simulate the token
    const snapToken = `sandbox-${midtransOrderId}`;

    await prisma.payment.update({
      where: { id: payment.id },
      data: { snapToken },
    });

    return NextResponse.json({
      token: snapToken,
      orderId: midtransOrderId,
      redirectUrl: `/pembayaran/${order.id}`,
    });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
