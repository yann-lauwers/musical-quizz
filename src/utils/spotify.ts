import { currentUserProfileSchema } from "@/app/schemas/spotify"
import { z } from "zod"

export const getCurrentUserProfile = async (accessToken: string): Promise<z.infer<typeof currentUserProfileSchema>> => {
  const request = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const profile = await request.json()
  const parsedProfile = currentUserProfileSchema.parse(profile)
  return parsedProfile
}
