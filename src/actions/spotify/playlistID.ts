"use server";

import { getPlaylist } from "../spotify";

export type State = {
  status: "success";
  message: string;
} | null;

export const getPlaylistAction = async (
  prevState: State | null,
  data: FormData,
): Promise<State> => {
  const rawFormData = {
    playlistId: data.get("playlistId"),
  };

  console.log(rawFormData);
  const playlist = await getPlaylist(rawFormData.playlistId as string);
  return { status: "success", message: "Playlist ID found" };
};
