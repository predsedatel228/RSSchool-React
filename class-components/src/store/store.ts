import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pageReducer";
import { combineReducers } from '@reduxjs/toolkit'
import selectedItemsReducer from "./selectedItemsReducer";


export default configureStore({
  reducer: {
    pageSlice: pageReducer,
    selectedItems: selectedItemsReducer,
  }
});

const rootReducer = combineReducers({})
export type IRootState = ReturnType<typeof rootReducer>