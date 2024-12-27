import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "fetchUsers",
  async (_, { rejectWithValue, getState }) => {
    console.log("GET:::", getState());
    try {
      const apiRes = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!apiRes.ok) {
        throw new Error("There is some Error While Fetching");
      }
      const result = await apiRes.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
