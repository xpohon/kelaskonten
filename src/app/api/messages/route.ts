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
    const { orderId, content } = await request.json();

    const message = await prisma.message.create({
      data: {
        orderId,
        senderId: userId,
        content,
      },
    });

    return NextResponse.json({ message });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
