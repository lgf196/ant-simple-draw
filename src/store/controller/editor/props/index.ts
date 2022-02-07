import { PayloadAction } from '@reduxjs/toolkit';
import { componentInitialStateType } from '../component';
export const updateComponentListItem = (state: componentInitialStateType) => {
  for (let index = 0; index < state.componentDataList.length; index++) {
    const item = state.componentDataList[index];
    if (item.componentId === state.curComponent?.componentId) {
      state.componentDataList[index] = state.curComponent!;
      break;
    }
  }
};
export const updateProps = <T = any>(
  state: componentInitialStateType,
  action: PayloadAction<T>,
): void => {
  if (state.curComponent) {
    const old = state.curComponent.propValue;
    state.curComponent.propValue = Object.assign({}, old, action.payload);
    updateComponentListItem(state);
  }
};
