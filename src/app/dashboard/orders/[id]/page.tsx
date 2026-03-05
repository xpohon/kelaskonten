"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

interface OrderDetail {
  id: string;
  serviceType: string;
  packageName: string;
  price: number;
  status: string;
  brief: string | null;
  targetAudience: string | null;
  deadline: string | null;
  createdAt: string;
  payment?: { status: string; method: string | null; paidAt: string | null; midtransOrderId: string };
  deliverables: { id: string; fileName: string; fileUrl: string; uploadedAt: string }[];
  messages: { id: string; content: string; createdAt: string; sender: { name: string; role: string } }[];
}

const statusSteps = ["PENDING_PAYMENT", "IN_PROGRESS", "REVIEW", "COMPLETED"];
const stepLabels: Record<string, string> = {
  PENDING_PAYMENT: "Pembayaran",
  IN_PROGRESS: "Pengerjaan",
  REVIEW: "Review",
  COMPLETED: "Selesai",
};

export default function OrderDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [message, setMessage] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [newFileUrl, setNewFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const isAdmin = session && (session.user as { role?: string }).role === "ADMIN";

  useEffect(() => {
    if (status === "unauthenticated") router.push("/masuk");
  }, [status, router]);

  const refreshOrder = async () => {
    const res = await fetch(`/api/orders/${params.id}`);
    const data = await res.json();
    setOrder(data.order);
  };

  useEffect(() => {
    if (session) {
      refreshOrder();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, params.id]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    await fetch(`/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: params.id, content: message }),
    });
    setMessage("");
    refreshOrder();
  };

  const handleAddDeliverable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim() || !newFileUrl.trim()) return;
    setUploading(true);
    await fetch("/api/admin/deliverables", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: params.id,
        fileName: newFileName,
        fileUrl: newFileUrl,
      }),
    });
    setNewFileName("");
    setNewFileUrl("");
    setUploading(false);
    refreshOrder();
  };

  const handleDeleteDeliverable = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus file ini?")) return;
    setDeletingId(id);
    await fetch(`/api/admin/deliverables/${id}`, { method: "DELETE" });
    setDeletingId(null);
    refreshOrder();
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

  const currentStep = statusSteps.indexOf(order.status);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={isAdmin ? "/admin" : "/dashboard"} className="inline-flex items-center gap-1 text-sm text-muted hover:text-neon mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isAdmin ? "Kembali ke Admin" : "Kembali ke Dashboard"}
          </Link>

          <h1 className="text-2xl font-heading font-bold mb-2">
            {order.serviceType} — {order.packageName}
          </h1>
          <p className="text-sm text-muted mb-8">Order ID: {order.id}</p>

          {/* Timeline */}
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
            {statusSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  i <= currentStep ? "bg-neon text-[#0a0a0f]" : "bg-card-bg border border-card-border text-muted"
                }`}>
                  {i < currentStep ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`text-xs whitespace-nowrap ${i <= currentStep ? "text-foreground" : "text-muted"}`}>
                  {stepLabels[step]}
                </span>
                {i < statusSteps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-px ${i < currentStep ? "bg-neon" : "bg-card-border"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Order details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-xl bg-card-bg border border-card-border space-y-3">
                <h3 className="font-heading font-bold">Detail Order</h3>
                {order.brief && (
                  <div>
                    <span className="text-sm text-muted">Brief:</span>
                    <p className="text-sm mt-1">{order.brief}</p>
                  </div>
                )}
                {order.targetAudience && (
                  <div>
                    <span className="text-sm text-muted">Target Audience:</span>
                    <p className="text-sm mt-1">{order.targetAudience}</p>
                  </div>
                )}
                {order.deadline && (
                  <div>
                    <span className="text-sm text-muted">Deadline:</span>
                    <p className="text-sm mt-1">
                      {new Date(order.deadline).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                )}
              </div>

              {/* Deliverables */}
              <div className="p-6 rounded-xl bg-card-bg border border-card-border">
                <h3 className="font-heading font-bold mb-4">File Deliverable</h3>
                {order.deliverables.length === 0 ? (
                  <p className="text-sm text-muted">Belum ada file.</p>
                ) : (
                  <div className="space-y-2">
                    {order.deliverables.map((d) => (
                      <div key={d.id} className="flex items-center justify-between p-3 rounded-lg bg-surface">
                        <span className="text-sm">{d.fileName}</span>
                        <div className="flex items-center gap-3">
                          <a
                            href={d.fileUrl}
                            className="text-xs text-neon hover:underline"
                            download
                          >
                            Download
                          </a>
                          {isAdmin && (
                            <button
                              onClick={() => handleDeleteDeliverable(d.id)}
                              disabled={deletingId === d.id}
                              className="text-xs text-red-400 hover:underline disabled:opacity-50"
                            >
                              {deletingId === d.id ? "..." : "Hapus"}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Admin upload form */}
                {isAdmin && (
                  <form onSubmit={handleAddDeliverable} className="mt-4 pt-4 border-t border-card-border">
                    <p className="text-xs text-muted mb-3 uppercase tracking-wider font-semibold">
                      Tambah Deliverable
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        placeholder="Nama file (e.g. artikel-seo.docx)"
                        required
                        className="flex-1 px-3 py-2 bg-surface border border-card-border rounded-lg text-sm focus:outline-none focus:border-neon"
                      />
                      <input
                        value={newFileUrl}
                        onChange={(e) => setNewFileUrl(e.target.value)}
                        placeholder="URL file (Google Drive, dsb.)"
                        required
                        className="flex-1 px-3 py-2 bg-surface border border-card-border rounded-lg text-sm focus:outline-none focus:border-neon"
                      />
                      <button
                        type="submit"
                        disabled={uploading}
                        className="px-4 py-2 bg-neon text-[#0a0a0f] font-semibold text-sm rounded-lg hover:bg-neon/90 transition-colors disabled:opacity-50 whitespace-nowrap"
                      >
                        {uploading ? "..." : "Tambah File"}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Messages */}
              <div className="p-6 rounded-xl bg-card-bg border border-card-border">
                <h3 className="font-heading font-bold mb-4">Chat</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                  {order.messages.length === 0 ? (
                    <p className="text-sm text-muted">Belum ada pesan.</p>
                  ) : (
                    order.messages.map((msg) => (
                      <div key={msg.id} className={`p-3 rounded-lg ${
                        msg.sender.role === "ADMIN" ? "bg-neon/5 border border-neon/10" : "bg-surface"
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold">{msg.sender.name}</span>
                          <span className="text-xs text-muted">
                            {new Date(msg.createdAt).toLocaleString("id-ID")}
                          </span>
                        </div>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tulis pesan..."
                    className="flex-1 px-4 py-2.5 bg-surface border border-card-border rounded-xl text-sm focus:outline-none focus:border-neon"
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2.5 bg-neon text-[#0a0a0f] font-semibold text-sm rounded-xl"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
                  Pembayaran
                </h3>
                <p className="text-xl font-bold text-neon">
                  Rp {order.price.toLocaleString("id-ID")}
                </p>
                <p className="text-xs text-muted mt-1">
                  Status: {order.payment?.status || "Pending"}
                </p>
                {order.payment?.paidAt && (
                  <p className="text-xs text-muted mt-1">
                    Dibayar: {new Date(order.payment.paidAt).toLocaleDateString("id-ID")}
                  </p>
                )}
              </div>
              <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
                  Info
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Dibuat</span>
                    <span>{new Date(order.createdAt).toLocaleDateString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Layanan</span>
                    <span>{order.serviceType}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
