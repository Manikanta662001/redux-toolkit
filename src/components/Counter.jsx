import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import { increment,decrement,reset,incrementAsync } from '../store/slices/apiSlice';
function Counter() {
    const dispatch = useDispatch();
    const count = useSelector((state)=>state.apiReducer.count)
  return (
    <div>
        <h5>{count}</h5>
        <button onClick={()=>dispatch(increment())}>+</button>
        <button onClick={()=>dispatch(decrement())}>-</button>
        <button onClick={()=>dispatch(reset())}>reset</button>
        <button onClick={()=>dispatch(incrementAsync())}>+ async</button>
    </div>
  )
}

export default Counter