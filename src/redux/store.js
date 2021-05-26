import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import AsyncStorage from "@react-native-async-storage/async-storage";

import thunk from "redux-thunk";
import logger from "redux-logger";
import { userSlice } from "./slices/userSlice";
import { diarySlice } from "./slices/diarySlice";
import { musicSlice } from "./slices/musicSlice";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  diary: diarySlice.reducer,
  music: musicSlice.reducer,
});

const userPersistConfig = {
  key: "user",
  storage: AsyncStorage,
  blacklist: ["status", "error", "accessToken"],
};

const userPersistReducer = persistReducer(userPersistConfig, rootReducer);

const middleware = [thunk, logger];

const store = createStore(
  userPersistReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistedStore = persistStore(store);

export { store, persistedStore };
