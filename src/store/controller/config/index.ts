import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/**
 * @description 全局配置中心
 */
export interface configInitialStateType {
  tabKey: string;
}

const initialState: configInitialStateType = {
  tabKey: '2',
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setTabKeyAction: (state, action: PayloadAction<string>) => {
      state.tabKey = action.payload;
    },
  },
});

export const { setTabKeyAction } = configSlice.actions;

export default configSlice.reducer;
