import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false,
  error: "",
  count: 0,
};
const fetchUsersData = async () => {
  const apiRes = await fetch("https://jsonplaceholder.typicode.com/users");
  const result = await apiRes.json();
  return result;
};
const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const result = await fetchUsersData();
  return result;
});
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


export const incrementAsync = (dispatch)=>{
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(increment())
        },2000)
    }
}

export default apiSlice.reducer;
export const { increment, decrement, reset } = apiSlice.actions;
export { fetchUsers };
