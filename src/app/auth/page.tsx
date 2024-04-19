"use client"

import { authorize } from "@/components/spotify-actions"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <button onClick={async () => await authorize()} className="bg-green-500 p-2 hover:bg-green-400">
          Auth
        </button>
      </div>
    </main>
  )
}
