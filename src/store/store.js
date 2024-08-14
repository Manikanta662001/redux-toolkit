import { combineReducers, configureStore } from "@reduxjs/toolkit";
import apiReducer from "./slices/apiSlice";
import counterReducer from "./slices/counterSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// Combine your reducers
const rootReducer = combineReducers({
  apiReducer,
  counterReducer,
});

// Create a root reducer that resets the state when a RESET action is dispatched
const rootResetReducer = (state, action) => {
  if (action.type === "RESET") {
    state = undefined; // Reset the entire state
  }
  return rootReducer(state, action);
};

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

// Wrap the rootResetReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootResetReducer);
// Create the Redux store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});
export const persistor = persistStore(store);
export default store;
