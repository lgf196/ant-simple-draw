import * as types from '@/redux/constants/actionType';
import { componentActionMerage } from '../action/component';
export interface componentInitialStateType {
  componentDataList: templateDataType[];
  curComponent: templateDataType | null;
}
const initialState: componentInitialStateType = {
  componentDataList: [],
  curComponent: null,
};

export default (state = initialState, action: componentActionMerage) => {
  switch (action.type) {
    case types.addComponent:
      const componentDataList = [...state.componentDataList, action.data];
      return { ...state, componentDataList };
    case types.curComponent:
      return { ...state, curComponent: action.data };
    default:
      return state;
  }
};
