import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewDiaryAPI,
  fetchDiaryByDateAPI,
  searchTrackAPI,
  addTrackToDiaryAPI,
} from "../../api";
import * as SecureStore from "expo-secure-store";
import { parseISO, format, getMonth, getDate } from "date-fns";

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

export const fetchDiaryByDate = createAsyncThunk(
  "DIARY/FETCH_DIARY_BY_DATE",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");

      const fetchedDiaryByDateInfo = await fetchDiaryByDateAPI({
        accessToken,
        userId,
      });

      return fetchedDiaryByDateInfo;
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
  calendar: { May: Array(31).fill([]), Jun: Array(30).fill([]) },
  visibleDiary: {
    byLocation: [],
  },
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
        [action.payload._id]: { ...action.payload, ...state.byIds },
      };
      state.allIds = [action.payload._id].concat(state.allIds);
      state.loading = false;
      state.error = false;
    },
    [addNewDiary.pending]: (state) => {
      state.loading = true;
    },
    [addNewDiary.rejected]: (state, action) => {
      state.laoding = false;
      state.error = action.payload.message;
    },

    [fetchDiaryByDate.fulfilled]: (state, action) => {
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
    [fetchDiaryByDate.pending]: (state) => {
      state.loading = true;
    },
    [fetchDiaryByDate.rejected]: (state, action) => {
      state.laoding = false;
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
      const month = getMonth(parseISO(action.payload.newTrackInfo.date));
      const date = getDate(parseISO(action.payload.newTrackInfo.date));
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const calendarMonth = months[month];

      state.calendar[calendarMonth][date] = state.calendar[calendarMonth][date].concat([action.payload.newTrackInfo.energy]);

      state.byIds[action.payload.diaryId].playList = [
        ...state.byIds[action.payload.diaryId].playList,
        action.payload.newTrackInfo,
      ];
    },
  },
});

const { clearDiary, getPlayList } = diarySlice.actions;
export { clearDiary, getPlayList };
