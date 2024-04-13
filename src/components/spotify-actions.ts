"use server"

import { redirect } from "next/navigation"

export async function auth() {
  const params = {
    client_id: process.env.SPOTIFY_CLIENT_ID ?? "",
    response_type: "code",
    redirect_uri: "http://localhost:3000/callback",
    scope: "user-read-private user-read-email user-read-currently-playing user-top-read",
  }

  const queryParams = new URLSearchParams(params)
  const queryString = queryParams.toString()

  const response = await fetch(`https://accounts.spotify.com/authorize?${queryString}`, { method: "GET" })

  redirect(response.url)
}

export async function getRefreshToken({ code }: { code: string }) {
  // const refreshToken = localStorage.getItem("refresh_token") ?? ""

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
      redirect_uri: "http://localhost:3000/callback",
    }),
  }

  const body = await fetch(url, payload)
  const response = await body.json()

  localStorage.setItem("access_token", response.body.accessToken)
  localStorage.setItem("refresh_token", response.body.refreshToken)

  redirect(response.url)
}

export async function refreshAccessToken({ code }: { code: string }) {
  const refreshToken = localStorage.getItem("refresh_token") ?? ""

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

  const body = await fetch(url, payload)
  const response = await body.json()

  localStorage.setItem("access_token", response.body.accessToken)
  localStorage.setItem("refresh_token", response.body.refreshToken)
}
