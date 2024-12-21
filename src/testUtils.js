import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { fetchUsers } from "./store/thunks/fetchUsersThunk";
import counterReducer from "./store/slices/counterSlice";
import apiReducer from "./store/slices/apiSlice";
import { render } from "@testing-library/react";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { Provider } from "react-redux";

export const renderWithProvider = (
  ui,
  preloadedState = {},
  customReducers = {}
) => {
  const rootReducer = combineReducers({
    apiReducer,
    counterReducer,
    ...customReducers,
  });
  const rootResetReducer = (state, action) => {
    if (action.type === "RESET") {
      return {
        ...state,
        counterReducer: undefined,
        apiReducer: undefined, // Reset this part of the state
      };
    }
    return rootReducer(state, action);
  };
  const persistConfig = {
    key: "root",
    storage,
    whitelist: ["counterReducer"],
  };

  const persistedReducer = persistReducer(persistConfig, rootResetReducer);

  const store = configureStore({
    reducer: persistedReducer,
    extraReducers: (builder) => {
      builder.addCase(fetchUsers.pending, (state) => {
        return { ...state, isLoading: true };
      });
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        return { ...state, isLoading: false, users: action.payload };
      });
      builder.addCase(fetchUsers.rejected, (state, action) => {
        return { ...state, isLoading: false, error: action.payload };
      });
    },
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
    preloadedState,
    devTools: true,
  });
  if (ui === undefined) return store;
  return { ...render(<Provider store={store}>{ui}</Provider>), store };
};
