import { cookies } from "next/headers"
import { getCurrentUserProfile } from "@/utils/spotify"

export default async function Home() {
  const accessToken = cookies().get("spotify_access_token")?.value
  const profile = await getCurrentUserProfile(accessToken ?? "")

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Connecté</div>
      <h1>{profile.display_name}</h1>
    </main>
  )
}
