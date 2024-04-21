"use client"

import { authorize } from "@/utils/spotify-authorizations"

export default function Home() {
  return (
    <div className="m-auto">
      <button onClick={async () => await authorize()} className="bg-[#24d44e] text-black rounded-full py-4 px-8 font-semibold hover:scale-105">
        Me connecter avec Spotify
      </button>
    </div>
  )
}
