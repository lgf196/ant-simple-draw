import { createSlice, PayloadAction, Dispatch, createAction } from '@reduxjs/toolkit';
import { updateComponentListValue, updateProps } from './props';
export const getNotIncludedCurComponentHandle = createAction('getNotIncludedCurComponentHandle');
export interface componentInitialStateType {
  componentDataList: templateDataType[];
  curComponent: templateDataType | null;
  isClickComponent: boolean;
  curComponentIndex: number;
}

const initialState: componentInitialStateType = {
  componentDataList: [],
  curComponent: null,
  isClickComponent: false,
  curComponentIndex: 0,
};

export const componentSlice = createSlice({
  name: 'component',
  initialState,
  reducers: {
    addComponent: (state, action: PayloadAction<templateDataType>) => {
      state.componentDataList.push(action.payload);
    },
    setComponentDataListAction: (state, action: PayloadAction<templateDataType[]>) => {
      state.componentDataList = action.payload;
    },
    deleteComponentAction: (state, action: PayloadAction<string[]>) => {
      state.curComponent = null;
      if (action.payload.includes('clearAll')) {
        state.componentDataList = [];
        return;
      }
      const newComponentDataList = state.componentDataList.filter(
        (item) => !action.payload.includes(item.componentId!),
      );
      state.componentDataList = newComponentDataList;
    },
    curComponentAction: (state, action: PayloadAction<templateDataType | null>) => {
      state.curComponent = action.payload;
      state.curComponentIndex = state.componentDataList.findIndex(
        (item) => item.componentId === state.curComponent?.componentId,
      );
    },
    isClickComponentAction: (state, action: PayloadAction<boolean>) => {
      state.isClickComponent = action.payload;
    },
    setShapeStyleAction: (state, action: PayloadAction<MergeCSSProperties>) => {
      const { width, height, top, left, rotate } = action.payload;
      if (top) {
        state.curComponent!.style!.top = parseInt(top);
        state.curComponent!.propValue.y = parseInt(top);
      }
      if (left) {
        state.curComponent!.style!.left = parseInt(left);
        state.curComponent!.propValue.x = parseInt(left);
      }
      if (width) {
        state.curComponent!.style!.width = parseInt(width);
        state.curComponent!.propValue.w = parseInt(width);
      }
      if (height) {
        state.curComponent!.style!.height = parseInt(height);
        state.curComponent!.propValue.h = parseInt(height);
      }
      if (rotate) state.curComponent!.style!.rotate = rotate;
      updateComponentListValue(state);
    },
    updatePropsAction: updateProps,
    topComponentAction: (state) => {
      // 图层置顶
      state.componentDataList.push(state.curComponent!);
    },
    bottomComponentAction: (state) => {
      // 图层置底
      state.componentDataList.unshift(state.curComponent!);
    },
    upDownHandle: (
      state,
      action: PayloadAction<{ curComponentIndex: number; displacementIndex: number }>,
    ) => {
      const { curComponentIndex, displacementIndex } = action.payload;
      // 前一个数据和后一个数据交互，类似于交换排序算法
      const temp = state.componentDataList[curComponentIndex];
      state.componentDataList[curComponentIndex] = state.componentDataList[displacementIndex];
      state.componentDataList[displacementIndex] = temp;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotIncludedCurComponentHandle, (state) => {
      state.componentDataList = state.componentDataList.filter(
        (item) => item.componentId !== state.curComponent?.componentId,
      );
    });
  },
});

export const {
  addComponent,
  deleteComponentAction,
  curComponentAction,
  setShapeStyleAction,
  updatePropsAction,
  isClickComponentAction,
  setComponentDataListAction,
  topComponentAction,
  bottomComponentAction,
  upDownHandle,
} = componentSlice.actions;

export const upComponentAction = () => (dispatch: Dispatch, getState: () => storeType) => {
  const { curComponentIndex, componentDataList } = getState().component;
  // 上移图层 当前index，表示元素在数组中越往后
  if (curComponentIndex < componentDataList.length - 1) {
    dispatch(
      upDownHandle({
        curComponentIndex,
        displacementIndex: curComponentIndex + 1,
      }),
    );
  }
};
export const downComponentAction = () => (dispatch: Dispatch, getState: () => storeType) => {
  // 下移图层 index，表示元素在数组中越往前
  const { curComponentIndex } = getState().component;
  if (curComponentIndex > 0) {
    dispatch(
      upDownHandle({
        curComponentIndex: curComponentIndex,
        displacementIndex: curComponentIndex - 1,
      }),
    );
  }
};
export default componentSlice.reducer;
