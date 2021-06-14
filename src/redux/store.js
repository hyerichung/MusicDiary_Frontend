import AsyncStorage from "@react-native-async-storage/async-storage";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import logger from "redux-logger";
import { userSlice } from "./slices/userSlice";
import { diarySlice } from "./slices/diarySlice";
import { musicSlice } from "./slices/musicSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const userPersistConfig = {
  key: "user",
  storage: AsyncStorage,
  blacklist: ["status", "error", "accessToken"],
};

const musicPersistConfig = {
  key: "music",
  storage: AsyncStorage,
  blacklist: ["playList"],
};

const reducer = {
  user: persistReducer(userPersistConfig, userSlice.reducer),
  diary: diarySlice.reducer,
  music: persistReducer(musicPersistConfig, musicSlice.reducer),
};

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];

const store = configureStore({
  reducer,
  middleware,
});

const persistedStore = persistStore(store);

export { store, persistedStore };
