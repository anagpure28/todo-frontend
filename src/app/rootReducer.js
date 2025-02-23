import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { authApi } from "../features/api/authApi";
import { taskApi } from "../features/api/taskApi";
// import { authApi } from "@/features/api/authApi";


const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  auth: authReducer,
});

export default rootReducer;