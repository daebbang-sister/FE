import { NextRequest, NextResponse } from "next/server";

const API_ORIGIN = process.env.API_ORIGIN;

type Ctx = {
  params: Promise<{ path: string[] }>;
};

const ALLOWED_PREFIX = ["/v1/", "/oauth2/"];

async function handler(req: NextRequest, { params }: Ctx) {
  try {
    if (!API_ORIGIN) {
      return NextResponse.json(
        { message: "환경 변수가 없습니다." },
        { status: 500 }
      );
    }
    const { path } = await params;

    const pathname = `/${path.join("/")}`;

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

    const authorization = req.headers.get("authorization");
    const contentType = req.headers.get("content-type");
    const cookie = req.headers.get("cookie");

    const body =
      req.method === "GET" || req.method === "HEAD"
        ? undefined
        : await req.text();

    const res = await fetch(targetUrl, {
      method: req.method,
      headers: {
        accept: "application/json",
        ...(authorization && { authorization }),
        ...(contentType && { "content-type": contentType }),
        ...(cookie && { cookie }),
      },
      body,
      cache: "no-store",
      credentials: "include",
    });

    const data = await res.json();
    const response = NextResponse.json(data, {
      status: res.status,
    });

    const setCookieHeader = res.headers.get("set-cookie");
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

    const origin = req.headers.get("origin") || "*";
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Origin", origin);

    return response;
  } catch (_error) {
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
