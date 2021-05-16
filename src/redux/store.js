import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import logger from "redux-logger";
import { userSlice } from "./slices/userSlice";
import { diarySlice } from "./slices/diarySlice";
import { musicSlice } from "./slices/musicSlice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  diary: diarySlice.reducer,
  music: musicSlice.reducer,
});

const middleware = [thunk, logger];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
