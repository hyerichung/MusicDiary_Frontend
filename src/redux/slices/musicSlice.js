import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const initialState = {
  playList: [],
  currentTrackInfo: {},
  currentTrackIdx: null,
  isTrackPlaying: false,
  trackControlBtnStatus: false,
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setIsTrackPlaying: (state, action) => {
      state.isTrackPlaying = action.payload;
    },
    goToNextTrack: (state, action) => {
      state.currentTrackIdx = state.currentTrackIdx++;
      state.currentTrackInfo = state.playList[state.currentTrackIdx++];
    },
    goToPrevTrack: (state, action) => {
      state.currentTrackIdx = state.currentTrackIdx--;
      state.currentTrackInfo = state.playList[state.currentTrackIdx--];
    },
  },
});

const { setIsTrackPlaying, goToNextTrack, goToPrevTrack } = musicSlice.actions;

export { setIsTrackPlaying, goToNextTrack, goToPrevTrack };
