"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { Input, Textarea } from "@/components/ui/Input";

interface ServicePackage {
  id: string;
  serviceType: string;
  name: string;
  price: number;
  description: string;
  features: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

const SERVICE_TYPES = ["SEO", "CONTENT", "COPYWRITING"];

const SERVICE_LABELS: Record<string, string> = {
  SEO: "SEO & Backlink Building",
  CONTENT: "Penulisan Artikel & Konten",
  COPYWRITING: "Copywriting & Konten Sosmed",
};

const emptyForm = {
  serviceType: "SEO",
  name: "",
  price: "",
  description: "",
  isActive: true,
  sortOrder: "0",
};

export default function PackagesAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/masuk");
    if (session && (session.user as { role?: string }).role !== "ADMIN") {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session) fetchPackages();
  }, [session]);

  const fetchPackages = async () => {
    const res = await fetch("/api/admin/packages");
    const data = await res.json();
    setPackages(data.packages || []);
  };

  const handleSave = async () => {
    setError("");

    if (!form.name.trim() || !form.description.trim() || !form.price) {
      setError("Nama, harga, dan deskripsi wajib diisi");
      return;
    }

    const price = parseInt(form.price);
    if (isNaN(price) || price < 0) {
      setError("Harga harus berupa angka positif");
      return;
    }

    setSaving(true);

    try {
      const body = {
        serviceType: form.serviceType,
        name: form.name.trim(),
        price,
        description: form.description.trim(),
        isActive: form.isActive,
        sortOrder: parseInt(form.sortOrder) || 0,
      };

      let res;
      if (view === "edit" && editId) {
        res = await fetch(`/api/admin/packages/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch("/api/admin/packages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      await fetchPackages();
      setView("list");
      setForm(emptyForm);
      setEditId(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (pkg: ServicePackage) => {
    setForm({
      serviceType: pkg.serviceType,
      name: pkg.name,
      price: String(pkg.price),
      description: pkg.description,
      isActive: pkg.isActive,
      sortOrder: String(pkg.sortOrder),
    });
    setEditId(pkg.id);
    setView("edit");
    setError("");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus paket ini?")) return;

    const res = await fetch(`/api/admin/packages/${id}`, { method: "DELETE" });
    if (res.ok) {
      await fetchPackages();
    }
  };

  const handleToggleActive = async (pkg: ServicePackage) => {
    await fetch(`/api/admin/packages/${pkg.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !pkg.isActive }),
    });
    await fetchPackages();
  };

  const filteredPackages =
    filter === "ALL" ? packages : packages.filter((p) => p.serviceType === filter);

  if (status === "loading") return null;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold">
                {view === "list"
                  ? "Kelola Paket Layanan"
                  : view === "create"
                  ? "Tambah Paket Baru"
                  : "Edit Paket"}
              </h1>
              <p className="text-muted text-sm mt-1">
                {view === "list"
                  ? "Atur harga, deskripsi, dan status paket layanan"
                  : "Isi detail paket di bawah ini"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="px-4 py-2.5 text-sm text-muted border border-card-border rounded-xl hover:text-foreground transition-colors"
              >
                Kembali
              </Link>
              {view === "list" ? (
                <button
                  onClick={() => {
                    setForm(emptyForm);
                    setEditId(null);
                    setError("");
                    setView("create");
                  }}
                  className="px-4 py-2.5 text-sm bg-neon text-[#0a0a0f] font-medium rounded-xl hover:shadow-[0_0_20px_rgba(79,255,176,0.3)] transition-all"
                >
                  + Tambah Paket
                </button>
              ) : (
                <button
                  onClick={() => {
                    setView("list");
                    setError("");
                  }}
                  className="px-4 py-2.5 text-sm text-muted border border-card-border rounded-xl hover:text-foreground transition-colors"
                >
                  Batal
                </button>
              )}
            </div>
          </div>

          {/* List View */}
          {view === "list" && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                  <p className="text-sm text-muted">Total Paket</p>
                  <p className="text-2xl font-heading font-bold mt-1">{packages.length}</p>
                </div>
                <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                  <p className="text-sm text-muted">Paket Aktif</p>
                  <p className="text-2xl font-heading font-bold text-neon mt-1">
                    {packages.filter((p) => p.isActive).length}
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                  <p className="text-sm text-muted">Paket Nonaktif</p>
                  <p className="text-2xl font-heading font-bold text-muted mt-1">
                    {packages.filter((p) => !p.isActive).length}
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                  <p className="text-sm text-muted">Jenis Layanan</p>
                  <p className="text-2xl font-heading font-bold mt-1">
                    {new Set(packages.map((p) => p.serviceType)).size}
                  </p>
                </div>
              </div>

              {/* Filter */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setFilter("ALL")}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                    filter === "ALL"
                      ? "bg-neon text-[#0a0a0f] font-medium"
                      : "bg-surface border border-card-border text-muted hover:text-foreground"
                  }`}
                >
                  Semua
                </button>
                {SERVICE_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                      filter === t
                        ? "bg-neon text-[#0a0a0f] font-medium"
                        : "bg-surface border border-card-border text-muted hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Table */}
              <div className="rounded-2xl bg-card-bg border border-card-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-surface text-xs text-muted uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3 text-left">Layanan</th>
                        <th className="px-5 py-3 text-left">Nama Paket</th>
                        <th className="px-5 py-3 text-left">Harga</th>
                        <th className="px-5 py-3 text-left">Deskripsi</th>
                        <th className="px-5 py-3 text-left">Urutan</th>
                        <th className="px-5 py-3 text-left">Status</th>
                        <th className="px-5 py-3 text-left">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-card-border">
                      {filteredPackages.map((pkg) => (
                        <tr key={pkg.id} className="hover:bg-surface/50">
                          <td className="px-5 py-3">
                            <span className="text-xs px-2 py-1 rounded-md bg-neon/10 text-neon font-medium">
                              {pkg.serviceType}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-sm font-medium">{pkg.name}</td>
                          <td className="px-5 py-3 text-sm font-medium text-neon">
                            Rp {pkg.price.toLocaleString("id-ID")}
                          </td>
                          <td className="px-5 py-3 text-xs text-muted max-w-[200px] truncate">
                            {pkg.description}
                          </td>
                          <td className="px-5 py-3 text-xs text-muted">{pkg.sortOrder}</td>
                          <td className="px-5 py-3">
                            <button
                              onClick={() => handleToggleActive(pkg)}
                              className={`text-xs px-2 py-1 rounded-md font-medium cursor-pointer transition-colors ${
                                pkg.isActive
                                  ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                                  : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
                              }`}
                            >
                              {pkg.isActive ? "Aktif" : "Nonaktif"}
                            </button>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEdit(pkg)}
                                className="text-xs text-neon hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(pkg.id)}
                                className="text-xs text-red-400 hover:underline"
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredPackages.length === 0 && (
                  <p className="p-8 text-center text-muted text-sm">
                    {filter === "ALL" ? "Belum ada paket." : `Belum ada paket ${filter}.`}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Create/Edit Form */}
          {(view === "create" || view === "edit") && (
            <div className="max-w-2xl">
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-5 p-6 rounded-2xl bg-card-bg border border-card-border">
                {/* Service Type */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Jenis Layanan</label>
                  <select
                    value={form.serviceType}
                    onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                    className="w-full px-4 py-3 bg-surface border border-card-border rounded-xl text-foreground focus:outline-none focus:border-neon transition-colors"
                  >
                    {SERVICE_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {SERVICE_LABELS[t] || t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Package Name */}
                <Input
                  label="Nama Paket"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: Basic, Pro, Enterprise"
                />

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Harga (Rupiah)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm">Rp</span>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-surface border border-card-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-neon transition-colors"
                      placeholder="500000"
                      min="0"
                    />
                  </div>
                  {form.price && !isNaN(parseInt(form.price)) && (
                    <p className="text-xs text-muted mt-1">
                      = Rp {parseInt(form.price).toLocaleString("id-ID")}
                    </p>
                  )}
                </div>

                {/* Description */}
                <Textarea
                  label="Deskripsi"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Deskripsi singkat paket, contoh: 5 keyword, audit on-page, laporan bulanan"
                  rows={3}
                />

                {/* Sort Order */}
                <Input
                  label="Urutan Tampil"
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                  helperText="Angka kecil tampil lebih dulu (0, 1, 2, ...)"
                />

                {/* Active Toggle */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, isActive: !form.isActive })}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      form.isActive ? "bg-neon" : "bg-card-border"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        form.isActive ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className="text-sm">
                    {form.isActive ? "Aktif (tampil di halaman order)" : "Nonaktif (tersembunyi)"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setView("list");
                      setError("");
                    }}
                    className="px-6 py-3 border border-card-border rounded-xl text-muted hover:text-foreground transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-3 bg-neon text-[#0a0a0f] font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(79,255,176,0.3)] transition-all disabled:opacity-50"
                  >
                    {saving
                      ? "Menyimpan..."
                      : view === "edit"
                      ? "Update Paket"
                      : "Simpan Paket"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
