import { Play } from "next/font/google";

import {
  getAvailableDevices,
  getCurrentUserProfile,
  getPlaybackState,
} from "@/actions/spotify";
import { PlaylistURLForm } from "@/components/playlistID-form";
import { PlaylistInfo } from "@/components/playlistInfo";
import { SelectDevices } from "@/components/select-device";
import { SignOutButton } from "@/components/signout-button";
import { StartResumeButton } from "@/components/start-resume-button";

export default async function Home() {
  const profile = await getCurrentUserProfile();
  const devices = await getAvailableDevices();
  const playbackState = await getPlaybackState();

  return (
    <div className="w-full">
      <Banner />
      <div className="mb-10 flex items-center justify-between gap-8 px-8 py-4">
        <div className="flex items-center gap-8">
          <SignOutButton profile={profile} />
          <PlaylistURLForm />
        </div>
        <SelectDevices devices={devices} />
      </div>
      <div className="mb-10">
        <StartResumeButton />
      </div>
      <div className="mb-10">
        <PlaylistInfo />
        <h2>Etat de lecture</h2>
        {playbackState ? (
          <div>
            <p>Titre: {playbackState.item?.name}</p>
            <p>Artiste: {playbackState.item?.artists[0].name}</p>
            <p>Album: {playbackState.item?.album.name}</p>
          </div>
        ) : (
          <p>Aucune lecture en cours</p>
        )}
      </div>
    </div>
  );
}

const Banner = () => {
  return (
    <div className="bg-[rgb(16,16,16)] py-2 text-center">
      <p className="text-sm italic">
        Veillez à garder l&apos;application ouverte sur le compte connecté{" "}
      </p>
    </div>
  );
};
