"use client";

import { useAppSelector } from "@/app/hooks/store";

export const PlaylistInfo = () => {
  const selectedPlaylist = useAppSelector((state) => state.music.playlist);
  console.log(selectedPlaylist);
  return (
    <div className="mb-10">
      <h2>Informations de la playlist</h2>
      <div>
        <p>Playlist: </p>
        <p>Nombre de pistes: </p>
        <p>Durée totale: </p>
      </div>
    </div>
  );
};
