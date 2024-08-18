import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from '@reduxjs/toolkit'
import  countriesReducers from "./countries";


export default configureStore({
  reducer: {
    countriesSlice: countriesReducers, 
  }
});

const rootReducer = combineReducers({})
export type IRootState = ReturnType<typeof rootReducer>