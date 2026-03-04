"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

interface Order {
  id: string;
  serviceType: string;
  packageName: string;
  price: number;
  status: string;
  createdAt: string;
  payment?: { status: string };
}

const statusLabels: Record<string, { label: string; color: string }> = {
  PENDING_PAYMENT: { label: "Menunggu Pembayaran", color: "text-yellow-400 bg-yellow-400/10" },
  IN_PROGRESS: { label: "Sedang Dikerjakan", color: "text-blue-400 bg-blue-400/10" },
  REVIEW: { label: "Menunggu Review", color: "text-purple-400 bg-purple-400/10" },
  REVISION: { label: "Revisi", color: "text-orange-400 bg-orange-400/10" },
  COMPLETED: { label: "Selesai", color: "text-neon bg-neon/10" },
  CANCELLED: { label: "Dibatalkan", color: "text-red-400 bg-red-400/10" },
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/masuk");
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetch("/api/orders")
        .then((r) => r.json())
        .then((data) => setOrders(data.orders || []));
    }
  }, [session]);

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted">Memuat...</p>
        </div>
      </>
    );
  }

  const activeOrders = orders.filter((o) => !["COMPLETED", "CANCELLED"].includes(o.status));
  const completedOrders = orders.filter((o) => o.status === "COMPLETED");
  const totalSpent = orders
    .filter((o) => o.payment?.status === "PAID")
    .reduce((sum, o) => sum + o.price, 0);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold">
                Dashboard
              </h1>
              <p className="text-muted text-sm mt-1">
                Selamat datang, {session?.user?.name}
              </p>
            </div>
            <Link
              href="/pesan"
              className="px-5 py-2.5 bg-neon text-[#0a0a0f] font-semibold text-sm rounded-xl hover:shadow-[0_0_20px_rgba(79,255,176,0.3)] transition-all"
            >
              Order Baru
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-card-bg border border-card-border">
              <p className="text-sm text-muted">Order Aktif</p>
              <p className="text-2xl font-heading font-bold mt-1">{activeOrders.length}</p>
            </div>
            <div className="p-5 rounded-xl bg-card-bg border border-card-border">
              <p className="text-sm text-muted">Selesai</p>
              <p className="text-2xl font-heading font-bold mt-1">{completedOrders.length}</p>
            </div>
            <div className="p-5 rounded-xl bg-card-bg border border-card-border">
              <p className="text-sm text-muted">Total Pengeluaran</p>
              <p className="text-2xl font-heading font-bold mt-1 text-neon">
                Rp {totalSpent.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          {/* Orders list */}
          <div className="rounded-2xl bg-card-bg border border-card-border overflow-hidden">
            <div className="p-5 border-b border-card-border">
              <h2 className="font-heading font-bold">Riwayat Order</h2>
            </div>
            {orders.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-muted mb-4">Belum ada order.</p>
                <Link
                  href="/pesan"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-neon text-[#0a0a0f] font-semibold text-sm rounded-xl"
                >
                  Mulai Order Pertama
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-card-border">
                {orders.map((order) => {
                  const statusInfo = statusLabels[order.status] || { label: order.status, color: "text-muted bg-card-bg" };
                  return (
                    <Link
                      key={order.id}
                      href={`/dashboard/orders/${order.id}`}
                      className="block p-5 hover:bg-surface/50 transition-colors"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <p className="font-medium text-sm">
                            {order.serviceType} — {order.packageName}
                          </p>
                          <p className="text-xs text-muted mt-1">
                            {new Date(order.createdAt).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold">
                            Rp {order.price.toLocaleString("id-ID")}
                          </span>
                          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
