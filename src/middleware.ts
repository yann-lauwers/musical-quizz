import { NextResponse, type NextRequest } from "next/server";
import { refreshAccessToken } from "./actions/auth";
import { decrypt } from "./utils/auth";
import { cookies } from "next/headers";

const publicRoutes = ["/auth"];

// https://medium.com/@fran_wrote/fetch-with-token-and-refresh-in-next-js-60fd13c6f1b1
export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const isPublicRoute = publicRoutes.includes(pathname);

  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  const isAuth = !!(
    session?.spotify_access_token && session?.spotify_refresh_token
  );

  // Throws an error in the console if a server actions triggers the middleware
  if (!isPublicRoute && !isAuth) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (pathname === "/auth" && isAuth)
    return NextResponse.redirect(new URL("/", req.url));

  const needNewToken =
    !session?.spotify_access_token && session?.spotify_refresh_token;
  if (needNewToken) {
    const newAccessToken = await refreshAccessToken({
      refreshToken: session?.spotify_refresh_token ?? "",
    });

    const response = NextResponse.next();

    if (newAccessToken) {
      response.cookies.set({
        name: "spotify_access_token",
        value: newAccessToken.access_token,
        httpOnly: true,
        maxAge: newAccessToken.expires_in,
      });
    }

    return response;
  }

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
