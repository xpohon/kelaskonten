import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Public endpoint — tanpa auth
export async function GET() {
  try {
    const packages = await prisma.servicePackage.findMany({
      where: { isActive: true },
      orderBy: [{ serviceType: "asc" }, { sortOrder: "asc" }],
    });

    return NextResponse.json({ packages });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
