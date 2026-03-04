import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi KelasKonten menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.",
  alternates: { canonical: "/kebijakan-privasi" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Beranda", item: "https://kelaskonten.id" },
    { "@type": "ListItem", position: 2, name: "Kebijakan Privasi", item: "https://kelaskonten.id/kebijakan-privasi" },
  ],
};

export default function KebijakanPrivasiPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-8">
            Kebijakan Privasi
          </h1>
          <p className="text-sm text-muted mb-12">
            Terakhir diperbarui: 1 Maret 2025
          </p>

          <div className="prose-custom space-y-8">
            <section>
              <h2>1. Informasi yang Kami Kumpulkan</h2>
              <p>
                Saat Anda menggunakan layanan KelasKonten, kami dapat mengumpulkan
                informasi berikut:
              </p>
              <ul>
                <li>
                  <strong>Informasi Pribadi:</strong> Nama lengkap, alamat email,
                  nomor telepon, dan nama perusahaan yang Anda berikan saat mendaftar
                  atau memesan layanan.
                </li>
                <li>
                  <strong>Data Penggunaan:</strong> Informasi tentang bagaimana Anda
                  mengakses dan menggunakan website kami, termasuk alamat IP, jenis
                  browser, halaman yang dikunjungi, dan waktu akses.
                </li>
                <li>
                  <strong>Data Transaksi:</strong> Detail pesanan, riwayat
                  pembayaran, dan komunikasi terkait layanan.
                </li>
              </ul>
            </section>

            <section>
              <h2>2. Penggunaan Informasi</h2>
              <p>Informasi yang kami kumpulkan digunakan untuk:</p>
              <ul>
                <li>Memproses dan mengelola pesanan layanan Anda</li>
                <li>Berkomunikasi mengenai status proyek dan layanan</li>
                <li>Meningkatkan kualitas website dan layanan kami</li>
                <li>Mengirimkan informasi dan pembaruan terkait layanan (dengan persetujuan Anda)</li>
                <li>Memenuhi kewajiban hukum yang berlaku</li>
              </ul>
            </section>

            <section>
              <h2>3. Perlindungan Data</h2>
              <p>
                Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang
                sesuai untuk melindungi data pribadi Anda dari akses tidak sah,
                pengubahan, pengungkapan, atau penghancuran. Ini termasuk enkripsi
                data, kontrol akses, dan audit keamanan berkala.
              </p>
            </section>

            <section>
              <h2>4. Berbagi Data dengan Pihak Ketiga</h2>
              <p>
                Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak
                ketiga. Data hanya dapat dibagikan kepada:
              </p>
              <ul>
                <li>Penyedia layanan pembayaran (Midtrans) untuk memproses transaksi</li>
                <li>Penyedia layanan hosting dan infrastruktur</li>
                <li>Pihak berwenang jika diwajibkan oleh hukum</li>
              </ul>
            </section>

            <section>
              <h2>5. Cookie</h2>
              <p>
                Website kami menggunakan cookie untuk meningkatkan pengalaman
                pengguna. Cookie digunakan untuk menyimpan preferensi sesi, autentikasi,
                dan analitik penggunaan. Anda dapat mengatur pengaturan cookie melalui
                browser Anda.
              </p>
            </section>

            <section>
              <h2>6. Hak Anda</h2>
              <p>Anda memiliki hak untuk:</p>
              <ul>
                <li>Mengakses data pribadi yang kami simpan tentang Anda</li>
                <li>Meminta koreksi data yang tidak akurat</li>
                <li>Meminta penghapusan data pribadi Anda</li>
                <li>Menarik persetujuan penggunaan data kapan saja</li>
              </ul>
            </section>

            <section>
              <h2>7. Perubahan Kebijakan</h2>
              <p>
                Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Setiap
                perubahan akan dipublikasikan di halaman ini dengan tanggal pembaruan
                terakhir. Kami menyarankan Anda untuk meninjau halaman ini secara berkala.
              </p>
            </section>

            <section>
              <h2>8. Hubungi Kami</h2>
              <p>
                Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan
                hubungi kami melalui email di{" "}
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
