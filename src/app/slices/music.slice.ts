import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { z } from "zod";

import { playlistSchema } from "@/schemas/spotify";
import { RootState } from "@/utils/store";

// Define a type for the slice state
interface MusicState {
  playlist: z.infer<typeof playlistSchema> | null;
}

// Define the initial state using that type
const initialState: MusicState = {
  playlist: null,
};

export const musicSlice = createSlice({
  name: "music",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPlaylistId: (
      state,
      action: PayloadAction<z.infer<typeof playlistSchema> | null>,
    ) => {
      state.playlist = action.payload;
    },
  },
});

export const { setPlaylistId } = musicSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getPlaylistId = (state: RootState) => state.music.playlist;

export default musicSlice.reducer;
