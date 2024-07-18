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
    // moveRighPage(state, action) {
    //   console.log(action)
    //   state.value += 1;
    // },
    // moveLeftPage(state, action) {
    //   console.log(action)
    //   state.value -= 1;
    // },
  }
});

export const {/*moveRighPage, moveLeftPage,*/ changePage} = pageReducer.actions;

export default pageReducer.reducer;