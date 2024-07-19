import { createSlice } from '@reduxjs/toolkit';

const pageReducer = createSlice({
  name: 'page',
  initialState: {
    value: 1,
  },
  reducers: {
    changePage(state, action) {
      state.value = action.payload;
    },
  }
});

export const {changePage} = pageReducer.actions;

export default pageReducer.reducer;