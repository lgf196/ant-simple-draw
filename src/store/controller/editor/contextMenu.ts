import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface showContextMenuDataType<T = number> {
  top: T;
  left: T;
}
export interface contextMenuInitialStateType<K = boolean> extends showContextMenuDataType {
  menuShow: K;
}
const initialState: contextMenuInitialStateType = {
  top: 0,
  left: 0,
  menuShow: false,
};

export const contextMenuSlice = createSlice({
  name: 'contextMenu',
  initialState,
  reducers: {
    showContextMenuAction: (state, action: PayloadAction<showContextMenuDataType>) => {
      const { left, top } = action.payload;
      state.top = top;
      state.left = left;
      state.menuShow = true;
    },
    hideContextMenuAction: (state) => {
      state.menuShow = false;
    },
  },
});

export const { showContextMenuAction, hideContextMenuAction } = contextMenuSlice.actions;

export default contextMenuSlice.reducer;
