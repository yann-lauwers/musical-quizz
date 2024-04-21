import { cookies } from "next/headers"
import { getAvailableDevices, getCurrentUserProfile, getPlaybackState, startResumePlayback } from "@/utils/spotify"
import { StartResumeButton } from "@/components/start-resume-button"
import Image from "next/image"
import { SignOutButton } from "@/components/signout-button"
import { SPOTIFY_API_ROOT_URL } from "./constants/spotify"

export default async function Home() {
  const accessToken = cookies().get("spotify_access_token")?.value ?? ""
  const profile = await getCurrentUserProfile(accessToken)
  const devices = await getAvailableDevices(accessToken)
  const playbackState = await getPlaybackState(accessToken)

  async function startResume() {
    "use server"

    const accessToken = cookies().get("spotify_access_token")?.value ?? ""
    const a = await startResumePlayback(accessToken, "87184c552c056d656bba57dc1ac9b0130a9f8134")
    console.log(a)
    // ...
  }

  // FIXME: This doesnt work
  async function signOut() {
    "use server"

    await fetch("http://localhost:3000/api/sign-out", { method: "GET" })
  }

  return (
    <div className="w-full">
      <div className="text-center bg-gradient-to-b from-[rgb(16,16,16)] to">
        <p className="italic text-sm py-1">Veillez à garder l&apos;application ouverte sur le compte connecté </p>
      </div>
      <div className="px-8 py-2 flex justify-between items-center mb-10">
        {profile?.images?.[0] ? (
          <SignOutButton signOut={signOut} profile={profile} />
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#24d44e] rounded-full" />
            <p>
              Connecté en tant que <span className="font-medium">{profile?.display_name}</span>
            </p>
          </div>
        )}
        <div></div>
      </div>

      <div className="space-y-2 mb-10">
        <h2>Appareils disponibles</h2>
        <ul>
          {devices?.devices?.map(device => (
            <li key={device.id}>
              - {device.name} = {device.id}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-10">
        <StartResumeButton startResume={startResume} />
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
  )
}
