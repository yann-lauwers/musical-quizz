import { StartResumeButton } from "@/components/start-resume-button";
import { SignOutButton } from "@/components/signout-button";
import {
  getAvailableDevices,
  getCurrentUserProfile,
  getPlaybackState,
} from "@/actions/spotify";

export default async function Home() {
  const profile = await getCurrentUserProfile();
  const devices = await getAvailableDevices();
  const playbackState = await getPlaybackState();

  return (
    <div className="w-full">
      <div className="to bg-gradient-to-b from-[rgb(16,16,16)] text-center">
        <p className="py-1 text-sm italic">
          Veillez à garder l&apos;application ouverte sur le compte connecté{" "}
        </p>
      </div>
      <div className="mb-10 flex items-center justify-between px-8 py-2">
        {profile?.images?.[0] ? (
          <SignOutButton profile={profile} />
        ) : (
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#24d44e]" />
            <p>
              Connecté en tant que{" "}
              <span className="font-medium">{profile?.display_name}</span>
            </p>
          </div>
        )}
        <div></div>
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
      <div>
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
