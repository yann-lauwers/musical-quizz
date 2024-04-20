import { z } from "zod"

export const spotifyAccessTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.literal("Bearer"),
  expires_in: z.number(),
  refresh_token: z.string(),
  scope: z.string(),
})

export const spotifyRefreshTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.literal("Bearer"),
  expires_in: z.number(),
  scope: z.string(),
})

export const currentUserProfileSchema = z.object({
  country: z.string(),
  display_name: z.string(),
  email: z.string(),
  explicit_content: z.object({
    filter_enabled: z.boolean(),
    filter_locked: z.boolean(),
  }),
  external_urls: z.object({ spotify: z.string() }),
  followers: z.object({ href: z.string().nullable(), total: z.number() }),
  href: z.string(),
  id: z.string(),
  images: z.array(z.object({ url: z.string(), height: z.number(), width: z.number() })),
  product: z.string(),
  type: z.string(),
  uri: z.string(),
})

export const availableDevicesSchema = z.object({
  devices: z
    .array(
      z.object({
        id: z.string(),
        is_active: z.boolean(),
        is_private_session: z.boolean(),
        is_restricted: z.boolean(),
        name: z.string(),
        type: z.string(),
        volume_percent: z.number(),
        supports_volume: z.boolean(),
      })
    )
    .optional(),
})
