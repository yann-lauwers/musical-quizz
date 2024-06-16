"use client";

import clsx from "clsx";
import { useTransition } from "react";

import { authorize } from "@/actions/auth";
import Spinner from "@/icons/spinner";

export default function Home() {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="m-auto">
      <button
        onClick={() =>
          startTransition(() => {
            authorize();
          })
        }
        disabled={isPending}
        className={clsx(
          "rounded-full bg-[#24d44e] px-8 py-4 font-semibold text-black transition-transform",
          !isPending && "hover:scale-105",
        )}
      >
        {isPending ? (
          <Spinner className="h-8 w-8" />
        ) : (
          <>Me connecter avec Spotify</>
        )}
      </button>
    </div>
  );
}
