import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { sendPaymentConfirmed, sendPaymentNotifAdmin } from "@/lib/email";

export async function POST(request: Request) {
  try {
    // Rate limit
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rl = rateLimit(`webhook:${ip}`, { windowMs: 60_000, maxRequests: 10 });
    if (!rl.success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // Verify webhook secret (timing-safe)
    const webhookSecret = process.env.WEBHOOK_SECRET;
    if (webhookSecret) {
      const provided = request.headers.get("x-webhook-secret") || "";
      const expected = Buffer.from(webhookSecret);
      const actual = Buffer.from(provided);
      if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

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
      const order = await prisma.order.update({
        where: { id: payment.orderId },
        data: { status: "SCOPE_REVIEW" },
        include: { user: { select: { name: true, email: true } } },
      });

      // Fire-and-forget emails
      const emailParams = {
        clientName: order.user.name || "Klien",
        serviceType: order.serviceType,
        packageName: order.packageName,
        price: order.price,
        orderId: order.id,
      };
      if (order.user.email) {
        sendPaymentConfirmed({ to: order.user.email, ...emailParams }).catch(() => {});
      }
      sendPaymentNotifAdmin(emailParams).catch(() => {});
    }

    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
