import { API_ROOT_URL } from "@/app/constants/spotify"
import { availableDevicesSchema, currentUserProfileSchema } from "@/app/schemas/spotify"
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

export const getAvailableDevices = async (accessToken: string): Promise<z.infer<typeof availableDevicesSchema> | null> => {
  const request = await fetch(API_ROOT_URL + "/me/player/devices", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const availableDevices = await request.json()
  const parsedAvailableDevices = availableDevicesSchema.parse(availableDevices)
  return parsedAvailableDevices
}
