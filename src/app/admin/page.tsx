"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
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
  user: { name: string; email: string };
  payment?: { status: string };
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState<{ total: number; completed: number } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/masuk");
    if (session && (session.user as { role?: string }).role !== "ADMIN") {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session) {
      fetch("/api/orders")
        .then((r) => r.json())
        .then((data) => setOrders(data.orders || []));
    }
  }, [session]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    setUpdatingId(null);
  };

  const totalRevenue = orders
    .filter((o) => o.payment?.status === "PAID")
    .reduce((sum, o) => sum + o.price, 0);
  const activeOrders = orders.filter((o) => o.status === "IN_PROGRESS").length;
  const pendingOrders = orders.filter((o) => o.status === "PENDING_PAYMENT").length;

  const runSimulation = async (skipAI = false) => {
    if (!window.confirm(`Jalankan simulasi 9 order end-to-end${skipAI ? " (tanpa AI)" : " dengan AI"}? Ini akan membuat order baru untuk demo user.`)) return;
    setSimulating(true);
    setSimResult(null);
    try {
      const res = await fetch("/api/admin/simulation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skipAI }),
      });
      const data = await res.json();
      if (data.success) {
        setSimResult({ total: data.total, completed: data.completed });
        // Refresh orders
        const ordersRes = await fetch("/api/orders");
        const ordersData = await ordersRes.json();
        setOrders(ordersData.orders || []);
      } else {
        alert("Simulasi gagal: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Simulasi error: " + String(err));
    }
    setSimulating(false);
  };

  const statusOptions = [
    "PENDING_PAYMENT",
    "SCOPE_REVIEW",
    "IN_PROGRESS",
    "REVIEW",
    "REVISION",
    "COMPLETED",
    "CANCELLED",
  ];

  if (status === "loading") return null;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold">
              Admin Panel
            </h1>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/packages"
                className="px-4 py-2.5 text-sm text-neon border border-neon/30 rounded-xl hover:bg-neon/10 transition-colors font-medium"
              >
                Kelola Paket
              </Link>
              <Link
                href="/admin/blog"
                className="px-4 py-2.5 text-sm text-neon border border-neon/30 rounded-xl hover:bg-neon/10 transition-colors font-medium"
              >
                Kelola Blog
              </Link>
              <button
                onClick={() => runSimulation(false)}
                disabled={simulating}
                className="px-4 py-2.5 text-sm text-purple-400 border border-purple-400/30 rounded-xl hover:bg-purple-400/10 transition-colors font-medium disabled:opacity-50"
              >
                {simulating ? "Simulasi..." : "Simulasi + AI"}
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-4 py-2.5 text-sm text-muted border border-card-border rounded-xl hover:text-red-400 hover:border-red-400/50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Simulation result banner */}
          {simResult && (
            <div className="mb-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between">
              <p className="text-sm text-purple-300">
                Simulasi selesai: {simResult.completed}/{simResult.total} order berhasil diproses end-to-end.
              </p>
              <button onClick={() => setSimResult(null)} className="text-xs text-muted hover:text-foreground">&times;</button>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-card-bg border border-card-border">
              <p className="text-sm text-muted">Total Revenue</p>
              <p className="text-2xl font-heading font-bold text-neon mt-1">
                Rp {totalRevenue.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="p-5 rounded-xl bg-card-bg border border-card-border">
              <p className="text-sm text-muted">Total Order</p>
              <p className="text-2xl font-heading font-bold mt-1">{orders.length}</p>
            </div>
            <div className="p-5 rounded-xl bg-card-bg border border-card-border">
              <p className="text-sm text-muted">Sedang Dikerjakan</p>
              <p className="text-2xl font-heading font-bold mt-1">{activeOrders}</p>
            </div>
            <div className="p-5 rounded-xl bg-card-bg border border-card-border">
              <p className="text-sm text-muted">Menunggu Bayar</p>
              <p className="text-2xl font-heading font-bold mt-1">{pendingOrders}</p>
            </div>
          </div>

          {/* Orders table */}
          <div className="rounded-2xl bg-card-bg border border-card-border overflow-hidden">
            <div className="p-5 border-b border-card-border flex items-center justify-between">
              <h2 className="font-heading font-bold">Semua Order</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface text-xs text-muted uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3 text-left">Klien</th>
                    <th className="px-5 py-3 text-left">Layanan</th>
                    <th className="px-5 py-3 text-left">Paket</th>
                    <th className="px-5 py-3 text-left">Harga</th>
                    <th className="px-5 py-3 text-left">Status</th>
                    <th className="px-5 py-3 text-left">Tanggal</th>
                    <th className="px-5 py-3 text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-surface/50">
                      <td className="px-5 py-3">
                        <p className="text-sm font-medium">{order.user.name}</p>
                        <p className="text-xs text-muted">{order.user.email}</p>
                      </td>
                      <td className="px-5 py-3 text-sm">{order.serviceType}</td>
                      <td className="px-5 py-3 text-sm">{order.packageName}</td>
                      <td className="px-5 py-3 text-sm font-medium">
                        Rp {order.price.toLocaleString("id-ID")}
                      </td>
                      <td className="px-5 py-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          disabled={updatingId === order.id}
                          className="text-xs bg-surface border border-card-border rounded-lg px-2 py-1 text-foreground focus:outline-none focus:border-neon"
                        >
                          {statusOptions.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-3 text-xs text-muted">
                        {new Date(order.createdAt).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-5 py-3">
                        <Link
                          href={`/dashboard/orders/${order.id}`}
                          className="text-xs text-neon hover:underline"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {orders.length === 0 && (
              <p className="p-8 text-center text-muted text-sm">Belum ada order.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
