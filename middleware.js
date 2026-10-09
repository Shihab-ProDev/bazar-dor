import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Optimistic gate (cookie check). Real session validation also happens
// server-side inside the product page.
export function middleware(req) {
  if (!getSessionCookie(req)) {
    const url = new URL("/signin", req.url);
    url.searchParams.set("reason", "login");
    url.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/product/:path*", "/profile/:path*"] };
