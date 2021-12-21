import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface componentInitialStateType {
  componentDataList: templateDataType[];
  curComponent: templateDataType | null;
  isClickComponent: boolean;
}

const initialState: componentInitialStateType = {
  componentDataList: [],
  curComponent: null,
  isClickComponent: false,
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
      const newComponentDataList = state.componentDataList.filter(
        (item) => !action.payload.includes(item.componentId!),
      );
      state.componentDataList = newComponentDataList;
    },
    curComponentAction: (state, action: PayloadAction<templateDataType | null>) => {
      state.curComponent = action.payload;
    },
    isClickComponentAction: (state, action: PayloadAction<boolean>) => {
      state.isClickComponent = action.payload;
    },
    setShapeStyleAction: (state, action: PayloadAction<MergeCSSProperties>) => {
      const { width, height, top, left, rotate } = action.payload;
      if (top) state.curComponent!.style!.top = top;
      if (left) state.curComponent!.style!.left = left;
      if (width) state.curComponent!.style!.width = width;
      if (height) state.curComponent!.style!.height = height;
      if (rotate) state.curComponent!.style!.rotate = rotate;
      for (let index = 0; index < state.componentDataList.length; index++) {
        const item = state.componentDataList[index];
        if (item.componentId === state.curComponent?.componentId) {
          state.componentDataList[index] = state.curComponent!;
          break;
        }
      }
    },
  },
});

export const {
  addComponent,
  deleteComponentAction,
  curComponentAction,
  setShapeStyleAction,
  isClickComponentAction,
  setComponentDataListAction,
} = componentSlice.actions;

export default componentSlice.reducer;
