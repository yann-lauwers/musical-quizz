import { requestAccessToken } from "@/actions/auth";
import { ERROR_MESSAGE } from "@/constants/errors";
import { encrypt } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const code = url.searchParams.get("code");

  const accessToken = await requestAccessToken({ code: code ?? "" });

  if (!accessToken)
    return { status: "error", message: ERROR_MESSAGE.unknown_error };

  const response = NextResponse.redirect(url.origin);

  // const sessionExpiresAt = new Date(Date.now() + accessToken.expires_in * 1000);

  // Temporary
  const sessionExpiresAt = new Date(Date.now() + 1000);

  const session = await encrypt({
    spotify_access_token: accessToken.access_token,
    spotify_refresh_token: accessToken.refresh_token,
    expires_at: sessionExpiresAt,
  });

  response.cookies.set({
    name: "session",
    value: session,
    httpOnly: true,
  });

  return response;
}
