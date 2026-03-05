"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface PackageData {
  id: string;
  serviceType: string;
  name: string;
  price: number;
  description: string;
}

interface ServiceGroup {
  type: string;
  label: string;
  packages: PackageData[];
}

const SERVICE_LABELS: Record<string, string> = {
  SEO: "SEO & Backlink Building",
  CONTENT: "Penulisan Artikel & Konten",
  COPYWRITING: "Copywriting & Konten Sosmed",
};

export default function OrderPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<ServiceGroup[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [brief, setBrief] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch packages dari database
  useEffect(() => {
    fetch("/api/packages")
      .then((r) => r.json())
      .then((data) => {
        const packages: PackageData[] = data.packages || [];
        // Group by serviceType
        const grouped: Record<string, PackageData[]> = {};
        for (const pkg of packages) {
          if (!grouped[pkg.serviceType]) grouped[pkg.serviceType] = [];
          grouped[pkg.serviceType].push(pkg);
        }
        const serviceGroups: ServiceGroup[] = Object.entries(grouped).map(
          ([type, pkgs]) => ({
            type,
            label: SERVICE_LABELS[type] || type,
            packages: pkgs,
          })
        );
        setServices(serviceGroups);
      })
      .catch(() => setError("Gagal memuat paket layanan"))
      .finally(() => setLoadingPackages(false));
  }, []);

  const handleSubmit = async () => {
    if (!session) {
      router.push("/masuk");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType: selectedService,
          packageName: selectedPackage?.name,
          brief,
          targetAudience,
          deadline: deadline || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Create payment
      const payRes = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: data.order.id }),
      });
      const payData = await payRes.json();
      if (!payRes.ok) throw new Error(payData.error);

      router.push(`/pembayaran/${data.order.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setLoading(false);
    }
  };

  const currentService = services.find((s) => s.type === selectedService);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-2">
            Mulai Proyek Anda
          </h1>
          <p className="text-muted mb-8">
            Pilih layanan, isi brief, dan kami langsung mulai kerjakan.
          </p>

          {/* Progress steps */}
          <div className="flex items-center gap-2 mb-10">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= s
                      ? "bg-neon text-[#0a0a0f]"
                      : "bg-card-bg border border-card-border text-muted"
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div className={`w-12 sm:w-20 h-px ${step > s ? "bg-neon" : "bg-card-border"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-8 flex-col lg:flex-row">
            {/* Main form */}
            <div className="flex-1">
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Step 1: Choose service & package */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-heading font-bold">Pilih Layanan & Paket</h2>

                  {loadingPackages ? (
                    <div className="text-center py-12 text-muted">
                      <div className="inline-block w-6 h-6 border-2 border-neon/30 border-t-neon rounded-full animate-spin mb-3" />
                      <p className="text-sm">Memuat paket layanan...</p>
                    </div>
                  ) : services.length === 0 ? (
                    <div className="text-center py-12 text-muted">
                      <p className="text-sm">Belum ada paket layanan tersedia.</p>
                    </div>
                  ) : (
                    services.map((service) => (
                      <div key={service.type}>
                        <button
                          onClick={() => {
                            setSelectedService(service.type);
                            setSelectedPackage(null);
                          }}
                          className={`w-full text-left p-4 rounded-xl border transition-all ${
                            selectedService === service.type
                              ? "border-neon bg-neon/5"
                              : "border-card-border bg-card-bg hover:border-neon/30"
                          }`}
                        >
                          <span className="font-semibold">{service.label}</span>
                        </button>
                        {selectedService === service.type && (
                          <div className="mt-3 grid sm:grid-cols-3 gap-3 pl-4">
                            {service.packages.map((pkg) => (
                              <button
                                key={pkg.id}
                                onClick={() => setSelectedPackage(pkg)}
                                className={`text-left p-4 rounded-xl border transition-all ${
                                  selectedPackage?.id === pkg.id
                                    ? "border-neon bg-neon/5"
                                    : "border-card-border bg-surface hover:border-neon/30"
                                }`}
                              >
                                <span className="block font-semibold text-sm">{pkg.name}</span>
                                <span className="block text-neon font-bold mt-1">
                                  Rp {pkg.price.toLocaleString("id-ID")}
                                </span>
                                <span className="block text-xs text-muted mt-1">{pkg.description}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                  <button
                    onClick={() => selectedPackage && setStep(2)}
                    disabled={!selectedPackage}
                    className="px-6 py-3 bg-neon text-[#0a0a0f] font-semibold rounded-xl disabled:opacity-50 hover:shadow-[0_0_20px_rgba(79,255,176,0.3)] transition-all"
                  >
                    Lanjutkan
                  </button>
                </div>
              )}

              {/* Step 2: Brief */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-bold">Detail Kebutuhan</h2>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Brief / Deskripsi Kebutuhan</label>
                    <textarea
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 bg-surface border border-card-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-neon transition-colors resize-y"
                      placeholder="Jelaskan kebutuhan Anda secara detail..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Target Audience</label>
                    <input
                      type="text"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      className="w-full px-4 py-3 bg-surface border border-card-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-neon transition-colors"
                      placeholder="Contoh: Pemilik UMKM di Indonesia, usia 25-45 tahun"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Deadline (opsional)</label>
                    <input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full px-4 py-3 bg-surface border border-card-border rounded-xl text-foreground focus:outline-none focus:border-neon transition-colors"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="px-6 py-3 border border-card-border rounded-xl text-muted hover:text-foreground transition-colors">
                      Kembali
                    </button>
                    <button onClick={() => setStep(3)} className="px-6 py-3 bg-neon text-[#0a0a0f] font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(79,255,176,0.3)] transition-all">
                      Lanjutkan
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Upload reference (skip) */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-bold">File Referensi (Opsional)</h2>
                  <div className="p-8 border-2 border-dashed border-card-border rounded-xl text-center">
                    <p className="text-muted text-sm">
                      Upload file referensi (maks 10MB). Format: PDF, DOC, JPG, PNG
                    </p>
                    <p className="text-xs text-muted mt-2">
                      Fitur upload tersedia setelah pembayaran — Anda bisa kirim via dashboard.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="px-6 py-3 border border-card-border rounded-xl text-muted hover:text-foreground transition-colors">
                      Kembali
                    </button>
                    <button onClick={() => setStep(4)} className="px-6 py-3 bg-neon text-[#0a0a0f] font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(79,255,176,0.3)] transition-all">
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-bold">Review Order</h2>
                  <div className="p-6 rounded-xl bg-card-bg border border-card-border space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Layanan</span>
                      <span className="font-medium">{currentService?.label}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Paket</span>
                      <span className="font-medium">{selectedPackage?.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Detail</span>
                      <span className="font-medium text-right max-w-[200px]">{selectedPackage?.description}</span>
                    </div>
                    {brief && (
                      <div className="pt-3 border-t border-card-border">
                        <span className="text-sm text-muted block mb-1">Brief:</span>
                        <p className="text-sm">{brief}</p>
                      </div>
                    )}
                    <div className="pt-3 border-t border-card-border flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-xl font-bold text-neon">
                        Rp {selectedPackage?.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  {!session && (
                    <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm">
                      Anda harus <Link href="/masuk" className="underline font-medium">masuk</Link> terlebih dahulu untuk melanjutkan.
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setStep(3)} className="px-6 py-3 border border-card-border rounded-xl text-muted hover:text-foreground transition-colors">
                      Kembali
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="px-6 py-3 bg-neon text-[#0a0a0f] font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(79,255,176,0.3)] transition-all disabled:opacity-50"
                    >
                      {loading ? "Memproses..." : session ? "Lanjut ke Pembayaran" : "Masuk & Bayar"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar summary (desktop) */}
            {selectedPackage && (
              <div className="lg:w-80 shrink-0">
                <div className="sticky top-24 p-6 rounded-2xl bg-card-bg border border-card-border">
                  <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
                    Ringkasan Order
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Layanan</span>
                      <span>{currentService?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Paket</span>
                      <span>{selectedPackage.name}</span>
                    </div>
                    <div className="pt-3 border-t border-card-border flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-lg font-bold text-neon">
                        Rp {selectedPackage.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
