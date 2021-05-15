import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addNewDiaryAPI, fetchDiaryByDateAPI } from "../../api";
import * as SecureStore from "expo-secure-store";
import { parseISO, format } from "date-fns";

export const addNewDiary = createAsyncThunk(
  "DIARY/ADD_DIARY",
  async ({ diaryTitleInfo, userId }) => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");

      const newDiaryInfo = await addNewDiaryAPI({
        accessToken,
        diaryTitleInfo,
        userId,
      });

      return newDiaryInfo;
    } catch (err) {
      console.error("failed to post diary", err);
    }
  }
);

export const fetchDiaryByDate = createAsyncThunk(
  "DIARY/FETCH_DIARY_BY_DATE",
  async ({ userId }) => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");

      const fetchedDiaryByDateInfo = await fetchDiaryByDateAPI({
        accessToken,
        userId,
      });

      return fetchedDiaryByDateInfo;
    } catch (err) {
      console.error("failed to fetch diary by date");
    }
  }
);

const initialState = {
  byIds: {}, // default byDate
  allIds: [],
  visibleDiary: {
    byDate: [], // default
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
      state.byIds = {
        ...state.byIds,
        [action.payload._id]: {
          ...action.payload,
          date: format(parseISO(action.payload.date), "yyyy-MM-dd"),
        },
      };
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

    [fetchDiaryByDate.fulfilled]: (state, action) => {
      const ids = action.payload.map((diary) => diary._id);

      state.byIds = {
        ...state.byIds,
        ...action.payload.reduce((initialObj, diaryById) => {
          initialObj[diaryById._id] = {
            ...diaryById,
            date: format(parseISO(diaryById.date), "yyyy-MM-dd"),
          };
          return initialObj;
        }, {}),
      };
      state.allIds = state.allIds.concat(ids);
      state.loading = false;
      state.error = false;
    },
    [fetchDiaryByDate.pending]: (state) => {
      state.loading = true;
    },
    [fetchDiaryByDate.reject]: (state, action) => {
      state.laoding = false;
      state.error = action.payload;
    },
  },
});
