import { fetchUsers } from "../thunks/fetchUsersThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false,
  error: "",
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
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
});

export default apiSlice.reducer;
