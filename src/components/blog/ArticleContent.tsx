"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  readTime: number;
  views: number;
  author: string;
  publishedAt: Date;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractToc(html: string): TocItem[] {
  const regex = /<h([23])[^>]*>([^<]+)<\/h[23]>/g;
  const items: TocItem[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const id = match[2]
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-");
    items.push({ id, text: match[2], level: parseInt(match[1]) });
  }
  return items;
}

function addIdsToHeadings(html: string): string {
  return html.replace(/<h([23])([^>]*)>([^<]+)<\/h[23]>/g, (_, level, attrs, text) => {
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-");
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
  });
}

export default function ArticleContent({
  article,
  relatedArticles,
}: {
  article: Article;
  relatedArticles: Article[];
}) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const toc = useMemo(() => extractToc(article.content), [article.content]);
  const processedContent = useMemo(() => addIdsToHeadings(article.content), [article.content]);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("article-content");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(Math.min(100, Math.max(0, (scrolled / total) * 100)));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-card-bg">
        <motion.div
          className="h-full bg-gradient-to-r from-neon to-purple"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-12">
            {/* Sidebar - ToC (desktop) */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <h4 className="text-sm font-semibold text-foreground mb-4 font-heading">
                  Daftar Isi
                </h4>
                <nav className="space-y-2">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm text-muted hover:text-neon transition-colors ${
                        item.level === 3 ? "pl-4" : ""
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>

                {/* Share */}
                <div className="mt-8 pt-6 border-t border-card-border">
                  <h4 className="text-sm font-semibold text-foreground mb-3 font-heading">
                    Bagikan
                  </h4>
                  <div className="flex gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-card-bg border border-card-border text-muted hover:text-neon hover:border-neon transition-colors"
                      aria-label="Share to Twitter"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + " " + shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-card-bg border border-card-border text-muted hover:text-neon hover:border-neon transition-colors"
                      aria-label="Share to WhatsApp"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-card-bg border border-card-border text-muted hover:text-neon hover:border-neon transition-colors"
                      aria-label="Share to LinkedIn"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    </a>
                    <button
                      onClick={copyLink}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-card-bg border border-card-border text-muted hover:text-neon hover:border-neon transition-colors"
                      aria-label="Copy link"
                    >
                      {copied ? (
                        <svg className="w-4 h-4 text-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <article className="flex-1 min-w-0 max-w-3xl">
              {/* Article header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-medium text-neon bg-neon/10 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-sm text-muted">{article.readTime} min baca</span>
                  <span className="text-sm text-muted">{article.views} views</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-4">
                  {article.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon to-purple flex items-center justify-center text-xs font-bold text-background">
                      KP
                    </div>
                    <span>{article.author}</span>
                  </div>
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Article body */}
              <div
                id="article-content"
                className="prose-custom"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* CTA after article */}
              <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-neon/5 to-purple/5 border border-neon/20">
                <h3 className="text-xl font-heading font-bold mb-2">
                  Butuh bantuan dengan {article.category.toLowerCase()}?
                </h3>
                <p className="text-muted text-sm mb-4">
                  Tim KontenPro siap membantu bisnis Anda dengan strategi{" "}
                  {article.category.toLowerCase()} yang terbukti berhasil. Konsultasi
                  pertama gratis!
                </p>
                <Link
                  href="/pesan"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-neon text-[#0a0a0f] rounded-xl hover:shadow-[0_0_20px_rgba(79,255,176,0.3)] transition-all"
                >
                  Mulai Konsultasi Gratis
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Related articles */}
              {relatedArticles.length > 0 && (
                <div className="mt-16">
                  <h3 className="text-2xl font-heading font-bold mb-6">
                    Artikel Terkait
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedArticles.map((ra) => (
                      <Link
                        key={ra.id}
                        href={`/blog/${ra.slug}`}
                        className="group p-4 rounded-xl bg-card-bg border border-card-border hover:border-neon/30 transition-all"
                      >
                        <span className="text-xs text-neon font-medium">{ra.category}</span>
                        <h4 className="mt-1 text-sm font-semibold group-hover:text-neon transition-colors line-clamp-2">
                          {ra.title}
                        </h4>
                        <span className="mt-2 block text-xs text-muted">{ra.readTime} min baca</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>
      </main>
    </>
  );
}
