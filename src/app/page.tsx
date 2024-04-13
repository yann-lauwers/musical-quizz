"use client"

import { auth } from "@/components/spotify-actions"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>Hey</p>
        <button onClick={async () => await auth()}>Auth</button>
      </div>
    </main>
  )
}
