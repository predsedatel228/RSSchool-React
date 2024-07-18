import { createSlice } from '@reduxjs/toolkit';

interface dataPayloadI {
  id: string;
}

const selectedItemsReducer = createSlice({
  name: 'selectedItems',
  initialState: {
    value: [],
  },
  reducers: {
    selectItem(state, action) {
      state.value.push(action.payload as never);
    },
    removeItem(state, action) {
      const arr = state.value as dataPayloadI[];
      const filteredArr = arr.filter(el => el.id !== action.payload) as never[];
      state.value = filteredArr;
    }
  }
});

export const {selectItem, removeItem} = selectedItemsReducer.actions;

export default selectedItemsReducer.reducer;