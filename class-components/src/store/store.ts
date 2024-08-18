import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from '@reduxjs/toolkit'
import  countriesReducers from "./countries";
import  dataReducer from "./data";

export default configureStore({
  reducer: {
    countriesSlice: countriesReducers, 
    dataSlice: dataReducer,
  }
});

const rootReducer = combineReducers({})
export type IRootState = ReturnType<typeof rootReducer>