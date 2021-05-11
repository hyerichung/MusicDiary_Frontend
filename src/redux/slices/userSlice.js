import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "../../api/index";

export const loginUser = createAsyncThunk("user/loginUser", async () => {
  try {
    const result = await loginAPI();

    return result;
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
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.loading = false;
      state.error = false;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.laoding = false;
      state.error = action.payload;
    },
  },
});

export default userSlice;
