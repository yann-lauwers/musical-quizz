"use client";

import { Search, X } from "lucide-react";
import { SubmitButton } from "./submit-button";
import { Button } from "./button";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { playlistSchema } from "@/schemas/spotify";
import { z } from "zod";
import { getPlaylist } from "@/actions/spotify";
import { useState } from "react";
import { ERROR_MESSAGE } from "@/constants/errors";

// https://nehalist.io/react-hook-form-with-nextjs-server-actions/

export type State = z.infer<typeof playlistSchema> | null;

const playlistURLFormSchema = z.object({
  playlistURL: z.string().nullable(),
});
type PlaylistURLForm = z.infer<typeof playlistURLFormSchema>;

export const PlaylistURLForm = () => {
  const [error, setError] = useState<string | null>(null);

  const { register, setValue } = useForm<PlaylistURLForm>();

  const [state, formAction] = useFormState<State, FormData>(
    async (prevState: State | null, data: FormData): Promise<State | null> => {
      console.log({ prevState });

      const rawFormData = {
        playlistURL: data.get("playlistURL") as string,
      };

      const parsedFormData = playlistURLFormSchema.safeParse(rawFormData);
      if (!parsedFormData.success || !parsedFormData.data.playlistURL) {
        setError(ERROR_MESSAGE.spotify.getPlaylistFromUrl);
        return null;
      }

      const playlistID = parsedFormData.data.playlistURL
        .split("?")[0]
        .split("playlist/")
        .pop();

      if (!playlistID) {
        setError(ERROR_MESSAGE.spotify.getPlaylistFromUrl);
        return null;
      }

      const playlistQuery = await getPlaylist(playlistID);

      if (playlistQuery.status === "error") {
        playlistQuery.message;
        setError(playlistQuery.message);
        return null;
      }

      if (error) setError(null);

      return playlistQuery.content;
    },
    null,
  );

  return (
    <>
      <form action={formAction} className="flex flex-col items-center gap-4">
        <div className="relative rounded-full hover:brightness-150">
          <input
            {...register("playlistURL")}
            className="w-full rounded-full bg-[#1c1c1c] py-4 pl-12 pr-10 text-white placeholder:text-[#464646] hover:ring-1 hover:ring-[#464646] focus:outline-none focus:ring-2 focus:ring-white md:w-[500px]"
            placeholder="ID de la playlist"
          />
          <SubmitButton className="absolute inset-y-0 left-0 flex items-center pl-3 pr-2 text-[#b0b0b0]">
            <Search />
          </SubmitButton>
          <Button
            onClick={() => setValue("playlistURL", null)}
            className="absolute inset-y-0 right-0 flex items-center pl-2 pr-3 text-[#b0b0b0]"
          >
            <X />
          </Button>
        </div>
      </form>
      {state && <p>{state.name}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};
