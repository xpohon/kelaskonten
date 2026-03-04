import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk ke Akun Anda",
  description: "Login ke dashboard KelasKonten untuk memantau progress proyek dan melihat laporan Anda.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/masuk" },
};

export default function MasukLayout({ children }: { children: React.ReactNode }) {
  return children;
}
