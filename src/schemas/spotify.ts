import { z } from "zod";

export const spotifyAccessTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.literal("Bearer"),
  expires_in: z.number(),
  refresh_token: z.string(),
  scope: z.string(),
});

export const spotifyRefreshTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.literal("Bearer"),
  expires_in: z.number(),
  scope: z.string(),
});

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
  images: z.array(
    z.object({ url: z.string(), height: z.number(), width: z.number() }),
  ),
  product: z.string(),
  type: z.string(),
  uri: z.string(),
});

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
      }),
    )
    .optional(),
});

export const playerStateSchema = z.object({
  device: z.object({
    id: z.string(),
    is_active: z.boolean(),
    is_private_session: z.boolean(),
    is_restricted: z.boolean(),
    name: z.string(),
    type: z.string(),
    volume_percent: z.number(),
    supports_volume: z.boolean(),
  }),
  repeat_state: z.string(),
  shuffle_state: z.boolean(),
  context: z
    .object({
      type: z.string(),
      href: z.string(),
      external_urls: z.object({ spotify: z.string() }),
      uri: z.string(),
    })
    .nullable(),
  timestamp: z.number(),
  progress_ms: z.number(),
  is_playing: z.boolean(),
  item: z
    .object({
      album: z.object({
        album_type: z.string(),
        total_tracks: z.number(),
        available_markets: z.array(z.string()),
        external_urls: z.object({ spotify: z.string() }),
        href: z.string(),
        id: z.string(),
        images: z.array(
          z.object({ url: z.string(), height: z.number(), width: z.number() }),
        ),
        name: z.string(),
        release_date: z.string(),
        release_date_precision: z.string(),
        restrictions: z.object({ reason: z.string() }).optional(),
        type: z.string(),
        uri: z.string(),
        artists: z.array(
          z.object({
            external_urls: z.object({ spotify: z.string() }),
            href: z.string(),
            id: z.string(),
            name: z.string(),
            type: z.string(),
            uri: z.string(),
          }),
        ),
      }),
      artists: z.array(
        z.object({
          external_urls: z.object({ spotify: z.string() }),
          followers: z
            .object({ href: z.string(), total: z.number() })
            .optional(),
          genres: z.array(z.string()).optional(),
          href: z.string(),
          id: z.string(),
          images: z
            .array(
              z.object({
                url: z.string(),
                height: z.number(),
                width: z.number(),
              }),
            )
            .optional(),
          name: z.string(),
          popularity: z.number().optional(),
          type: z.string(),
          uri: z.string(),
        }),
      ),
      available_markets: z.array(z.string()),
      disc_number: z.number(),
      duration_ms: z.number(),
      explicit: z.boolean(),
      external_ids: z.object({
        isrc: z.string(),
        ean: z.string().optional(),
        upc: z.string().optional(),
      }),
      external_urls: z.object({ spotify: z.string() }),
      href: z.string(),
      id: z.string(),
      is_playable: z.boolean().optional(),
      linked_from: z.object({}).optional(),
      restrictions: z.object({ reason: z.string() }).optional(),
      name: z.string(),
      popularity: z.number(),
      preview_url: z.string().nullable(),
      track_number: z.number(),
      type: z.string(),
      uri: z.string(),
      is_local: z.boolean(),
    })
    .nullable(),
  currently_playing_type: z.string(),
  actions: z.object({
    interrupting_playback: z.boolean().optional(),
    pausing: z.boolean().optional(),
    resuming: z.boolean().optional(),
    seeking: z.boolean().optional(),
    skipping_next: z.boolean().optional(),
    skipping_prev: z.boolean().optional(),
    toggling_repeat_context: z.boolean().optional(),
    toggling_shuffle: z.boolean().optional(),
    toggling_repeat_track: z.boolean().optional(),
    transferring_playback: z.boolean().optional(),
  }),
});

export const playlistSchema = z.object({
  collaborative: z.boolean().optional(),
  description: z.string().optional(),
  external_urls: z.object({ spotify: z.string() }).optional(),
  followers: z.object({ href: z.string(), total: z.number() }),
  href: z.string(),
  id: z.string(),
  images: z.array(
    z.object({ url: z.string(), height: z.number(), width: z.number() }),
  ),
  name: z.string(),
  owner: z.object({
    external_urls: z.object({ spotify: z.string() }),
    followers: z.object({ href: z.string(), total: z.number() }),
    href: z.string(),
    id: z.string(),
    type: z.string(),
    uri: z.string(),
    display_name: z.string(),
  }),
  public: z.boolean(),
  snapshot_id: z.string(),
  tracks: z.object({
    href: z.string(),
    limit: z.number(),
    next: z.string(),
    offset: z.number(),
    previous: z.string(),
    total: z.number(),
    items: z.array(
      z.object({
        added_at: z.string(),
        added_by: z.object({
          external_urls: z.object({ spotify: z.string() }),
          followers: z.object({ href: z.string(), total: z.number() }),
          href: z.string(),
          id: z.string(),
          type: z.string(),
          uri: z.string(),
        }),
        is_local: z.boolean(),
        track: z.object({
          album: z.object({
            album_type: z.string(),
            total_tracks: z.number(),
            available_markets: z.array(z.string()),
            external_urls: z.object({ spotify: z.string() }),
            href: z.string(),
            id: z.string(),
            images: z.array(
              z.object({
                url: z.string(),
                height: z.number(),
                width: z.number(),
              }),
            ),
            name: z.string(),
            release_date: z.string(),
            release_date_precision: z.string(),
            restrictions: z.object({ reason: z.string() }),
            type: z.string(),
            uri: z.string(),
            artists: z.array(
              z.object({
                external_urls: z.object({ spotify: z.string() }),
                href: z.string(),
                id: z.string(),
                name: z.string(),
                type: z.string(),
                uri: z.string(),
              }),
            ),
          }),
          artists: z.array(
            z.object({
              external_urls: z.object({ spotify: z.string() }),
              followers: z.object({ href: z.string(), total: z.number() }),
              genres: z.array(z.string()),
              href: z.string(),
              id: z.string(),
              images: z.array(
                z.object({
                  url: z.string(),
                  height: z.number(),
                  width: z.number(),
                }),
              ),
              name: z.string(),
              popularity: z.number(),
              type: z.string(),
              uri: z.string(),
            }),
          ),
          available_markets: z.array(z.string()),
          disc_number: z.number(),
          duration_ms: z.number(),
          explicit: z.boolean(),
          external_ids: z.object({
            isrc: z.string(),
            ean: z.string(),
            upc: z.string(),
          }),
          external_urls: z.object({ spotify: z.string() }),
          href: z.string(),
          id: z.string(),
          is_playable: z.boolean(),
          linked_from: z.object({}),
          restrictions: z.object({ reason: z.string() }),
          name: z.string(),
          popularity: z.number(),
          preview_url: z.string(),
          track_number: z.number(),
          type: z.string(),
          uri: z.string(),
          is_local: z.boolean(),
        }),
      }),
    ),
  }),
  type: z.string(),
  uri: z.string(),
});
