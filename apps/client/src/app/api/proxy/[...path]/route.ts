import { NextRequest, NextResponse } from "next/server";

const API_ORIGIN = process.env.API_ORIGIN;

type Ctx = { params: { path: string[] } | Promise<{ path: string[] }> };

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

  const xff = req.headers.get("x-forwarded-for");
  if (xff) h.set("x-forwarded-for", xff);

  return h;
}

function isAllowedPath(path: string) {
  return ALLOWED_PREFIX.some((p) => path.startsWith(p));
}

export async function handler(req: NextRequest, ctx: Ctx) {
  if (!API_ORIGIN) {
    console.error("[proxy] API_ORIGIN is missing");
    return NextResponse.json(
      { message: "API_ORIGIN is missing" },
      { status: 500 }
    );
  }

  const { path } = await Promise.resolve(ctx.params);
  const pathname = `/${path.join("/")}`;

  if (!isAllowedPath(pathname)) {
    console.error("[proxy] blocked proxy path:", pathname);
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

  let upstream: Response;

  try {
    upstream = await fetch(targetUrl, {
      method,
      headers: pickHeaders(req),
      body,
      redirect: "manual",
      cache: "no-store",
    });
  } catch (e) {
    console.error("[proxy] upstream fetch failed:", e);
    return NextResponse.json(
      { message: "proxy upstream failed" },
      { status: 502 }
    );
  }

  console.warn(
    `[proxy] ${method} ${req.nextUrl.pathname}${req.nextUrl.search} -> ${targetUrl} (${upstream.status})`
  );

  const location = upstream.headers.get("location");
  if (location && [301, 302, 303, 307, 308].includes(upstream.status)) {
    let nextLocation = location;

    try {
      const loc = new URL(location);
      const api = new URL(API_ORIGIN);
      if (loc.origin === api.origin) {
        nextLocation = `/api/proxy${loc.pathname}${loc.search}`;
      }
    } catch {
      nextLocation = location;
    }

    return NextResponse.redirect(
      nextLocation,
      upstream.status as 301 | 302 | 303 | 307 | 308
    );
  }

  const data = await upstream.arrayBuffer();
  const res = new NextResponse(data, { status: upstream.status });

  upstream.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      res.headers.append("set-cookie", value);
    } else {
      res.headers.set(key, value);
    }
  });

  return res;
}
