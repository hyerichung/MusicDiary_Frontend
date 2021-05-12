import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthCodeAPI, getAccessTokenAPI } from "../../api/index";
import * as SecureStore from "expo-secure-store";

export const loginUser = createAsyncThunk("USER/LOGIN_USER", async () => {
  try {
    const authCode = await getAuthCodeAPI();
    const { accessToken } = await getAccessTokenAPI(authCode);

    await SecureStore.setItemAsync("accessToken", accessToken);

    return accessToken;
  } catch (err) {
    console.error(err);
  }
});

const initialState = {
  email: "",
  userName: "",
  privateDiaryList: [],
  accessToken: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.accessToken = action.payload;
      // TODO: create userData
      // state.email = action.payload.email;
      // state.userName = action.payload.userName;
      state.loading = false;
      state.error = false;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.reject]: (state, action) => {
      state.laoding = false;
      state.error = action.payload;
    },
  },
});

export default userSlice;
