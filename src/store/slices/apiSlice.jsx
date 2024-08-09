import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false,
  error: "",
  count: 0,
};
const fetchUsers = createAsyncThunk(
  "fetchUsers",
  async (_, { rejectWithValue }) => {
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
  reducers: {
    increment: (state) => {
      return { ...state, count: state.count + 1 };
    },
    decrement: (state) => {
      return { ...state, count: state.count - 1 };
    },
    reset: (state) => {
      return { ...state, count: state.count - state.count };
    },
  },
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

export const incrementAsync = (dispatch) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, 2000);
  };
};

export default apiSlice.reducer;
export const { increment, decrement, reset } = apiSlice.actions;
export { fetchUsers };
