"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<{
    id: string;
    serviceType: string;
    packageName: string;
    price: number;
    status: string;
    payment?: { midtransOrderId: string; status: string; snapToken: string };
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const [paymentDone, setPaymentDone] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then((r) => r.json())
      .then((data) => setOrder(data.order));
  }, [orderId]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const simulatePayment = async () => {
    // Simulate successful payment via webhook
    if (!order?.payment) return;
    await fetch("/api/payment/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: order.payment.midtransOrderId,
        transaction_status: "settlement",
        payment_type: "bank_transfer",
      }),
    });
    setPaymentDone(true);
    setTimeout(() => router.push("/dashboard"), 2000);
  };

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted">Memuat...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-lg mx-auto px-4">
          {paymentDone ? (
            <div className="text-center p-8 rounded-2xl bg-card-bg border border-neon">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-heading font-bold mb-2">Pembayaran Berhasil!</h2>
              <p className="text-muted text-sm">
                Order Anda sedang diproses. Mengalihkan ke dashboard...
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-heading font-bold mb-2">Pembayaran</h1>
              <p className="text-muted text-sm mb-6">
                Selesaikan pembayaran sebelum waktu habis.
              </p>

              {/* Countdown */}
              <div className="p-4 rounded-xl bg-card-bg border border-card-border text-center mb-6">
                <p className="text-xs text-muted mb-1">Bayar sebelum</p>
                <p className="text-2xl font-heading font-bold text-neon font-mono">
                  {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}
                </p>
              </div>

              {/* Order summary */}
              <div className="p-6 rounded-xl bg-card-bg border border-card-border mb-6 space-y-3">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">
                  Detail Order
                </h3>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Layanan</span>
                  <span>{order.serviceType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Paket</span>
                  <span>{order.packageName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Order ID</span>
                  <span className="font-mono text-xs">{order.payment?.midtransOrderId}</span>
                </div>
                <div className="pt-3 border-t border-card-border flex justify-between">
                  <span className="font-semibold">Total Bayar</span>
                  <span className="text-xl font-bold text-neon">
                    Rp {order.price.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Payment button (sandbox simulation) */}
              <div className="space-y-3">
                <button
                  onClick={simulatePayment}
                  className="w-full py-4 bg-neon text-[#0a0a0f] font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(79,255,176,0.3)] transition-all text-base"
                >
                  Bayar Sekarang (Sandbox)
                </button>
                <p className="text-xs text-center text-muted">
                  Mode sandbox — klik untuk simulasi pembayaran berhasil.
                  Di produksi, ini akan membuka Midtrans Snap popup.
                </p>
                <Link
                  href="/dashboard"
                  className="block text-center text-sm text-muted hover:text-foreground transition-colors"
                >
                  Bayar nanti
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
