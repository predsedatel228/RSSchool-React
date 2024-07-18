import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./slice";
import { combineReducers } from '@reduxjs/toolkit'


export default configureStore({
  reducer: {
    pageSlice: pageReducer,
  }
});

const rootReducer = combineReducers({})
export type IRootState = ReturnType<typeof rootReducer>