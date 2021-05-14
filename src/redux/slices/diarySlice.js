import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addNewDiaryAPI } from "../../api";
import * as SecureStore from "expo-secure-store";

export const addNewDiary = createAsyncThunk(
  "DIARY/ADD_DIARY",
  async ({ diaryTitleInfo, userId }) => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");

      const addedDiaryInfo = await addNewDiaryAPI({
        accessToken,
        diaryTitleInfo,
        userId,
      });

      return addedDiaryInfo;
    } catch (err) {
      console.error("failed to post diary", err);
    }
  }
);

const initialState = {
  byIds: {},
  allIds: [],
  visibleDiary: {
    byDate: [],
    byLocation: [],
    byHashTag: [],
  },
  loading: false,
  error: null,
};

export const diarySlice = createSlice({
  name: "diary",
  initialState,
  extraReducers: {
    [addNewDiary.fulfilled]: (state, action) => {
      state.byIds = { ...state.byIds, [action.payload._id]: action.payload };
      state.allIds = state.allIds.concat([action.payload._id]);
      state.loading = false;
      state.error = false;
    },
    [addNewDiary.pending]: (state) => {
      state.loading = true;
    },
    [addNewDiary.reject]: (state, action) => {
      state.laoding = false;
      state.error = action.payload;
    },
  },
});
