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

    const userId = (session.user as { id: string }).id;
    const { serviceType, packageName, price, brief, targetAudience, references, deadline } =
      await request.json();

    if (!serviceType || !packageName || !price) {
      return NextResponse.json(
        { error: "Data order tidak lengkap" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        userId,
        serviceType,
        packageName,
        price: parseInt(price),
        brief: brief || null,
        targetAudience: targetAudience || null,
        references: references || null,
        deadline: deadline ? new Date(deadline) : null,
        status: "PENDING_PAYMENT",
      },
    });

    return NextResponse.json({ order });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as { id: string; role: string };
    const where = user.role === "ADMIN" ? {} : { userId: user.id };

    const orders = await prisma.order.findMany({
      where,
      include: {
        payment: true,
        user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
