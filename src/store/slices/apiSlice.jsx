import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false,
  error: "",
};
const fetchUsers = createAsyncThunk(
  "fetchUsers",
  async (_, { rejectWithValue, getState }) => {
    console.log('GET:::',getState())
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
export { fetchUsers };
