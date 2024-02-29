import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/slices/apiSlice";

function Apicall() {
  const dispatch = useDispatch();
  const state = useSelector((state) => console.log(state));
  const users = useSelector((state) => state.apiReducer.users);
  return (
    <div>
      <button onClick={() => dispatch(fetchUsers())}>Api Call</button>
      <ul>
        {users?.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default Apicall;
