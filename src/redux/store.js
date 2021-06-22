import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import logger from "redux-logger";
import { userSlice } from "./slices/userSlice";
import { diarySlice } from "./slices/diarySlice";
import { musicSlice } from "./slices/musicSlice";

const reducer = {
  user: userSlice.reducer,
  diary: diarySlice.reducer,
  music: musicSlice.reducer,
};

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

export { store };
