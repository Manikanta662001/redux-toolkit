import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
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
});

export const incrementAsync = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, 2000);
  };
};

export default counterSlice.reducer;
export const { increment, decrement, reset } = counterSlice.actions;
