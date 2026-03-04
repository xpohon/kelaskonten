import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import SessionProvider from "@/components/providers/SessionProvider";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Jasa SEO & Penulisan Konten Profesional Indonesia | KontenPro",
    template: "%s | KontenPro",
  },
  description:
    "Tingkatkan traffic organik dengan artikel SEO berkualitas tinggi. 300+ klien puas, rata-rata top 10 Google dalam 90 hari. Konsultasi gratis!",
  keywords: [
    "jasa penulisan konten indonesia",
    "jasa SEO terpercaya",
    "content writer indonesia",
    "jasa copywriter",
    "penulisan artikel SEO",
    "optimasi mesin pencari",
    "konten sosial media",
  ],
  authors: [{ name: "KontenPro" }],
  creator: "KontenPro",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "KontenPro",
    title: "Jasa SEO & Penulisan Konten Profesional Indonesia | KontenPro",
    description:
      "Tingkatkan traffic organik dengan artikel SEO berkualitas tinggi. 300+ klien puas, rata-rata top 10 Google dalam 90 hari.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KontenPro - Jasa SEO & Penulisan Konten Profesional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasa SEO & Penulisan Konten Profesional Indonesia | KontenPro",
    description:
      "Tingkatkan traffic organik dengan artikel SEO berkualitas tinggi. 300+ klien puas, rata-rata top 10 Google dalam 90 hari.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
