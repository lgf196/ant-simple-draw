import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { sessionStorage } from '@/utils/storage';
/**
 * @description 全局配置中心
 */
export interface configInitialStateType {
  tabKey: string;
  /**
   * @description 画布的版心
   */
  canvasInformation: whType;
}

const initialState: configInitialStateType = {
  tabKey: '2',
  canvasInformation: {
    width: 1200,
    height: 750,
  },
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

export const saveLocally = () => (dispatch: Dispatch, getState: () => storeType) =>
  Promise.resolve().then(() => {
    if (!getState().component.componentDataList.length) {
      return;
    }
    sessionStorage.setItem('componentDataList', getState().component.componentDataList);
    sessionStorage.setItem('canvasInformation', getState().config.canvasInformation);
  });
export default configSlice.reducer;
