import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan ketentuan penggunaan layanan KelasKonten. Pelajari hak dan kewajiban Anda sebagai pengguna layanan kami.",
  alternates: { canonical: "/syarat-ketentuan" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Beranda", item: "https://kelaskonten.id" },
    { "@type": "ListItem", position: 2, name: "Syarat & Ketentuan", item: "https://kelaskonten.id/syarat-ketentuan" },
  ],
};

export default function SyaratKetentuanPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-8">
            Syarat & Ketentuan
          </h1>
          <p className="text-sm text-muted mb-12">
            Terakhir diperbarui: 1 Maret 2025
          </p>

          <div className="prose-custom space-y-8">
            <section>
              <h2>1. Ketentuan Umum</h2>
              <p>
                Dengan menggunakan layanan KelasKonten (kelaskonten.id), Anda
                menyetujui dan terikat oleh syarat dan ketentuan ini. Jika Anda tidak
                menyetujui ketentuan ini, mohon untuk tidak menggunakan layanan kami.
              </p>
            </section>

            <section>
              <h2>2. Layanan Kami</h2>
              <p>KelasKonten menyediakan layanan profesional meliputi:</p>
              <ul>
                <li>Jasa SEO dan backlink building</li>
                <li>Penulisan artikel dan konten SEO</li>
                <li>Copywriting dan konten sosial media</li>
              </ul>
              <p>
                Detail layanan, termasuk paket harga dan cakupan pekerjaan,
                tersedia di halaman layanan masing-masing dan dapat berubah
                sewaktu-waktu.
              </p>
            </section>

            <section>
              <h2>3. Proses Pemesanan</h2>
              <p>
                Pemesanan dilakukan melalui formulir order di website kami. Setelah
                pemesanan dikonfirmasi dan pembayaran diterima, tim kami akan memulai
                pengerjaan sesuai dengan brief yang disepakati.
              </p>
            </section>

            <section>
              <h2>4. Pembayaran</h2>
              <ul>
                <li>Pembayaran dilakukan di muka sebelum pengerjaan dimulai</li>
                <li>Metode pembayaran yang tersedia melalui payment gateway Midtrans</li>
                <li>Harga yang tertera sudah termasuk pajak yang berlaku</li>
                <li>Invoice akan dikirimkan melalui email setelah pembayaran berhasil</li>
              </ul>
            </section>

            <section>
              <h2>5. Revisi dan Hasil Kerja</h2>
              <ul>
                <li>Setiap paket layanan memiliki jumlah revisi yang telah ditentukan</li>
                <li>Permintaan revisi harus diajukan dalam waktu 7 hari setelah penyerahan hasil</li>
                <li>Revisi di luar paket dapat dikenakan biaya tambahan</li>
                <li>Hasil kerja menjadi milik klien setelah pembayaran lunas</li>
              </ul>
            </section>

            <section>
              <h2>6. Hak Kekayaan Intelektual</h2>
              <p>
                Setelah pembayaran penuh diterima, hak cipta atas konten yang dibuat
                berpindah sepenuhnya kepada klien. KelasKonten berhak menampilkan
                hasil kerja dalam portofolio dengan persetujuan klien.
              </p>
            </section>

            <section>
              <h2>7. Kebijakan Pembatalan</h2>
              <ul>
                <li>Pembatalan sebelum pengerjaan dimulai: refund 100%</li>
                <li>Pembatalan saat pengerjaan berlangsung: refund proporsional sesuai progress</li>
                <li>Pembatalan setelah penyerahan hasil: tidak ada refund</li>
              </ul>
            </section>

            <section>
              <h2>8. Batasan Tanggung Jawab</h2>
              <p>
                KelasKonten tidak menjamin hasil peringkat tertentu di mesin pencari
                karena banyak faktor eksternal yang mempengaruhi. Kami berkomitmen
                untuk memberikan layanan terbaik sesuai standar industri dan best
                practice yang berlaku.
              </p>
            </section>

            <section>
              <h2>9. Penyelesaian Sengketa</h2>
              <p>
                Segala sengketa yang timbul dari penggunaan layanan ini akan
                diselesaikan secara musyawarah. Jika tidak tercapai kesepakatan,
                penyelesaian akan dilakukan sesuai hukum yang berlaku di Republik
                Indonesia.
              </p>
            </section>

            <section>
              <h2>10. Hubungi Kami</h2>
              <p>
                Pertanyaan mengenai syarat dan ketentuan ini dapat diajukan melalui
                email di{" "}
                <a href="mailto:admin@kelaskonten.id">admin@kelaskonten.id</a> atau
                melalui WhatsApp di{" "}
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                  +62-812-3456-7890
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
