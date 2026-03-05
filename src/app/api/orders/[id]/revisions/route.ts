import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import { sendRevisionRequested } from "@/lib/email";

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
      include: { revisionRequests: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order tidak ditemukan" }, { status: 404 });
    }

    // Only order owner can request revision
    if (order.userId !== user.id) {
      return NextResponse.json({ error: "Hanya pemilik order yang dapat meminta revisi" }, { status: 403 });
    }

    // Can only request revision when status is REVIEW
    if (order.status !== "REVIEW") {
      return NextResponse.json(
        { error: "Revisi hanya dapat diminta saat status REVIEW" },
        { status: 400 }
      );
    }

    const { feedback } = await request.json();
    if (!feedback?.trim()) {
      return NextResponse.json({ error: "Feedback revisi wajib diisi" }, { status: 400 });
    }

    const revisionNumber = order.revisionRequests.length + 1;

    const [revisionRequest] = await prisma.$transaction([
      prisma.revisionRequest.create({
        data: {
          orderId: id,
          revisionNumber,
          feedback: feedback.trim(),
          status: "PENDING",
        },
      }),
      prisma.order.update({
        where: { id },
        data: { status: "REVISION" },
      }),
    ]);

    // Auto-message in chat
    await prisma.message.create({
      data: {
        orderId: id,
        senderId: user.id,
        content: `Permintaan revisi #${revisionNumber}: ${feedback.trim()}`,
      },
    });

    // Fire-and-forget email to admin
    sendRevisionRequested({
      clientName: user.name || "Klien",
      serviceType: order.serviceType,
      packageName: order.packageName,
      price: order.price,
      orderId: id,
      feedback: feedback.trim(),
      revisionNumber,
    }).catch(() => {});

    return NextResponse.json({ revisionRequest });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
