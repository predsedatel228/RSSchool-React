import { createSlice } from '@reduxjs/toolkit';
import { IForm } from '../types';


const dataReducers = createSlice({
  name: 'data',
  initialState: [] as IForm[],
  reducers: {
    addData(state, action) {
      state.push(action.payload);
    },

  }
});

export const {addData} = dataReducers.actions;

export default dataReducers.reducer;