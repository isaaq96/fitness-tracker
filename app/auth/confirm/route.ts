import { NextResponse, type NextRequest } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const supportedEmailOtpTypes = [
  "email",
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
] as const;

type SupportedEmailOtpType = (typeof supportedEmailOtpTypes)[number];

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = parseEmailOtpType(requestUrl.searchParams.get("type"));
  const next = requestUrl.searchParams.get("next") ?? "/today";
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.redirect(new URL("/login?error=missing-env", request.url));
  }

  let errorMessage: string | null = null;

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    errorMessage = error?.message ?? null;
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    });
    errorMessage = error?.message ?? null;
  } else {
    errorMessage = "invalid-or-expired-link";
  }

  if (errorMessage) {
    const fallbackMode = next === "/reset-password" ? "recover" : "signin";
    const errorCode =
      errorMessage === "invalid-or-expired-link"
        ? errorMessage
        : encodeURIComponent(errorMessage);

    return NextResponse.redirect(
      new URL(`/login?mode=${fallbackMode}&error=${errorCode}`, request.url),
    );
  }

  return NextResponse.redirect(new URL(next, request.url));
}

function parseEmailOtpType(value: string | null): SupportedEmailOtpType | null {
  if (!value) {
    return null;
  }

  return supportedEmailOtpTypes.includes(value as SupportedEmailOtpType)
    ? (value as SupportedEmailOtpType)
    : null;
}
