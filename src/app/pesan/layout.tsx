import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pesan Layanan — Mulai Proyek Konten & SEO Anda",
  description:
    "Pesan jasa SEO, penulisan konten, atau copywriting profesional dari KelasKonten. Isi brief, pilih paket, dan mulai proyek Anda dalam hitungan menit.",
  openGraph: {
    title: "Pesan Layanan — Mulai Proyek Konten & SEO Anda | KelasKonten",
    description:
      "Pesan jasa SEO, penulisan konten, atau copywriting profesional. Proses mudah, hasil nyata.",
  },
  alternates: { canonical: "/pesan" },
};

export default function PesanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
