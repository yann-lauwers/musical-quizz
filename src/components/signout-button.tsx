"use client"

import { currentUserProfileSchema } from "@/app/schemas/spotify"
import Image from "next/image"
import { z } from "zod"

export const SignOutButton = ({ signOut, profile }: { signOut: () => Promise<void>; profile: z.infer<typeof currentUserProfileSchema> }) => {
  return (
    <button onClick={() => signOut()} className="flex items-center gap-2">
      <Image
        src={profile?.images?.[0].url}
        width={profile?.images?.[0].width}
        height={profile?.images?.[0].height}
        alt="profil spotify"
        className="rounded-full w-6 h-6"
      />
      <p className="font-medium">{profile?.display_name}</p>
    </button>
  )
}
