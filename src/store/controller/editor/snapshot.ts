import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { curComponentAction, setComponentDataListAction } from './component';
export interface snapshotInitialStateType {
  snapshotData: templateDataType[][];
  snapshotIndex: number;
}
const initialState: snapshotInitialStateType = {
  snapshotData: [], // 编辑器快照数据
  snapshotIndex: -1, // 快照索引
};

export const snapshotSlice = createSlice({
  name: 'snapshot',
  initialState,
  reducers: {
    undoAction: (state) => {
      state.snapshotIndex--;
    },
    redoAction: (state) => {
      state.snapshotIndex++;
    },
    recordSnapshotAction: (state, actions: PayloadAction<templateDataType[]>) => {
      state.snapshotData[++state.snapshotIndex] = actions.payload;
      // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex + 1);
      }
    },
  },
});

export const { undoAction, redoAction, recordSnapshotAction } = snapshotSlice.actions;

export const recordSnapshot = () => (dispatch: Dispatch, getState: () => storeType) => {
  const { component } = getState();
  dispatch(recordSnapshotAction(component.componentDataList));
};

export const undo = () => (dispatch: Dispatch, getState: () => storeType) => {
  if (getState().snapshot.snapshotIndex >= 0) {
    dispatch(undoAction());
    const componentData: templateDataType[] =
      getState().snapshot.snapshotData[getState().snapshot.snapshotIndex] || [];
    if (getState().component.curComponent) {
      // 如果当前组件不在 componentData 中，则置空
      let needClean = !componentData.find(
        (item) => getState().component.curComponent?.componentId === item.componentId,
      );
      if (needClean) {
        dispatch(curComponentAction(null));
      }
    }
    dispatch(setComponentDataListAction(componentData));
  }
};

export const redo = () => (dispatch: Dispatch, getState: () => storeType) => {
  if (getState().snapshot.snapshotIndex < getState().snapshot.snapshotData.length - 1) {
    dispatch(redoAction());
    dispatch(
      setComponentDataListAction(
        getState().snapshot.snapshotData[getState().snapshot.snapshotIndex],
      ),
    );
  }
};

export default snapshotSlice.reducer;
