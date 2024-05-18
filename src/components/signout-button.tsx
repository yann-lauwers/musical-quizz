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
  profile: z.infer<typeof currentUserProfileSchema>;
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(() => {
          signOut();
        })
      }
      className="flex items-center gap-2"
    >
      {isPending ? (
        <Spinner className="h-6 w-6" />
      ) : (
        <Image
          src={profile?.images?.[0].url}
          width={profile?.images?.[0].width}
          height={profile?.images?.[0].height}
          alt="profil spotify"
          className="h-6 w-6 rounded-full"
        />
      )}
      <p className="font-medium">{profile?.display_name}</p>
    </button>
  );
};
