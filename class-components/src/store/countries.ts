import { createSlice } from '@reduxjs/toolkit';
import COUNTRIES_LIST from '../constants/countries';


const countriesReducers = createSlice({
  name: 'countries',
  initialState: COUNTRIES_LIST,
  reducers: {
    changeCountries(state, action) {
      state = action.payload;
    },
    getInitialState(initialState) {
      return initialState;
    }

  }
});

export const {changeCountries, getInitialState} = countriesReducers.actions;

export default countriesReducers.reducer;