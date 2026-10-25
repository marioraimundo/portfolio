import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALE_PREFIX = /^\/(en|pt)(\/|$)/;

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (LOCALE_PREFIX.test(pathname)) {
    return NextResponse.next();
  }

  const target = pathname === "/" ? "/en" : `/en${pathname}`;

  return NextResponse.redirect(new URL(`${target}${search}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
