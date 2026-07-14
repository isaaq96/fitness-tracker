import { NextResponse, type NextRequest } from "next/server";

import { env } from "@/lib/env";
import { updateSession } from "@/lib/supabase/middleware";

const protectedPrefixes = ["/today", "/workouts", "/history", "/settings"];

export async function proxy(request: NextRequest) {
  if (!env.hasSupabase) {
    return NextResponse.next();
  }

  const { response, user } = await updateSession(request);
  const pathname = request.nextUrl.pathname;
  const isProtected = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!user && isProtected) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  if (user && pathname === "/login") {
    const todayUrl = request.nextUrl.clone();
    todayUrl.pathname = "/today";
    return NextResponse.redirect(todayUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
