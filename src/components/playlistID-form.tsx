"use client";

import { Search, X } from "lucide-react";
import { useState, useTransition } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getPlaylist } from "@/actions/spotify";
import { useAppDispatch } from "@/app/hooks/store";
import { setPlaylistId } from "@/app/slices/music.slice";
import { Button } from "@/components/button";
import { SubmitButton } from "@/components/submit-button";
import { ERROR_MESSAGE } from "@/constants/errors";
import { playlistSchema } from "@/schemas/spotify";

// https://nehalist.io/react-hook-form-with-nextjs-server-actions/

type State = z.infer<typeof playlistSchema> | null;

const playlistURLFormSchema = z.object({
  playlistURL: z.string().nullable(),
});
type PlaylistURLForm = z.infer<typeof playlistURLFormSchema>;

export const PlaylistURLForm = () => {
  const [error, setError] = useState<string | null>(null);

  const { register, setValue } = useForm<PlaylistURLForm>();

  const [isPending, startTransition] = useTransition();

  const dispatch = useAppDispatch();

  const [state, formAction] = useFormState<State, FormData>(
    async (_: State | null, data: FormData): Promise<State | null> => {
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

      dispatch(setPlaylistId(playlistQuery.content));

      return playlistQuery.content;
    },
    null,
  );

  return (
    <>
      <form
        action={(e) => {
          startTransition(() => formAction(e));
        }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative rounded-full hover:brightness-150">
          <input
            {...register("playlistURL")}
            className="w-full rounded-full bg-[#1c1c1c] py-2.5 pl-12 pr-10 text-white placeholder:text-[#464646] hover:ring-1 hover:ring-[#464646] focus:outline-none focus:ring-2 focus:ring-white md:w-96"
            placeholder="ID de la playlist"
            defaultValue="https://open.spotify.com/playlist/37i9dQZF1DX8LIZNmf5qj3?si=fcc11655b60b4e69"
          />
          <SubmitButton className="absolute inset-y-0 left-0 flex items-center rounded-l-full pl-3 pr-2 text-[#b0b0b0] focus:outline-none focus:ring-2 focus:ring-white">
            <Search />
          </SubmitButton>
          <Button
            onClick={() => setValue("playlistURL", null)}
            className="absolute inset-y-0 right-0 flex items-center rounded-r-full pl-2 pr-3 text-[#b0b0b0] focus:outline-none focus:ring-2 focus:ring-white"
          >
            <X />
          </Button>
        </div>
      </form>
      {isPending && <p>Loading</p>}
      {state && <p>{state.name}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};
