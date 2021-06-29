import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDiariesAPI,
  addNewDiaryAPI,
  searchTrackAPI,
  addTrackToDiaryAPI,
} from "../../api";
import * as SecureStore from "expo-secure-store";
import changeDateFormat from "../../utils/changeDateFormat";

export const addNewDiary = createAsyncThunk(
  "DIARY/ADD_DIARY",
  async ({ newDiaryInfo, userId }, { rejectWithValue }) => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");

      const newDiary = await addNewDiaryAPI({
        accessToken,
        newDiaryInfo,
        userId,
      });

      return newDiary;
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

export const fetchDiaries = createAsyncThunk(
  "DIARY/FETCH_DIARY",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");

      const fetchedDiaries = await fetchDiariesAPI({
        accessToken,
        userId,
      });

      // const dateFormattedData = fetchedDiaryByDateInfo.diaryByDate.map((diary) => {
      //   return {
      //     ...diary,
      //     date: changeDateFormat(diary.date),
      //   };
      // });

      console.log(fetchedDiaries, "33");

      return fetchedDiaries;
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

export const searchTrack = createAsyncThunk(
  "TRACK/FETCH_SEARCH_TRACK",
  async ({ userId, diaryId, searchInput }, { rejectWithValue }) => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");

      const tempSearchTracksResult = await searchTrackAPI({
        accessToken,
        userId,
        diaryId,
        searchInput,
      });

      return tempSearchTracksResult;
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

export const addTrackToDiary = createAsyncThunk(
  "DIARY/ADD_TRACK_TO_DIARY",
  async ({ userId, diaryId, trackInfo }, { rejectWithValue }) => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");

      const { newTrackInfo } = await addTrackToDiaryAPI({
        accessToken,
        userId,
        diaryId,
        trackInfo,
      });

      return { newTrackInfo, diaryId };
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

const initialState = {
  byIds: {},
  allIds: [],
  loading: false,
  error: null,
};

export const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    clearDiary: (state, action) => {
      return initialState;
    },
    getPlayList: (state, action) => {
      return state.byIds[action.payload].playList;
    },
  },
  extraReducers: {
    [addNewDiary.fulfilled]: (state, action) => {
      state.byIds = {
        ...state.byIds,
        [action.payload._id]: action.payload,
      };
      state.allIds = [action.payload._id].concat(state.allIds);
      state.loading = false;
      state.error = false;
    },
    [addNewDiary.pending]: (state) => {
      state.loading = true;
    },
    [addNewDiary.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [fetchDiaries.fulfilled]: (state, action) => {
      console.log(action, "action");
      const ids = action.payload?.map((diary) => diary._id);

      state.byIds = {
        ...action.payload?.reduce((initialObj, diaryById) => {
          initialObj[diaryById._id] = diaryById;
          return initialObj;
        }, {}),
      };
      state.allIds = ids;
      state.loading = false;
      state.error = false;
    },
    [fetchDiaries.pending]: (state) => {
      state.loading = true;
    },
    [fetchDiaries.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [addTrackToDiary.pending]: (state) => {
      state.loading = true;
    },
    [addTrackToDiary.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [addTrackToDiary.fulfilled]: (state, action) => {
      state.byIds[action.payload.diaryId].playList = [
        ...state.byIds[action.payload.diaryId].playList,
        action.payload.newTrackInfo,
      ];
    },
  },
});

const { clearDiary, getPlayList } = diarySlice.actions;
export { clearDiary, getPlayList };
