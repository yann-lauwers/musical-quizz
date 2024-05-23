"use client";

import { signOut } from "@/actions/auth";
import { currentUserProfileSchema } from "@/schemas/spotify";
import Spinner from "@/icons/spinner";
import Image from "next/image";
import { useTransition } from "react";
import { z } from "zod";

export const SignOutButton = ({
  profile,
}: {
  profile: z.infer<typeof currentUserProfileSchema> | null;
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(() => {
          signOut();
        })
      }
      className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
    >
      {isPending ? (
        <Spinner className="h-6 w-6" />
      ) : profile?.images?.[0] ? (
        <Image
          src={profile?.images?.[0].url}
          width={profile?.images?.[0].width}
          height={profile?.images?.[0].height}
          alt="profil spotify"
          className="h-10 w-10 rounded-full"
        />
      ) : (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[#24d44e]" />
          <p className="font-medium">{profile?.display_name}</p>
        </div>
      )}
    </button>
  );
};
