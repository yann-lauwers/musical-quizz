import { NextResponse, type NextRequest } from "next/server"
import { refreshAccessToken } from "./components/spotify-actions"

// https://medium.com/@fran_wrote/fetch-with-token-and-refresh-in-next-js-60fd13c6f1b1
export async function middleware(req: NextRequest) {
  const pathname = new URL(req.url).pathname

  const accessToken = req.cookies.get("spotify_access_token")
  const refreshToken = req.cookies.get("spotify_refresh_token")

  if (pathname !== "/" && !accessToken && !refreshToken) return NextResponse.redirect(new URL("/", req.url))

  if (!accessToken && refreshToken) {
    const newAccessToken = await refreshAccessToken({ refreshToken: refreshToken?.value ?? "" })

    const response = NextResponse.next()

    response.cookies.set({
      name: "spotify_access_token",
      value: newAccessToken.access_token,
      httpOnly: true,
      maxAge: newAccessToken.expires_in,
    })

    return response
  }

  // Continue to next middleware
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}