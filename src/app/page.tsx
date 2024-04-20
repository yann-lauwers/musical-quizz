import { cookies } from "next/headers"
import { getAvailableDevices, getCurrentUserProfile, getPlaybackState, startResumePlayback } from "@/utils/spotify"
import { StartResumeButton } from "@/components/start-resume-button"

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

  return (
    <main className="min-h-screen justify-center p-24">
      <h1 className="mb-4">Connecté en tant que {profile.display_name}</h1>
      <p className="mb-10 italic">Avoir spotify ouvert sur son ordi</p>
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
    </main>
  )
}
