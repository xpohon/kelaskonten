"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Beranda" },
  {
    href: "#layanan",
    label: "Layanan",
    children: [
      { href: "/layanan/seo", label: "SEO & Backlink" },
      { href: "/layanan/penulisan-konten", label: "Penulisan Konten" },
      { href: "/layanan/copywriting", label: "Copywriting & Sosmed" },
    ],
  },
  { href: "/portofolio", label: "Portofolio" },
  { href: "/blog", label: "Blog" },
  { href: "/tentang", label: "Tentang" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-card-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-heading font-bold">
              <span className="text-foreground">Konten</span>
              <span className="text-neon">Pro</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() =>
                  link.children && setActiveDropdown(link.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.children ? link.children[0].href : link.href}
                  className="px-4 py-2 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover:bg-card-bg"
                >
                  {link.label}
                  {link.children && (
                    <svg
                      className="inline-block ml-1 w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 py-2 w-56 bg-card-bg border border-card-border rounded-xl shadow-2xl"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-muted hover:text-neon hover:bg-surface transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/masuk"
              className="px-4 py-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/pesan"
              className="px-5 py-2.5 text-sm font-semibold bg-neon text-[#0a0a0f] rounded-xl hover:shadow-[0_0_20px_rgba(79,255,176,0.3)] transition-all"
            >
              Mulai Proyek
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card-bg border-t border-card-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {link.children ? (
                    <>
                      <span className="block px-4 py-2 text-xs uppercase tracking-wider text-muted">
                        {link.label}
                      </span>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="block px-6 py-2.5 text-sm text-foreground hover:text-neon transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block px-4 py-2.5 text-sm text-foreground hover:text-neon transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-card-border space-y-2">
                <Link
                  href="/masuk"
                  onClick={() => setIsMobileOpen(false)}
                  className="block w-full text-center px-4 py-2.5 text-sm text-foreground border border-card-border rounded-xl hover:border-neon transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/pesan"
                  onClick={() => setIsMobileOpen(false)}
                  className="block w-full text-center px-4 py-2.5 text-sm font-semibold bg-neon text-[#0a0a0f] rounded-xl"
                >
                  Mulai Proyek
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
