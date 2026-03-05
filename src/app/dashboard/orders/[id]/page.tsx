"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

interface DeliverableItem {
  id: string;
  fileName: string;
  fileUrl: string;
  category: string;
  description: string | null;
  uploadedAt: string;
}

interface ScopeItemData {
  id: string;
  content: string;
  sortOrder: number;
}

interface RevisionRequestData {
  id: string;
  revisionNumber: number;
  feedback: string;
  status: string;
  createdAt: string;
  resolvedAt: string | null;
}

interface OrderDetail {
  id: string;
  serviceType: string;
  packageName: string;
  price: number;
  status: string;
  brief: string | null;
  targetAudience: string | null;
  deadline: string | null;
  scopeApprovedAt: string | null;
  revisionCount: number;
  createdAt: string;
  payment?: { status: string; method: string | null; paidAt: string | null; midtransOrderId: string };
  deliverables: DeliverableItem[];
  scopeItems: ScopeItemData[];
  revisionRequests: RevisionRequestData[];
  messages: { id: string; content: string; createdAt: string; sender: { name: string; role: string } }[];
}

const statusSteps = ["PENDING_PAYMENT", "SCOPE_REVIEW", "IN_PROGRESS", "REVIEW", "COMPLETED"];
const stepLabels: Record<string, string> = {
  PENDING_PAYMENT: "Pembayaran",
  SCOPE_REVIEW: "Scope",
  IN_PROGRESS: "Pengerjaan",
  REVIEW: "Review",
  COMPLETED: "Selesai",
};

// Kategori predefined per service type
const CATEGORY_OPTIONS: Record<string, string[]> = {
  SEO: ["Riset & Audit", "Implementasi", "Laporan"],
  CONTENT: ["Draft", "Revisi", "Final"],
  COPYWRITING: ["Draft", "Revisi", "Final"],
};

// Icon berdasarkan ekstensi file
function getFileIcon(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase() || "";
  if (["pdf"].includes(ext)) {
    return (
      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }
  if (["doc", "docx"].includes(ext)) {
    return (
      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6M9 16h4" />
        </svg>
      </div>
    );
  }
  if (["xls", "xlsx", "csv"].includes(ext)) {
    return (
      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18M8 6v12M16 6v12M3 6h18v12H3z" />
        </svg>
      </div>
    );
  }
  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) {
    return (
      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-lg bg-card-border/30 flex items-center justify-center shrink-0">
      <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    </div>
  );
}

// Icon untuk kategori
function getCategoryIcon(category: string) {
  const map: Record<string, string> = {
    "Riset & Audit": "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    "Implementasi": "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    "Laporan": "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    "Draft": "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    "Revisi": "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    "Final": "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  };
  const path = map[category] || "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4";
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={path} />
    </svg>
  );
}

export default function OrderDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [message, setMessage] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [newFileUrl, setNewFileUrl] = useState("");
  const [newCategory, setNewCategory] = useState("Umum");
  const [newDescription, setNewDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [newScopeItem, setNewScopeItem] = useState("");
  const [addingScope, setAddingScope] = useState(false);
  const [approvingScope, setApprovingScope] = useState(false);
  const [showRevisionForm, setShowRevisionForm] = useState(false);
  const [revisionFeedback, setRevisionFeedback] = useState("");
  const [requestingRevision, setRequestingRevision] = useState(false);

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
        category: newCategory,
        description: newDescription || null,
      }),
    });
    setNewFileName("");
    setNewFileUrl("");
    setNewDescription("");
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

  const handleAddScopeItem = async () => {
    if (!newScopeItem.trim()) return;
    setAddingScope(true);
    await fetch(`/api/orders/${params.id}/scope`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newScopeItem }),
    });
    setNewScopeItem("");
    setAddingScope(false);
    refreshOrder();
  };

  const handleDeleteScopeItem = async (itemId: string) => {
    await fetch(`/api/orders/${params.id}/scope`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    });
    refreshOrder();
  };

  const handleApproveScope = async () => {
    if (!window.confirm("Dengan menyetujui, Anda menerima bahwa pekerjaan di luar scope ini akan dikenakan biaya tambahan. Lanjutkan?")) return;
    setApprovingScope(true);
    await fetch(`/api/orders/${params.id}/scope/approve`, { method: "POST" });
    setApprovingScope(false);
    refreshOrder();
  };

  const handleRequestRevision = async () => {
    if (!revisionFeedback.trim()) return;
    setRequestingRevision(true);
    await fetch(`/api/orders/${params.id}/revisions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback: revisionFeedback }),
    });
    setRevisionFeedback("");
    setShowRevisionForm(false);
    setRequestingRevision(false);
    refreshOrder();
  };

  const updateOrderStatus = async (newStatus: string) => {
    await fetch(`/api/orders/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    refreshOrder();
  };

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-6 h-6 border-2 border-neon/30 border-t-neon rounded-full animate-spin mb-3" />
            <p className="text-muted text-sm">Memuat order...</p>
          </div>
        </div>
      </>
    );
  }

  const currentStep = statusSteps.indexOf(order.status);

  // Group deliverables by category
  const deliverablesByCategory: Record<string, DeliverableItem[]> = {};
  for (const d of order.deliverables) {
    if (!deliverablesByCategory[d.category]) {
      deliverablesByCategory[d.category] = [];
    }
    deliverablesByCategory[d.category].push(d);
  }

  // Predefined categories for this service type + any custom ones
  const predefinedCats = CATEGORY_OPTIONS[order.serviceType] || [];
  const allCategories = [
    ...predefinedCats,
    ...Object.keys(deliverablesByCategory).filter((c) => !predefinedCats.includes(c) && c !== "Umum"),
  ];
  if (deliverablesByCategory["Umum"]) {
    allCategories.push("Umum");
  }
  const uniqueCategories = [...new Set(allCategories)];

  const totalFiles = order.deliverables.length;
  const categoriesWithFiles = Object.keys(deliverablesByCategory).length;

  // Category options for admin dropdown
  const categoryOptions = [
    ...(CATEGORY_OPTIONS[order.serviceType] || []),
    "Umum",
  ];

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={isAdmin ? "/admin" : "/dashboard"} className="inline-flex items-center gap-1 text-sm text-muted hover:text-neon mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isAdmin ? "Kembali ke Admin" : "Kembali ke Dashboard"}
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold mb-1">
              {order.serviceType} — {order.packageName}
            </h1>
            <p className="text-sm text-muted">Order ID: {order.id}</p>
          </div>

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
                <span className={`text-xs whitespace-nowrap ${i <= currentStep ? "text-foreground font-medium" : "text-muted"}`}>
                  {stepLabels[step]}
                </span>
                {i < statusSteps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-px ${i < currentStep ? "bg-neon" : "bg-card-border"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Revision indicator */}
          {order.status === "REVISION" && (
            <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <svg className="w-5 h-5 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-sm text-orange-300 font-medium">
                Revisi #{order.revisionRequests?.[0]?.revisionNumber || order.revisionCount + 1} — menunggu pengerjaan ulang
              </span>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">

              {/* ===== SCOPE SECTION ===== */}
              {(order.scopeItems.length > 0 || order.status === "SCOPE_REVIEW") && (
                <div className={`p-6 rounded-2xl border ${order.scopeApprovedAt ? "bg-card-bg border-card-border" : "bg-cyan-500/5 border-cyan-500/20"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <h3 className="font-heading font-bold text-lg">Ruang Lingkup Pekerjaan</h3>
                  </div>

                  {order.scopeApprovedAt ? (
                    <p className="text-xs text-neon mb-4 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Disetujui pada {new Date(order.scopeApprovedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  ) : isAdmin ? (
                    <p className="text-xs text-muted mb-4">Buat scope untuk klien approve sebelum pengerjaan dimulai.</p>
                  ) : (
                    <p className="text-xs text-muted mb-4">Review scope berikut sebelum kami mulai pengerjaan.</p>
                  )}

                  {/* Scope items list */}
                  {order.scopeItems.length > 0 ? (
                    <div className="space-y-2 mb-4">
                      {order.scopeItems.map((item) => (
                        <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-surface">
                          <svg className={`w-4 h-4 mt-0.5 shrink-0 ${order.scopeApprovedAt ? "text-neon" : "text-cyan-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <p className="text-sm flex-1">{item.content}</p>
                          {isAdmin && !order.scopeApprovedAt && (
                            <button
                              onClick={() => handleDeleteScopeItem(item.id)}
                              className="p-1 text-muted hover:text-red-400 transition-colors shrink-0"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 rounded-xl border border-dashed border-card-border text-center mb-4">
                      <p className="text-sm text-muted">
                        {isAdmin ? "Belum ada scope item. Tambahkan di bawah." : "Admin sedang menyiapkan scope pekerjaan Anda."}
                      </p>
                    </div>
                  )}

                  {/* Admin: add scope item form */}
                  {isAdmin && !order.scopeApprovedAt && (
                    <div className="flex gap-2">
                      <input
                        value={newScopeItem}
                        onChange={(e) => setNewScopeItem(e.target.value)}
                        placeholder="Contoh: 5 artikel blog x 800 kata, SEO-optimized"
                        className="flex-1 px-3 py-2 bg-surface border border-card-border rounded-lg text-sm focus:outline-none focus:border-cyan-400"
                        onKeyDown={(e) => e.key === "Enter" && handleAddScopeItem()}
                      />
                      <button
                        onClick={handleAddScopeItem}
                        disabled={addingScope || !newScopeItem.trim()}
                        className="px-4 py-2 bg-cyan-500 text-white font-semibold text-sm rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 shrink-0"
                      >
                        {addingScope ? "..." : "+ Tambah"}
                      </button>
                    </div>
                  )}

                  {/* Admin: waiting badge */}
                  {isAdmin && !order.scopeApprovedAt && order.scopeItems.length > 0 && (
                    <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-2">
                      <svg className="w-4 h-4 text-yellow-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-yellow-300">Menunggu persetujuan klien untuk scope ini.</p>
                    </div>
                  )}

                  {/* Client: approve button */}
                  {!isAdmin && !order.scopeApprovedAt && order.scopeItems.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <p className="text-xs text-yellow-300">
                          Dengan menyetujui, Anda menerima bahwa pekerjaan di luar scope ini akan dikenakan biaya tambahan.
                        </p>
                      </div>
                      <button
                        onClick={handleApproveScope}
                        disabled={approvingScope}
                        className="w-full py-3 bg-neon text-[#0a0a0f] font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(79,255,176,0.3)] transition-all disabled:opacity-50"
                      >
                        {approvingScope ? "Memproses..." : "Setuju & Mulai Pengerjaan"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ===== DELIVERABLES SECTION ===== */}
              <div className="p-6 rounded-2xl bg-card-bg border border-card-border">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-heading font-bold text-lg">Deliverable</h3>
                    <p className="text-xs text-muted mt-0.5">
                      {totalFiles > 0
                        ? `${totalFiles} file dalam ${categoriesWithFiles} kategori`
                        : "Belum ada file deliverable"}
                    </p>
                  </div>
                  {totalFiles > 0 && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neon/10 text-neon text-xs font-medium">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      {totalFiles} file
                    </div>
                  )}
                </div>

                {totalFiles === 0 && !isAdmin ? (
                  <div className="text-center py-10">
                    <svg className="w-12 h-12 text-card-border mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    <p className="text-muted text-sm">File deliverable akan muncul di sini</p>
                    <p className="text-muted text-xs mt-1">Anda akan mendapat notifikasi saat tim kami mengirim file.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {uniqueCategories.map((cat) => {
                      const files = deliverablesByCategory[cat] || [];
                      return (
                        <div key={cat}>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-neon">{getCategoryIcon(cat)}</span>
                            <h4 className="text-sm font-semibold">{cat}</h4>
                            <span className="text-xs text-muted ml-auto">
                              {files.length > 0 ? `${files.length} file` : "Menunggu"}
                            </span>
                          </div>

                          {files.length === 0 ? (
                            <div className="ml-7 p-4 rounded-xl border border-dashed border-card-border">
                              <p className="text-xs text-muted flex items-center gap-2">
                                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                File untuk tahap ini akan dikirim oleh tim kami
                              </p>
                            </div>
                          ) : (
                            <div className="ml-7 space-y-2">
                              {files.map((d) => (
                                <div key={d.id} className="group flex items-start gap-3 p-3 rounded-xl bg-surface hover:bg-surface/80 transition-colors">
                                  {getFileIcon(d.fileName)}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{d.fileName}</p>
                                    {d.description && (
                                      <p className="text-xs text-muted mt-0.5">{d.description}</p>
                                    )}
                                    <p className="text-xs text-muted mt-1">
                                      {new Date(d.uploadedAt).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <a
                                      href={d.fileUrl}
                                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-neon bg-neon/10 rounded-lg hover:bg-neon/20 transition-colors"
                                      download
                                    >
                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                      </svg>
                                      Download
                                    </a>
                                    {isAdmin && (
                                      <button
                                        onClick={() => handleDeleteDeliverable(d.id)}
                                        disabled={deletingId === d.id}
                                        className="p-1.5 text-muted hover:text-red-400 transition-colors disabled:opacity-50"
                                        title="Hapus file"
                                      >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Admin upload form */}
                {isAdmin && (
                  <form onSubmit={handleAddDeliverable} className="mt-6 pt-5 border-t border-card-border">
                    <p className="text-xs text-muted mb-3 uppercase tracking-wider font-semibold">
                      Tambah Deliverable
                    </p>
                    <div className="space-y-3">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-muted mb-1">Kategori</label>
                          <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="w-full px-3 py-2 bg-surface border border-card-border rounded-lg text-sm focus:outline-none focus:border-neon"
                          >
                            {categoryOptions.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-muted mb-1">Nama File</label>
                          <input
                            value={newFileName}
                            onChange={(e) => setNewFileName(e.target.value)}
                            placeholder="contoh: keyword-research.pdf"
                            required
                            className="w-full px-3 py-2 bg-surface border border-card-border rounded-lg text-sm focus:outline-none focus:border-neon"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-muted mb-1">URL File</label>
                        <input
                          value={newFileUrl}
                          onChange={(e) => setNewFileUrl(e.target.value)}
                          placeholder="https://drive.google.com/..."
                          required
                          className="w-full px-3 py-2 bg-surface border border-card-border rounded-lg text-sm focus:outline-none focus:border-neon"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted mb-1">Deskripsi (opsional)</label>
                        <input
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                          placeholder="contoh: Riset 5 keyword target + search volume"
                          className="w-full px-3 py-2 bg-surface border border-card-border rounded-lg text-sm focus:outline-none focus:border-neon"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={uploading}
                        className="px-4 py-2 bg-neon text-[#0a0a0f] font-semibold text-sm rounded-lg hover:bg-neon/90 transition-colors disabled:opacity-50"
                      >
                        {uploading ? "Mengunggah..." : "Tambah File"}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* ===== ADMIN: REVISION REQUEST DETAIL ===== */}
              {isAdmin && order.status === "REVISION" && order.revisionRequests?.[0] && (
                <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/20">
                  <h3 className="font-heading font-bold text-lg mb-2">
                    Permintaan Revisi #{order.revisionRequests[0].revisionNumber}
                  </h3>
                  <div className="p-4 rounded-xl bg-surface mb-4">
                    <p className="text-sm">{order.revisionRequests[0].feedback}</p>
                    <p className="text-xs text-muted mt-2">
                      Diminta pada {new Date(order.revisionRequests[0].createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <button
                    onClick={() => updateOrderStatus("IN_PROGRESS")}
                    className="px-4 py-2.5 bg-blue-500 text-white font-semibold text-sm rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    Mulai Pengerjaan Ulang
                  </button>
                </div>
              )}

              {/* ===== CLIENT: REQUEST REVISION (when REVIEW) ===== */}
              {!isAdmin && order.status === "REVIEW" && (
                <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/20">
                  <h3 className="font-heading font-bold text-lg mb-2">Butuh Revisi?</h3>
                  <p className="text-sm text-muted mb-4">
                    Jika hasil belum sesuai, Anda dapat meminta revisi dengan memberikan feedback.
                  </p>
                  {!showRevisionForm ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowRevisionForm(true)}
                        className="px-4 py-2.5 bg-orange-500 text-white font-semibold text-sm rounded-xl hover:bg-orange-600 transition-colors"
                      >
                        Minta Revisi
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm("Setujui semua deliverable dan selesaikan order?")) {
                            updateOrderStatus("COMPLETED");
                          }
                        }}
                        className="px-4 py-2.5 bg-neon text-[#0a0a0f] font-semibold text-sm rounded-xl hover:shadow-[0_0_20px_rgba(79,255,176,0.3)] transition-all"
                      >
                        Setuju & Selesaikan
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <textarea
                        value={revisionFeedback}
                        onChange={(e) => setRevisionFeedback(e.target.value)}
                        placeholder="Jelaskan apa yang perlu diubah..."
                        rows={4}
                        className="w-full px-4 py-3 bg-surface border border-card-border rounded-xl text-sm focus:outline-none focus:border-orange-400 resize-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleRequestRevision}
                          disabled={requestingRevision || !revisionFeedback.trim()}
                          className="px-4 py-2.5 bg-orange-500 text-white font-semibold text-sm rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50"
                        >
                          {requestingRevision ? "Mengirim..." : "Kirim Permintaan Revisi"}
                        </button>
                        <button
                          onClick={() => { setShowRevisionForm(false); setRevisionFeedback(""); }}
                          className="px-4 py-2.5 text-muted text-sm rounded-xl hover:text-foreground transition-colors"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ===== REVISION HISTORY ===== */}
              {order.revisionRequests && order.revisionRequests.length > 0 && (
                <div className="p-6 rounded-2xl bg-card-bg border border-card-border">
                  <h3 className="font-heading font-bold text-lg mb-4">Riwayat Revisi</h3>
                  <div className="space-y-3">
                    {order.revisionRequests.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-xl bg-surface">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold">Revisi #{rev.revisionNumber}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            rev.status === "RESOLVED" ? "text-neon bg-neon/10" :
                            rev.status === "IN_PROGRESS" ? "text-blue-400 bg-blue-400/10" :
                            "text-orange-400 bg-orange-400/10"
                          }`}>
                            {rev.status === "RESOLVED" ? "Selesai" : rev.status === "IN_PROGRESS" ? "Dikerjakan" : "Menunggu"}
                          </span>
                        </div>
                        <p className="text-sm text-muted">{rev.feedback}</p>
                        <p className="text-xs text-muted mt-2">
                          {new Date(rev.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== DETAIL ORDER ===== */}
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
                {!order.brief && !order.targetAudience && !order.deadline && (
                  <p className="text-sm text-muted">Tidak ada detail tambahan.</p>
                )}
              </div>

              {/* ===== CHAT ===== */}
              <div className="p-6 rounded-xl bg-card-bg border border-card-border">
                <h3 className="font-heading font-bold mb-4">Chat</h3>
                <div className="space-y-3 max-h-72 overflow-y-auto mb-4">
                  {order.messages.length === 0 ? (
                    <p className="text-sm text-muted">Belum ada pesan.</p>
                  ) : (
                    order.messages.map((msg) => (
                      <div key={msg.id} className={`p-3 rounded-lg ${
                        msg.sender.role === "ADMIN" ? "bg-neon/5 border border-neon/10" : "bg-surface"
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold">{msg.sender.name}</span>
                          {msg.sender.role === "ADMIN" && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-neon/10 text-neon font-medium">Admin</span>
                          )}
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

            {/* ===== SIDEBAR ===== */}
            <div className="space-y-4">
              {/* Deliverable summary */}
              <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
                  Ringkasan File
                </h3>
                {totalFiles === 0 ? (
                  <p className="text-sm text-muted">Belum ada file</p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-2xl font-heading font-bold text-neon">{totalFiles} file</p>
                    <div className="space-y-1">
                      {Object.entries(deliverablesByCategory).map(([cat, files]) => (
                        <div key={cat} className="flex items-center justify-between text-xs">
                          <span className="text-muted">{cat}</span>
                          <span className="font-medium">{files.length}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Payment */}
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

              {/* Order info */}
              <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
                  Info Order
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
                  <div className="flex justify-between">
                    <span className="text-muted">Paket</span>
                    <span>{order.packageName}</span>
                  </div>
                  {order.revisionCount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted">Revisi</span>
                      <span className="text-orange-400 font-medium">{order.revisionCount}x</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
