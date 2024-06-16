import { isBefore } from "date-fns";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { refreshAccessToken } from "@/actions/auth";
import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { decrypt, encrypt } from "@/utils/auth";

const PUBLIC_ROUTES = ["/auth"];

// https://medium.com/@fran_wrote/fetch-with-token-and-refresh-in-next-js-60fd13c6f1b1
export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const cookie = cookies().get(AUTH_COOKIE_NAME)?.value;
  const session = await decrypt(cookie);

  const hasSession = !!session;

  const isSessionValid = hasSession && isBefore(new Date(), session.expires_at);

  // If there is a session but it has expired, we try to refresh the session
  if (hasSession && !isSessionValid) {
    const newAccessToken = await refreshAccessToken({
      refreshToken: session.spotify_refresh_token,
    });

    if (!newAccessToken) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    const response = NextResponse.next();

    const newSessionExpiresAt = new Date(
      Date.now() + newAccessToken.expires_in * 1000,
    );

    const newSession = await encrypt({
      spotify_access_token: newAccessToken.access_token,
      spotify_refresh_token: session?.spotify_refresh_token,
      expires_at: newSessionExpiresAt,
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: newSession,
      httpOnly: true,
    });

    return response;
  }

  // If on a private route and no session or session expired, redirect to auth
  if (!isPublicRoute && (!hasSession || !isSessionValid))
    return NextResponse.redirect(new URL("/auth", req.url));

  // If on the auth route and session is valid, redirect to home
  if (pathname === "/auth" && isSessionValid)
    return NextResponse.redirect(new URL("/", req.url));

  // Continue to next middleware
  return NextResponse.next();
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
};
