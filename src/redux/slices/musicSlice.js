import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const initialState = {
  playList: [],
  currentIdx: null,
  isPlaying: false,
  musicControlBtn: false,
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    clearMusicStatus: (state, action) => {
      let currentState = state;
      currentState = initialState;
      return currentState;
    },
    setPlayList: (state, action) => {
      state.playList = action.payload;
    },
    listenMusic: (state, action) => {
      state.currentIdx = action.payload.index;
    },
    goToNextTrack: (state, action) => {
      state.currentIdx = state.currentIdx + 1;
    },
    goToPrevTrack: (state, action) => {
      state.currentIdx = state.currentIdx - 1;
    },
    goToFirstTrack: (state, action) => {
      state.currentIdx = 0;
    },
  },
});

const {
  listenMusic,
  setPlayList,
  setIsPlaying,
  goToNextTrack,
  clearMusicStatus,
  goToFirstTrack,
} = musicSlice.actions;

export {
  listenMusic,
  setPlayList,
  setIsPlaying,
  goToNextTrack,
  clearMusicStatus,
  goToFirstTrack,
};
