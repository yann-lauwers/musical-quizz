import { StartResumeButton } from "@/components/start-resume-button";
import { SignOutButton } from "@/components/signout-button";
import {
  getAvailableDevices,
  getCurrentUserProfile,
  getPlaybackState,
} from "@/actions/spotify";
import { PlaylistURLForm } from "@/components/playlistID-form";
import { Select } from "@/components/select";

export default async function Home() {
  const profile = await getCurrentUserProfile();
  const devices = await getAvailableDevices();
  const playbackState = await getPlaybackState();

  const log = async (e: string) => {
    "use server";
    console.log(e);
  };

  return (
    <div className="w-full">
      <Banner />
      <div className="mb-10 flex items-center justify-between gap-8 px-8 py-4">
        <div className="flex items-center gap-8">
          <SignOutButton profile={profile} />
          <PlaylistURLForm />
        </div>
        <Select
          name="select_device"
          onChange={log}
          options={
            devices?.devices?.map((device) => ({
              id: device.id,
              label: device.name,
            })) ?? []
          }
        />
      </div>

      <div className="mb-10 space-y-2">
        <h2>Appareils disponibles</h2>
        <ul>
          {devices?.devices?.map((device) => (
            <li key={device.id}>
              - {device.name} = {device.id}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-10">
        <StartResumeButton />
      </div>
      <div className="mb-10">
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
