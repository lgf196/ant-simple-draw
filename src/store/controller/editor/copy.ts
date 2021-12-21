import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface copyInitialStateType {
  copyData: templateDataType | null;
  isCut: boolean;
}
const initialState: copyInitialStateType = {
  copyData: null, // 复制粘贴剪切
  isCut: false,
};

export const copySlice = createSlice({
  name: 'copy',
  initialState,
  reducers: {
    copyAction: (state, action) => {
      console.log(`1`, 1);
    },
    pasteAction: (state) => {
      console.log(`1`, 1);
    },
    cutAction: (state) => {
      console.log(`1`, 1);
    },
  },
});

export const { copyAction, pasteAction, cutAction } = copySlice.actions;

export default copySlice.reducer;
