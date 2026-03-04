import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Akun Baru",
  description: "Buat akun KelasKonten untuk mulai memesan layanan SEO, penulisan konten, dan copywriting profesional.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/daftar" },
};

export default function DaftarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
