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
    return {
      ...state,
      counterReducer:undefined,
      apiReducer: undefined, // Reset this part of the state
    };
  }
  return rootReducer(state, action);
};

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["counterReducer"], //to keep counter not to reset
};

// Wrap the rootResetReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootResetReducer);
// Create the Redux store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER",
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});
export const persistor = persistStore(store);
export default store;
