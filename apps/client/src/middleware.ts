import { NextRequest, NextResponse } from "next/server";

const AUTH_PAGES = ["/login", "/sign-up"];
const PROTECTED_PAGES = ["/mypage", "/order"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLogin = req.cookies.get("refresh")?.value;

  if (AUTH_PAGES.includes(pathname) && isLogin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (PROTECTED_PAGES.some((page) => pathname.startsWith(page)) && !isLogin) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/sign-up", "/mypage/:path*", "/order/:path*"],
};
