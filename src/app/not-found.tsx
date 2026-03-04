import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-8xl font-heading font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-heading font-bold mb-4">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-muted mb-8">
            Sepertinya halaman yang Anda cari sudah dipindahkan atau tidak ada.
            Tapi jangan khawatir — masih banyak konten yang bisa Anda eksplorasi!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-neon text-[#0a0a0f] font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(79,255,176,0.3)] transition-all"
            >
              Kembali ke Beranda
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 border border-card-border text-foreground rounded-xl hover:border-neon hover:text-neon transition-all"
            >
              Baca Blog Kami
            </Link>
            <Link
              href="/layanan/seo"
              className="px-6 py-3 border border-card-border text-foreground rounded-xl hover:border-neon hover:text-neon transition-all"
            >
              Lihat Layanan
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
