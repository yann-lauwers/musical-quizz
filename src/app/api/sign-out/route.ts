import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const response = NextResponse.redirect(new URL("/auth", req.url))

  // cookies().delete("spotify_access_token")
  // cookies().delete("spotify_refresh_token")
  response.cookies.delete("spotify_refresh_token")
  response.cookies.delete("spotify_access_token")

  return response
}
