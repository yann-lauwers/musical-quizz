import { SPOTIFY_API_ROOT_URL } from "@/app/constants/spotify"
import { availableDevicesSchema, currentUserProfileSchema, playerStateSchema } from "@/app/schemas/spotify"
import { z } from "zod"

export const getCurrentUserProfile = async (accessToken: string): Promise<z.infer<typeof currentUserProfileSchema> | null> => {
  const headers = {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  try {
    // TODO: Check if I can replace by
    // const profile = await fetch(API_ROOT_URL + "/me", headers).then(resp => resp.json())
    const request = await fetch(SPOTIFY_API_ROOT_URL + "/me", headers)
    const profile = await request.json()
    const parsedProfile = currentUserProfileSchema.parse(profile)
    return parsedProfile
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getAvailableDevices = async (accessToken: string): Promise<z.infer<typeof availableDevicesSchema> | null> => {
  const headers = {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  try {
    const request = await fetch(SPOTIFY_API_ROOT_URL + "/me/player/devices", headers)
    const availableDevices = await request.json()
    const parsedAvailableDevices = availableDevicesSchema.parse(availableDevices)
    return parsedAvailableDevices
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getPlaybackState = async (accessToken: string): Promise<z.infer<typeof playerStateSchema> | null> => {
  const headers = {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  try {
    const request = await fetch(SPOTIFY_API_ROOT_URL + "/me/player", headers)
    // TODO: handle not found playback running or music in queue
    if (request.status === 204) {
      return null
    }
    const playerState = await request.json()
    const parsedPlayerState = playerStateSchema.parse(playerState)
    return parsedPlayerState
  } catch (err) {
    console.error(err)
    return null
  }
}

export const startResumePlayback = async (accessToken: string, deviceId: string): Promise<z.infer<typeof playerStateSchema> | null> => {
  const params = new URLSearchParams({ device_id: deviceId })

  const body = {
    context_uri: "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
    offset: {
      position: 5,
    },
    position_ms: 0,
  }

  const headers = {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}`, ["Content-Type"]: "application/json" },
    body: JSON.stringify(body),
  }

  try {
    const request = await fetch(SPOTIFY_API_ROOT_URL + "/me/player/play" + `?${params.toString()}`, headers)
    if (request.status === 204) {
      return null
    }
    const playerState = await request.json()
    const parsedPlayerState = playerStateSchema.parse(playerState)
    return parsedPlayerState
  } catch (err) {
    console.error(err)
    return null
  }
}
