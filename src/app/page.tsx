import { cookies } from "next/headers"
import { getAvailableDevices, getCurrentUserProfile } from "@/utils/spotify"

export default async function Home() {
  const accessToken = cookies().get("spotify_access_token")?.value
  const profile = await getCurrentUserProfile(accessToken ?? "")
  const devices = await getAvailableDevices(accessToken ?? "")
  console.log(devices)

  return (
    <main className="min-h-screen justify-center p-24">
      <h1 className="mb-10">Connecté en tant que {profile.display_name}</h1>

      <div className="space-y-2">
        <h2>Appareils disponibles</h2>
        <ul>
          {devices?.devices?.map(device => (
            <li key={device.id}>- {device.name}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}
