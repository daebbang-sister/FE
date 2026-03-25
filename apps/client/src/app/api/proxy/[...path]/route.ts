import { NextRequest, NextResponse } from "next/server";

function getApiOrigin() {
  const origin = process.env.API_ORIGIN;

  if (!origin) {
    throw new Error("API_ORIGIN 환경 변수가 설정되지 않았습니다.");
  }

  return origin;
}

type Ctx = {
  params: Promise<{ path: string[] }>;
};

const ALLOWED_PREFIX = ["/v1/", "/oauth2/"];

const hopByHopHeaders = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

async function handler(req: NextRequest, { params }: Ctx) {
  try {
    const API_ORIGIN = getApiOrigin();

    const { path } = await params;
    const pathname = `/${path.join("/")}`;

    if (!API_ORIGIN) {
      return NextResponse.json(
        { message: "환경 변수가 없습니다." },
        { status: 500 }
      );
    }

    const isAllowed = ALLOWED_PREFIX.some((prefix) =>
      pathname.startsWith(prefix)
    );

    if (!isAllowed) {
      return NextResponse.json(
        { message: "허용되지 않는 API 경로입니다." },
        { status: 403 }
      );
    }

    const targetUrl = new URL(pathname, API_ORIGIN);
    targetUrl.search = req.nextUrl.search;

    const hasBody = !["GET", "HEAD", "OPTIONS"].includes(req.method);
    const body = hasBody ? await req.arrayBuffer() : undefined;

    const headers = new Headers(req.headers);

    const upstream = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      cache: "no-store",
      redirect: "manual",
    });

    if (upstream.status >= 300 && upstream.status < 400) {
      const location = upstream.headers.get("location");

      if (location) {
        if (location.startsWith("http")) {
          return NextResponse.redirect(location, upstream.status);
        }

        const redirectUrl = new URL(location, API_ORIGIN);

        return NextResponse.redirect(
          new URL(
            `/api/proxy${redirectUrl.pathname}${redirectUrl.search}`,
            req.url
          ),
          upstream.status
        );
      }
    }

    const response = new NextResponse(upstream.body, {
      status: upstream.status,
    });

    upstream.headers.forEach((value, key) => {
      if (!hopByHopHeaders.has(key.toLowerCase()) && key !== "set-cookie") {
        response.headers.set(key, value);
      }
    });

    const setCookieHeader = upstream.headers.get("set-cookie");

    if (setCookieHeader) {
      if (process.env.NODE_ENV === "development") {
        const cleanCookie = setCookieHeader
          .replace(/Domain=[^;]+;?/gi, "")
          .replace(/Secure;?/gi, "");

        response.headers.set("set-cookie", cleanCookie);
      } else {
        response.headers.set("set-cookie", setCookieHeader);
      }
    }

    return response;
  } catch (error) {
    console.error("Proxy Error:", error);

    return NextResponse.json(
      {
        message: "프록시 요청 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const HEAD = handler;
export const OPTIONS = handler;
