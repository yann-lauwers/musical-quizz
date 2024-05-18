import { requestAccessToken } from "@/actions/auth";
import { encrypt } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const code = url.searchParams.get("code");

  const accessToken = await requestAccessToken({ code: code ?? "" });

  const response = NextResponse.redirect(url.origin);

  const expiresAt = new Date(Date.now() + accessToken.expires_in * 1000);

  const session = await encrypt({
    spotify_access_token: accessToken.access_token,
    spotify_refresh_token: accessToken.refresh_token,
    expires_at: expiresAt,
  });

  response.cookies.set({
    name: "session",
    value: session,
    httpOnly: true,
    expires: expiresAt,
  });

  return response;
}
