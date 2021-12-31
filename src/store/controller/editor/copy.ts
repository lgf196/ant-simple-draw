import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { showContextMenuDataType } from './contextMenu';
import { getRandomStr } from '@/utils';
import { addComponent, curComponentAction, deleteComponentAction } from './component';
export interface copyInitialStateType {
  copyData: templateDataType | null;
  isCut: boolean;
}
export interface pasteActionType extends showContextMenuDataType {
  isContextMenuMouse: boolean;
}
const initialState: copyInitialStateType = {
  copyData: null, // 复制粘贴剪切
  isCut: false,
};

export const copySlice = createSlice({
  name: 'copys',
  initialState,
  reducers: {
    copyAction: (state, action: PayloadAction<templateDataType>) => {
      state.copyData = action.payload;
      state.isCut = false;
    },
    pasteAction: (state, action: PayloadAction<pasteActionType>) => {
      const { isContextMenuMouse, top, left } = action.payload;
      if (state.copyData) {
        if (isContextMenuMouse) {
          state.copyData.style.top = top;
          state.copyData.style.left = left;
        } else {
          state.copyData.style.top += 10;
          state.copyData.style.left += 10;
        }
        state.copyData.componentId = getRandomStr();
        // Group 的子组件根节点的 componentId 是通过组件的 componentId 生成的，必须重新生成 componentId，否则拆分 Group 的时候获取根节点不正确
        if (state.copyData.component === 'Group') {
          state.copyData.groupComponents!.forEach((item: templateDataType) => {
            item.componentId = getRandomStr();
          });
        }
      }
    },
    cutAction: (state) => {
      state.copyData!.componentId = getRandomStr();
    },
    changeCutStatusAction: (state, actions: PayloadAction<boolean>) => {
      state.isCut = actions.payload;
    },
    changeCopyDataAction: (state, actions: PayloadAction<templateDataType | null>) => {
      state.copyData = actions.payload;
    },
  },
});

export const { copyAction, pasteAction, cutAction, changeCutStatusAction, changeCopyDataAction } =
  copySlice.actions;

export const copy = () => (dispatch: Dispatch, getState: () => storeType) => {
  const { component } = getState();
  if (component.curComponent) {
    dispatch(copyAction(component.curComponent));
  }
};

export const paste =
  (isContextMenuMouse: boolean) => (dispatch: Dispatch, getState: () => storeType) => {
    if (!getState().copys.copyData!) {
      return;
    }
    dispatch(
      pasteAction({
        isContextMenuMouse,
        top: getState().contextMenu.top,
        left: getState().contextMenu.left,
      }),
    );
    dispatch(addComponent(getState().copys.copyData!));
    if (getState().copys.isCut) {
      // 要清空
      dispatch(changeCopyDataAction(null));
      dispatch(changeCutStatusAction(false));
    }
  };

export const cut = () => (dispatch: Dispatch<any>, getState: () => storeType) => {
  if (!getState().component.curComponent) {
    return;
  }
  dispatch(copy());
  dispatch(deleteComponentAction([getState().component.curComponent?.componentId!]));
  dispatch(changeCutStatusAction(true));
  // 防止多次剪切操作，导致触发剪贴功能
  dispatch(curComponentAction(null));
};
export default copySlice.reducer;
