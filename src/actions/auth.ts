"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { SCOPE } from "@/constants/spotify";
import {
  spotifyAccessTokenSchema,
  spotifyRefreshTokenSchema,
} from "@/schemas/spotify";
import { decrypt, deleteSession, getSession } from "@/utils/auth";

// https://nextjs.org/docs/app/building-your-application/authentication#authorization

const SessionSchema = z.object({
  isAuth: z.boolean(),
  spotifyAccessToken: z.string().nullable(),
  spotifyRefreshToken: z.string().nullable(),
});

type Session = z.infer<typeof SessionSchema>;

export const verifySession = async (): Promise<Session> => {
  const sessionToken = getSession();
  const session = await decrypt(sessionToken);

  if (!session?.spotify_access_token || !session?.spotify_refresh_token) {
    return {
      isAuth: false,
      spotifyAccessToken: null,
      spotifyRefreshToken: null,
    };
    // redirect("/auth");
  }

  return {
    isAuth: true,
    spotifyAccessToken: session.spotify_access_token,
    spotifyRefreshToken: session.spotify_refresh_token,
  };
};

const signOut = async () => {
  deleteSession();
  redirect("/auth");
};

// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
const authorize = async () => {
  const params = {
    client_id: process.env.SPOTIFY_CLIENT_ID ?? "",
    response_type: "code",
    redirect_uri: "http://localhost:3000/api/callback",
    scope: SCOPE,
  };

  const queryParams = new URLSearchParams(params);
  const queryString = queryParams.toString();

  const response = await fetch(
    `https://accounts.spotify.com/authorize?${queryString}`,
    { method: "GET" },
  );

  redirect(response.url);
};

// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
const requestAccessToken = async ({
  code,
}: {
  code: string;
}): Promise<z.infer<typeof spotifyAccessTokenSchema> | null> => {
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://localhost:3000/api/callback",
    }),
  };
  try {
    const body = await fetch(url, payload);
    const response = await body.json();

    const parsedResponse = spotifyAccessTokenSchema.parse(response);

    return parsedResponse;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
const refreshAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<z.infer<typeof spotifyRefreshTokenSchema> | null> => {
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  };

  try {
    const body = await fetch(url, payload);

    const response = await body.json();

    const parsedResponse = spotifyRefreshTokenSchema.parse(response);

    return parsedResponse;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export { signOut, authorize, requestAccessToken, refreshAccessToken };
