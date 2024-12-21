import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
  incrementAsync,
} from "../store/slices/counterSlice";
import { persistor } from "../store/store";
function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counterReducer?.count);
  
  const handleReset = ()=>{
    dispatch({type:"RESET"});
    persistor.purge();
  }
  return (
    <div>
      <h5>{count}</h5>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>reset</button>
      <button onClick={() => dispatch(incrementAsync())}>+ async</button>
      <button onClick={() => window.location.reload()}>Reload</button>
      <button onClick={() => handleReset()}>Empty Store</button>
    </div>
  );
}

export default Counter;
