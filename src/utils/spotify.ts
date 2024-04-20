import { API_ROOT_URL } from "@/app/constants/spotify"
import { availableDevicesSchema, currentUserProfileSchema, playerStateSchema } from "@/app/schemas/spotify"
import { z } from "zod"

export const getCurrentUserProfile = async (accessToken: string): Promise<z.infer<typeof currentUserProfileSchema>> => {
  const request = await fetch(API_ROOT_URL + "/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const profile = await request.json()
  const parsedProfile = currentUserProfileSchema.parse(profile)
  return parsedProfile
}

export const getAvailableDevices = async (accessToken: string): Promise<z.infer<typeof availableDevicesSchema>> => {
  const request = await fetch(API_ROOT_URL + "/me/player/devices", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const availableDevices = await request.json()
  const parsedAvailableDevices = availableDevicesSchema.parse(availableDevices)
  return parsedAvailableDevices
}

export const getPlaybackState = async (accessToken: string): Promise<z.infer<typeof playerStateSchema> | null> => {
  const request = await fetch(API_ROOT_URL + "/me/player", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (request.status === 204) {
    return null
  }
  const playerState = await request.json()
  const parsedPlayerState = playerStateSchema.parse(playerState)
  return parsedPlayerState
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

  const request = await fetch(API_ROOT_URL + "/me/player/play" + `?${params.toString()}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}`, ["Content-Type"]: "application/json" },
    body: JSON.stringify(body),
  })
  if (request.status === 204) {
    return null
  }
  const playerState = await request.json()
  const parsedPlayerState = playerStateSchema.parse(playerState)
  return parsedPlayerState
}
