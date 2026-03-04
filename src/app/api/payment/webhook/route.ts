import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { order_id, transaction_status, payment_type } = body;

    if (!order_id || !transaction_status) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const payment = await prisma.payment.findUnique({
      where: { midtransOrderId: order_id },
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    let status = payment.status;
    if (transaction_status === "capture" || transaction_status === "settlement") {
      status = "PAID";
    } else if (transaction_status === "pending") {
      status = "PENDING";
    } else if (
      transaction_status === "deny" ||
      transaction_status === "cancel" ||
      transaction_status === "expire"
    ) {
      status = "FAILED";
    }

    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status,
        method: payment_type || null,
        paidAt: status === "PAID" ? new Date() : null,
      },
    });

    // Update order status
    if (status === "PAID") {
      await prisma.order.update({
        where: { id: payment.orderId },
        data: { status: "IN_PROGRESS" },
      });
    }

    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
