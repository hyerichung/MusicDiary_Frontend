import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthCodeAPI, getAccessTokenAPI, getUserInfoAPI } from "../../api";
import * as SecureStore from "expo-secure-store";
import { clearDiary } from "./diarySlice";
import { clearMusicStatus } from "./musicSlice";

export const loginUser = createAsyncThunk(
  "USER/LOGIN_USER",
  async (_, { rejectWithValue }) => {
    try {
      const authCode = await getAuthCodeAPI();
      const { accessToken } = await getAccessTokenAPI(authCode);
      const { userInfo } = await getUserInfoAPI(accessToken);

      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("authCode", authCode);

      return { accessToken, userInfo };
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

export const refreshToken = createAsyncThunk(
  "USER/REFRESH_TOKEN",
  async (_, { rejectWithValue }) => {
    try {
      const authCode = await SecureStore.getItemAsync("authCode");
      const newAccessToken = await getAccessTokenAPI(authCode);

      await SecureStore.setItemAsync("accessToken", newAccessToken);

      return await SecureStore.getItemAsync("accessToken");
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

export const getAccessToken = createAsyncThunk(
  "USER/GET_ACCESSTOKEN",
  async (_, { rejectWithValue }) => {
    try {
      return await SecureStore.getItemAsync("accessToken");
    } catch (err) {
      if (err.status === 401) {
        return await refreshToken();
      }
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
  accessToken: null,
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
      state.accessToken = action.payload?.accessToken;
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
    [getAccessToken.pending]: (state) => {
      state.loading = true;
    },
    [getAccessToken.fulfilled]: (state, action) => {
      state.accessToken = action.payload;
      state.loading = false;
      state.error = false;
    },
    [getAccessToken.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [refreshToken.fulfilled]: (state, action) => {
      state.userInfo.accessToken = action.payload;
    },
    [refreshToken.pending]: (state, action) => {
      state.loading = true;
    },
    [refreshToken.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

const { clearUser } = userSlice.actions;
export { clearUser };
