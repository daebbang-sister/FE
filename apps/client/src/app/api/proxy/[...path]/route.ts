// src/app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_ORIGIN = process.env.API_ORIGIN;

type Ctx = { params: Promise<{ path: string[] }> };

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const HEAD = handler;
export const OPTIONS = handler;

const ALLOWED_PREFIX = ["/v1/", "/oauth2/"];

function pickHeaders(req: NextRequest) {
  const h = new Headers();

  const ct = req.headers.get("content-type");
  if (ct) h.set("content-type", ct);

  const accept = req.headers.get("accept");
  if (accept) h.set("accept", accept);

  const auth = req.headers.get("authorization");
  if (auth) h.set("authorization", auth);

  const cookie = req.headers.get("cookie");
  if (cookie) h.set("cookie", cookie);

  // (선택) IP/추적용
  const xff = req.headers.get("x-forwarded-for");
  if (xff) h.set("x-forwarded-for", xff);

  return h;
}

function isAllowedPath(path: string) {
  return ALLOWED_PREFIX.some((p) => path.startsWith(p));
}

export async function handler(req: NextRequest, ctx: Ctx) {
  if (!API_ORIGIN) {
    return NextResponse.json(
      { message: "API_ORIGIN is missing" },
      { status: 500 }
    );
  }

  const { path } = await ctx.params;
  const pathname = `/${path.join("/")}`;

  if (!isAllowedPath(pathname)) {
    return NextResponse.json(
      { message: "blocked proxy path" },
      { status: 403 }
    );
  }

  const targetUrl = new URL(`${API_ORIGIN}${pathname}`);
  targetUrl.search = req.nextUrl.search;

  const method = req.method.toUpperCase();
  const hasBody = !["GET", "HEAD", "OPTIONS"].includes(method);
  const body = hasBody ? await req.arrayBuffer() : undefined;

  const upstream = await fetch(targetUrl, {
    method,
    headers: pickHeaders(req),
    body,
    redirect: "manual",
    cache: "no-store",
  });

  const location = upstream.headers.get("location");
  if (location && [301, 302, 303, 307, 308].includes(upstream.status)) {
    return NextResponse.redirect(
      location,
      upstream.status as 301 | 302 | 303 | 307 | 308
    );
  }

  const data = await upstream.arrayBuffer();

  const res = new NextResponse(data, { status: upstream.status });

  const contentType = upstream.headers.get("content-type");
  if (contentType) res.headers.set("content-type", contentType);

  const cacheControl = upstream.headers.get("cache-control");
  if (cacheControl) res.headers.set("cache-control", cacheControl);

  const setCookie = upstream.headers.get("set-cookie");
  if (setCookie) res.headers.set("set-cookie", setCookie);

  return res;
}
