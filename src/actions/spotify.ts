"use server";

import { verifySession } from "./auth";
import {
  availableDevicesSchema,
  currentUserProfileSchema,
  playerStateSchema,
  playlistSchema,
} from "../schemas/spotify";
import { SPOTIFY_API_ROOT_URL } from "../constants/spotify";
import { z } from "zod";

const getCurrentUserProfile = async (): Promise<z.infer<
  typeof currentUserProfileSchema
> | null> => {
  const { isAuth, spotifyAccessToken } = await verifySession();
  if (!isAuth) return null;

  const headers = {
    method: "GET",
    headers: { Authorization: `Bearer ${spotifyAccessToken}` },
  };

  try {
    const profile = await fetch(SPOTIFY_API_ROOT_URL + "/me", headers).then(
      (resp) => resp.json(),
    );
    const parsedProfile = currentUserProfileSchema.parse(profile);
    return parsedProfile;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getAvailableDevices = async (): Promise<z.infer<
  typeof availableDevicesSchema
> | null> => {
  const { isAuth, spotifyAccessToken } = await verifySession();
  if (!isAuth) return null;

  const headers = {
    method: "GET",
    headers: { Authorization: `Bearer ${spotifyAccessToken}` },
  };

  try {
    const availableDevices = await fetch(
      SPOTIFY_API_ROOT_URL + "/me/player/devices",
      headers,
    ).then((resp) => resp.json());
    const parsedAvailableDevices =
      availableDevicesSchema.parse(availableDevices);
    return parsedAvailableDevices;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getPlaybackState = async (): Promise<z.infer<
  typeof playerStateSchema
> | null> => {
  const { isAuth, spotifyAccessToken } = await verifySession();
  if (!isAuth) return null;

  const headers = {
    method: "GET",
    headers: { Authorization: `Bearer ${spotifyAccessToken}` },
  };

  try {
    const request = await fetch(SPOTIFY_API_ROOT_URL + "/me/player", headers);
    // TODO: handle not found playback running or music in queue
    if (request.status === 204) {
      return null;
    }
    const playerState = await request.json();
    const parsedPlayerState = playerStateSchema.parse(playerState);
    return parsedPlayerState;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const startResumePlayback = async (
  deviceID: string,
): Promise<z.infer<typeof playerStateSchema> | null> => {
  const { isAuth, spotifyAccessToken } = await verifySession();
  if (!isAuth) return null;

  const params = new URLSearchParams({ device_id: deviceID });

  const body = {
    context_uri: "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
    offset: {
      position: 5,
    },
    position_ms: 0,
  };

  const headers = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
      ["Content-Type"]: "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const request = await fetch(
      SPOTIFY_API_ROOT_URL + "/me/player/play" + `?${params.toString()}`,
      headers,
    );
    if (request.status === 204) {
      return null;
    }
    const playerState = await request.json();
    const parsedPlayerState = playerStateSchema.parse(playerState);
    return parsedPlayerState;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getPlaylist = async (
  playlistID: string,
): Promise<z.infer<typeof playlistSchema> | null> => {
  const { isAuth, spotifyAccessToken } = await verifySession();
  if (!isAuth) return null;

  const headers = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
      ["Content-Type"]: "application/json",
    },
  };

  try {
    const request = await fetch(
      SPOTIFY_API_ROOT_URL + "/playlists/" + playlistID,
      headers,
    );
    const playlist = await request.json();

    console.log({ request, playlist });
    if (playlist.error.status === 400) {
      if (playlist.error.message === "Invalid base62 id") {
        // todo handle error management
        // return { message: "Invalid playlist ID" };
      }
    }
    const parsedPlaylist = playlistSchema.parse(playlist);
    return parsedPlaylist;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export {
  getCurrentUserProfile,
  getAvailableDevices,
  getPlaybackState,
  startResumePlayback,
  getPlaylist,
};
