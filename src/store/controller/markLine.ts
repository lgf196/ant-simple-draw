import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface markLineDataType<T = boolean> {
  isDownward: T;
  isRightward: T;
}
export interface markLineInitialStateType<K = number> extends markLineDataType {
  timestamp: K;
}
const initialState: markLineInitialStateType = {
  timestamp: -1, // 时间戳，用来监听shape组件拖拽用的回调
  isDownward: false, // true 表示向下移动 false 表示向上移动
  isRightward: false, // true 表示向右移动 false 表示向左移动
};

export const markLineSlice = createSlice({
  name: ' contextMenu',
  initialState,
  reducers: {
    showMarkLineAction: (state, action: PayloadAction<markLineDataType>) => {
      const { isDownward, isRightward } = action.payload;
      state.isDownward = isDownward;
      state.isRightward = isRightward;
      state.timestamp = Date.now();
    },
    hideMarkLineAction: (state) => {
      state.timestamp = -1;
    },
  },
});

export const incrementIfOdd = (amount: any) => (dispatch: any, getState: any) => {
  console.log(`5`, 5);
};

export const { showMarkLineAction, hideMarkLineAction } = markLineSlice.actions;

export default markLineSlice.reducer;
