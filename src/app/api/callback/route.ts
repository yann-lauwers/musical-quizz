import { requestAccessToken } from "@/utils/spotify-authorizations"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const url = new URL(req.url)

  const code = url.searchParams.get("code")

  const accessToken = await requestAccessToken({ code: code ?? "" })

  const response = NextResponse.redirect(url.origin)

  response.cookies.set({
    name: "spotify_access_token",
    value: accessToken.access_token,
    httpOnly: true,
    maxAge: accessToken.expires_in,
  })

  response.cookies.set({
    name: "spotify_refresh_token",
    value: accessToken.refresh_token,
    httpOnly: true,
  })

  return response
}
