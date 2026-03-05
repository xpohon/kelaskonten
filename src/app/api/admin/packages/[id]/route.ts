import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

// PUT update paket — admin only
export async function PUT(
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
      return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    // Cek paket ada
    const existing = await prisma.servicePackage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Paket tidak ditemukan" }, { status: 404 });
    }

    // Build update data — hanya field yang dikirim
    const updateData: Record<string, unknown> = {};

    if (body.serviceType !== undefined) updateData.serviceType = body.serviceType;
    if (body.name !== undefined) updateData.name = body.name;
    if (body.price !== undefined) {
      if (typeof body.price !== "number" || body.price < 0) {
        return NextResponse.json(
          { error: "Harga harus berupa angka positif" },
          { status: 400 }
        );
      }
      updateData.price = body.price;
    }
    if (body.description !== undefined) updateData.description = body.description;
    if (body.features !== undefined) updateData.features = body.features;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;
    if (body.sortOrder !== undefined) updateData.sortOrder = body.sortOrder;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "Tidak ada perubahan" },
        { status: 400 }
      );
    }

    // Cek unique constraint jika serviceType atau name berubah
    const newServiceType = (updateData.serviceType as string) || existing.serviceType;
    const newName = (updateData.name as string) || existing.name;

    if (newServiceType !== existing.serviceType || newName !== existing.name) {
      const duplicate = await prisma.servicePackage.findUnique({
        where: { serviceType_name: { serviceType: newServiceType, name: newName } },
      });
      if (duplicate && duplicate.id !== id) {
        return NextResponse.json(
          { error: `Paket "${newName}" untuk ${newServiceType} sudah ada` },
          { status: 409 }
        );
      }
    }

    const pkg = await prisma.servicePackage.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ package: pkg });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

// DELETE hapus paket — admin only
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
      return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });
    }

    const { id } = await params;

    const existing = await prisma.servicePackage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Paket tidak ditemukan" }, { status: 404 });
    }

    await prisma.servicePackage.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
