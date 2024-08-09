import { combineReducers, configureStore } from "@reduxjs/toolkit";
import apiReducer from "./slices/apiSlice";
const rootReducer = combineReducers({
  apiReducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
