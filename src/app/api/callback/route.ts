import { NextRequest, NextResponse } from "next/server";

import { requestAccessToken } from "@/actions/auth";
import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { ERROR_MESSAGE } from "@/constants/errors";
import { encrypt } from "@/utils/auth";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const code = url.searchParams.get("code");

  if (!code)
    return NextResponse.json({
      status: "error",
      message: ERROR_MESSAGE.spotify.missingCodeForAccessToken,
    });

  const accessToken = await requestAccessToken({ code: code ?? "" });

  if (!accessToken)
    return NextResponse.json({
      status: "error",
      message: ERROR_MESSAGE.spotify.accessTokenRequestFailed,
    });

  const response = NextResponse.redirect(url.origin);

  const sessionExpiresAt = new Date(Date.now() + accessToken.expires_in * 1000);

  const session = await encrypt({
    spotify_access_token: accessToken.access_token,
    spotify_refresh_token: accessToken.refresh_token,
    expires_at: sessionExpiresAt,
  });

  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: session,
    httpOnly: true,
  });

  return response;
}
