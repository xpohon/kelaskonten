import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limiter for login attempts
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

// Cleanup every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of loginAttempts.entries()) {
    if (now > entry.resetAt) loginAttempts.delete(key);
  }
}, 300_000);

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/api/auth/callback/credentials" &&
    request.method === "POST"
  ) {
    const ip = request.headers.get("x-forwarded-for") || request.ip || "unknown";
    const key = `login:${ip}`;
    const now = Date.now();
    const entry = loginAttempts.get(key);

    if (entry && now < entry.resetAt && entry.count >= 10) {
      return NextResponse.json(
        { error: "Terlalu banyak percobaan login. Coba lagi dalam 15 menit." },
        { status: 429 }
      );
    }

    if (!entry || now >= entry.resetAt) {
      loginAttempts.set(key, { count: 1, resetAt: now + 900_000 });
    } else {
      entry.count++;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/:path*"],
};
