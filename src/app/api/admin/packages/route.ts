import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

// GET semua paket (termasuk inactive) — admin only
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as { id: string; role: string };
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });
    }

    const packages = await prisma.servicePackage.findMany({
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

// POST buat paket baru — admin only
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as { id: string; role: string };
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });
    }

    const { serviceType, name, price, description, features, isActive, sortOrder } =
      await request.json();

    if (!serviceType || !name || price === undefined || price === null || !description) {
      return NextResponse.json(
        { error: "Service type, nama, harga, dan deskripsi wajib diisi" },
        { status: 400 }
      );
    }

    if (typeof price !== "number" || price < 0) {
      return NextResponse.json(
        { error: "Harga harus berupa angka positif" },
        { status: 400 }
      );
    }

    // Cek duplikat
    const existing = await prisma.servicePackage.findUnique({
      where: { serviceType_name: { serviceType, name } },
    });

    if (existing) {
      return NextResponse.json(
        { error: `Paket "${name}" untuk ${serviceType} sudah ada` },
        { status: 409 }
      );
    }

    const pkg = await prisma.servicePackage.create({
      data: {
        serviceType,
        name,
        price,
        description,
        features: features || null,
        isActive: isActive !== undefined ? isActive : true,
        sortOrder: sortOrder ?? 0,
      },
    });

    return NextResponse.json({ package: pkg });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
