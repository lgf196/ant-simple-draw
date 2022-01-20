import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { sessionStorage } from '@/utils/storage';
import { message } from 'antd';
/**
 * @description 全局配置中心
 */
export interface configInitialStateType {
  /**
   * @description 画布的版心
   */
  canvasInformation: whType;
  /**
   * @description 画布的编辑配置项
   */
  canvasEditableEl: FormType[];
  /**
   *  @description 是否开启禅模式
   */
  zenMode: boolean;
}

const initialState: configInitialStateType = {
  zenMode: false,
  canvasInformation: {
    width: 1200,
    height: 750,
  },
  canvasEditableEl: [
    {
      type: 'Number',
      name: '宽',
      key: 'width',
      col: 12,
    },
    {
      type: 'Number',
      name: '高',
      key: 'height',
      col: 12,
    },
  ],
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setCanvasInformationAction: (state, action: PayloadAction<whType>) => {
      state.canvasInformation = action.payload;
    },
    zenModeAction: (state) => {
      state.zenMode = !state.zenMode;
      message.success(state.zenMode ? '禅模式开启' : '禅模式关闭');
    },
  },
});

export const { setCanvasInformationAction, zenModeAction } = configSlice.actions;

export const saveLocally = () => (dispatch: Dispatch, getState: () => storeType) =>
  Promise.resolve().then(() => {
    if (!getState().component.componentDataList.length) {
      return;
    }
    sessionStorage.setItem('componentDataList', getState().component.componentDataList);
    sessionStorage.setItem('canvasInformation', getState().config.canvasInformation);
  });
export default configSlice.reducer;
