import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass auth in development mode for testing
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === "true";
  if (bypassAuth && (pathname.startsWith("/admin") || pathname.startsWith("/agent"))) {
    return NextResponse.next();
  }

  // Allow login page through
  if (pathname === "/login") {
    const authCookie = request.cookies.get("aerocity_auth");
    if (authCookie) {
      try {
        const data = JSON.parse(authCookie.value);
        const role = data.user?.role;
        if (role === "ADMIN") {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
        if (role === "AGENT") {
          return NextResponse.redirect(new URL("/agent", request.url));
        }
      } catch {
        // Invalid cookie, let them see login
      }
    }
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    const authCookie = request.cookies.get("aerocity_auth");
    if (!authCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      const data = JSON.parse(authCookie.value);
      if (data.user?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // Protect agent routes
  if (pathname.startsWith("/agent")) {
    const authCookie = request.cookies.get("aerocity_auth");
    if (!authCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      const data = JSON.parse(authCookie.value);
      if (data.user?.role !== "AGENT") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/agent/:path*", "/login"],
};
