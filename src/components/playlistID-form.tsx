"use client";

import { Search, X } from "lucide-react";
import { SubmitButton } from "./submit-button";
import { Button } from "./button";
import { State, getPlaylistAction } from "@/actions/spotify/playlistID";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";

// https://nehalist.io/react-hook-form-with-nextjs-server-actions/

export const PlaylistIDForm = () => {
  const { register } = useForm();
  const [state, formAction] = useFormState<State, FormData>(
    getPlaylistAction,
    null,
  );

  console.log(state);

  return (
    <form action={formAction} className="flex flex-col items-center gap-4">
      <div className="relative rounded-full hover:brightness-150">
        <input
          {...register("playlistId")}
          className="w-full rounded-full bg-[#1c1c1c] py-4 pl-12 pr-4 text-white placeholder:text-[#464646] hover:ring-1 hover:ring-[#464646] focus:outline-none focus:ring-2 focus:ring-white md:w-[500px]"
          placeholder="ID de la playlist"
        />
        <SubmitButton className="absolute inset-y-0 left-0 flex items-center pl-3 pr-2 text-[#b0b0b0]">
          <Search />
        </SubmitButton>
        <Button className="absolute inset-y-0 right-0 flex items-center pl-2 pr-3 text-[#b0b0b0]">
          <X />
        </Button>
      </div>
    </form>
  );
};
