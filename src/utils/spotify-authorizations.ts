"use server"

import { SCOPE } from "@/app/constants/spotify"
import { spotifyAccessTokenSchema, spotifyRefreshTokenSchema } from "@/app/schemas/spotify"
import { redirect } from "next/navigation"
import { z } from "zod"

// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
export async function authorize() {
  const params = {
    client_id: process.env.SPOTIFY_CLIENT_ID ?? "",
    response_type: "code",
    redirect_uri: "http://localhost:3000/api/callback",
    scope: SCOPE,
  }

  const queryParams = new URLSearchParams(params)
  const queryString = queryParams.toString()

  const response = await fetch(`https://accounts.spotify.com/authorize?${queryString}`, { method: "GET" })

  redirect(response.url)
}

// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
export async function requestAccessToken({ code }: { code: string }): Promise<z.infer<typeof spotifyAccessTokenSchema>> {
  const url = "https://accounts.spotify.com/api/token"

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
  }

  const body = await fetch(url, payload)
  const response = await body.json()

  const parsedResponse = spotifyAccessTokenSchema.parse(response)

  return parsedResponse
}

// https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
export async function refreshAccessToken({ refreshToken }: { refreshToken: string }): Promise<z.infer<typeof spotifyRefreshTokenSchema> | null> {
  const url = "https://accounts.spotify.com/api/token"

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
  }

  try {
    const body = await fetch(url, payload)

    const response = await body.json()

    const parsedResponse = spotifyRefreshTokenSchema.parse(response)

    return parsedResponse
  } catch (err) {
    console.error(err)
    return null
  }
}
