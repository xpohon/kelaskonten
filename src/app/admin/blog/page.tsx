"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { Input, Textarea } from "@/components/ui/Input";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage: string | null;
  readTime: number;
  views: number;
  author: string;
  publishedAt: string;
  content: string;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
}

const categories = ["SEO", "Penulisan Konten", "Copywriting", "Media Sosial"];

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  category: "SEO",
  coverImage: "",
  readTime: "5",
  author: "Tim KelasKonten",
  seoTitle: "",
  seoDescription: "",
};

export default function BlogAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("Semua");
  const [saving, setSaving] = useState(false);
  const [showSeo, setShowSeo] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/masuk");
    if (session && (session.user as { role?: string }).role !== "ADMIN") {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  const fetchArticles = () => {
    fetch("/api/admin/articles")
      .then((r) => r.json())
      .then((data) => setArticles(data.articles || []));
  };

  useEffect(() => {
    if (session) fetchArticles();
  }, [session]);

  const handleCreate = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowSeo(false);
    setUploadError(null);
    setUploadSuccess(null);
    setView("create");
  };

  const handleEdit = (article: Article) => {
    setForm({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      coverImage: article.coverImage || "",
      readTime: String(article.readTime),
      author: article.author,
      seoTitle: article.seoTitle || "",
      seoDescription: article.seoDescription || "",
    });
    setEditId(article.id);
    setShowSeo(Boolean(article.seoTitle || article.seoDescription));
    setView("edit");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus artikel ini?")) return;
    await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    fetchArticles();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const url = view === "edit" ? `/api/admin/articles/${editId}` : "/api/admin/articles";
    const method = view === "edit" ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      fetchArticles();
      setView("list");
      setForm(emptyForm);
      setEditId(null);
    }
    setSaving(false);
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validExtensions = [".docx", ".pdf"];
    const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));

    if (!validExtensions.includes(ext)) {
      setUploadError("Format file harus DOCX atau PDF");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setUploadError("Ukuran file maksimal 4MB");
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/articles/parse", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error || "Gagal memproses dokumen");
        return;
      }

      setForm((prev) => ({
        ...prev,
        title: data.title || prev.title,
        excerpt: data.excerpt || prev.excerpt,
        content: data.content || prev.content,
        readTime: data.readTime || prev.readTime,
      }));

      setUploadSuccess(
        `"${data.fileName}" berhasil diproses. Silakan review dan edit sebelum publish.`
      );
    } catch {
      setUploadError("Terjadi kesalahan saat mengunggah dokumen");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const filteredArticles = articles.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "Semua" || a.category === filterCat;
    return matchSearch && matchCat;
  });

  if (status === "loading") return null;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* LIST VIEW */}
          {view === "list" && (
            <>
              <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <Link
                    href="/admin"
                    className="text-sm text-muted hover:text-neon transition-colors"
                  >
                    ← Admin
                  </Link>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold">
                    Blog Management
                  </h1>
                </div>
                <button
                  onClick={handleCreate}
                  className="px-4 py-2.5 bg-neon text-[#0a0a0f] font-semibold text-sm rounded-xl hover:bg-neon/90 transition-colors"
                >
                  + Tambah Artikel
                </button>
              </div>

              {/* Search & Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari artikel..."
                  className="flex-1 px-4 py-2.5 bg-surface border border-card-border rounded-xl text-sm focus:outline-none focus:border-neon"
                />
                <div className="flex gap-2 flex-wrap">
                  {["Semua", ...categories].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilterCat(cat)}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                        filterCat === cat
                          ? "bg-neon text-[#0a0a0f] border-neon font-semibold"
                          : "border-card-border text-muted hover:border-neon/50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="rounded-2xl bg-card-bg border border-card-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-surface text-xs text-muted uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3 text-left">Judul</th>
                        <th className="px-5 py-3 text-left">Kategori</th>
                        <th className="px-5 py-3 text-left">Penulis</th>
                        <th className="px-5 py-3 text-left">Tanggal</th>
                        <th className="px-5 py-3 text-left">Views</th>
                        <th className="px-5 py-3 text-left">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-card-border">
                      {filteredArticles.map((article) => (
                        <tr key={article.id} className="hover:bg-surface/50">
                          <td className="px-5 py-3">
                            <p className="text-sm font-medium line-clamp-1">{article.title}</p>
                            <p className="text-xs text-muted line-clamp-1">{article.excerpt}</p>
                          </td>
                          <td className="px-5 py-3">
                            <span className="text-xs px-2 py-1 rounded-full bg-purple/10 text-purple border border-purple/20">
                              {article.category}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-sm">{article.author}</td>
                          <td className="px-5 py-3 text-xs text-muted">
                            {new Date(article.publishedAt).toLocaleDateString("id-ID")}
                          </td>
                          <td className="px-5 py-3 text-sm">{article.views}</td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEdit(article)}
                                className="text-xs text-neon hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(article.id)}
                                className="text-xs text-red-400 hover:underline"
                              >
                                Hapus
                              </button>
                              <Link
                                href={`/blog/${article.slug}`}
                                target="_blank"
                                className="text-xs text-muted hover:text-foreground"
                              >
                                ↗
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredArticles.length === 0 && (
                  <p className="p-8 text-center text-muted text-sm">
                    {search || filterCat !== "Semua"
                      ? "Tidak ada artikel yang cocok."
                      : "Belum ada artikel. Klik \"Tambah Artikel\" untuk membuat."}
                  </p>
                )}
              </div>
            </>
          )}

          {/* CREATE / EDIT VIEW */}
          {(view === "create" || view === "edit") && (
            <>
              <div className="flex items-center gap-3 mb-8">
                <button
                  onClick={() => {
                    setView("list");
                    setForm(emptyForm);
                    setEditId(null);
                    setUploadError(null);
                    setUploadSuccess(null);
                  }}
                  className="text-sm text-muted hover:text-neon transition-colors"
                >
                  ← Kembali
                </button>
                <h1 className="text-2xl sm:text-3xl font-heading font-bold">
                  {view === "create" ? "Buat Artikel Baru" : "Edit Artikel"}
                </h1>
              </div>

              {/* Document Upload Section */}
              <div className="mb-6 p-6 rounded-xl bg-card-bg border border-card-border max-w-4xl">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <h3 className="font-heading font-bold text-sm">Upload Dokumen (Opsional)</h3>
                </div>

                <p className="text-xs text-muted mb-4">
                  Upload file <strong className="text-foreground">DOCX</strong> atau <strong className="text-foreground">PDF</strong> untuk mengisi form otomatis.
                  Format: Heading 1 = judul, paragraf pertama = ringkasan, sisanya = konten.
                </p>

                <div className="flex items-center gap-4">
                  <label
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-colors ${
                      uploading
                        ? "bg-surface border-card-border text-muted cursor-not-allowed"
                        : "border-neon/30 text-neon hover:bg-neon/10 cursor-pointer"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {uploading ? "Memproses..." : "Pilih File"}
                    <input
                      type="file"
                      accept=".docx,.pdf"
                      onChange={handleDocumentUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs text-muted">DOCX atau PDF, maks 4MB</span>
                </div>

                {uploading && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-neon">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sedang memproses dokumen...
                  </div>
                )}

                {uploadError && (
                  <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                    {uploadError}
                  </div>
                )}

                {uploadSuccess && (
                  <div className="mt-4 p-3 rounded-lg bg-neon/10 border border-neon/20 text-sm text-neon">
                    {uploadSuccess}
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
                <div className="p-6 rounded-xl bg-card-bg border border-card-border space-y-5">
                  <Input
                    label="Judul Artikel"
                    value={form.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="Masukkan judul artikel"
                    required
                  />

                  <Textarea
                    label="Ringkasan (Excerpt)"
                    value={form.excerpt}
                    onChange={(e) => updateField("excerpt", e.target.value)}
                    placeholder="Ringkasan singkat artikel untuk preview"
                    required
                    className="min-h-[80px]"
                  />

                  <Textarea
                    label="Konten (HTML)"
                    value={form.content}
                    onChange={(e) => updateField("content", e.target.value)}
                    placeholder="<h2>Subjudul</h2><p>Paragraf konten...</p>"
                    required
                    className="min-h-[300px] font-mono text-sm"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-foreground">
                        Kategori
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) => updateField("category", e.target.value)}
                        className="w-full px-4 py-3 bg-surface border border-card-border rounded-xl text-foreground focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/20 transition-colors"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Input
                      label="Cover Image URL"
                      value={form.coverImage}
                      onChange={(e) => updateField("coverImage", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Waktu Baca (menit)"
                      type="number"
                      value={form.readTime}
                      onChange={(e) => updateField("readTime", e.target.value)}
                      min="1"
                    />

                    <Input
                      label="Penulis"
                      value={form.author}
                      onChange={(e) => updateField("author", e.target.value)}
                    />
                  </div>
                </div>

                {/* SEO Settings */}
                <div className="rounded-xl bg-card-bg border border-card-border overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowSeo(!showSeo)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-surface/50 transition-colors"
                  >
                    <span className="font-heading font-bold text-sm">
                      SEO Settings
                    </span>
                    <svg
                      className={`w-4 h-4 text-muted transition-transform ${showSeo ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showSeo && (
                    <div className="px-6 pb-6 space-y-4">
                      <Input
                        label="SEO Title"
                        value={form.seoTitle}
                        onChange={(e) => updateField("seoTitle", e.target.value)}
                        placeholder="Custom title untuk search engine"
                        helperText="Kosongkan untuk pakai judul artikel"
                      />
                      <Textarea
                        label="SEO Description"
                        value={form.seoDescription}
                        onChange={(e) => updateField("seoDescription", e.target.value)}
                        placeholder="Deskripsi untuk search engine"
                        helperText="Kosongkan untuk pakai excerpt"
                        className="min-h-[80px]"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 bg-neon text-[#0a0a0f] font-semibold text-sm rounded-xl hover:bg-neon/90 transition-colors disabled:opacity-50"
                  >
                    {saving
                      ? "Menyimpan..."
                      : view === "create"
                        ? "Publikasikan"
                        : "Simpan Perubahan"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setView("list");
                      setForm(emptyForm);
                      setEditId(null);
                      setUploadError(null);
                      setUploadSuccess(null);
                    }}
                    className="px-6 py-3 text-sm text-muted border border-card-border rounded-xl hover:text-foreground hover:border-foreground/30 transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
    </>
  );
}
