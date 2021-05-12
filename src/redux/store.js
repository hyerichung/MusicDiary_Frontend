import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { userSlice } from "./slices/userSlice";

const rootReducer = {
  user: userSlice.reducer,
};

const middleware = [thunk, logger];

const store = createStore(
  rootReducer.user,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
