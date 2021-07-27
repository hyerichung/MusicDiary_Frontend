import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthCodeAPI, getTokenAPI, getUserInfoAPI } from "../../api";
import * as SecureStore from "expo-secure-store";
import { clearDiary } from "./diarySlice";
import { clearMusicStatus } from "./musicSlice";

export const loginUser = createAsyncThunk(
  "USER/LOGIN_USER",
  async (_, { rejectWithValue }) => {
    try {
      const authCode = await getAuthCodeAPI();
      const { accessToken } = await getTokenAPI(authCode);

      await SecureStore.setItemAsync("accessToken", accessToken);

      const { userInfo } = await getUserInfoAPI(accessToken);
      return { accessToken, userInfo };
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "USER/LOGOUT_USER",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      dispatch(clearDiary());
      dispatch(clearMusicStatus());
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

const initialState = {
  userInfo: {
    id: null,
    email: null,
    userName: null,
  },
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [logoutUser.fulfilled]: (state, action) => {
      state.accessToken = null;
      state.userInfo = initialState.userInfo;
      state.loading = false;
      state.error = false;
    },
    [logoutUser.pending]: (state) => {
      state.loading = true;
    },
    [logoutUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload?.userInfo;
      state.loading = false;
      state.error = false;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
