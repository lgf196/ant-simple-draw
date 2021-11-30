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

export default (state = initialState, action: Required<componentActionMerage>) => {
  switch (action.type) {
    case types.addComponent:
      const componentDataList = [...state.componentDataList, action.data];
      return { ...state, componentDataList };
    case types.curComponent:
      return { ...state, curComponent: action.data };
    case types.setShapeStyle:
      const { curComponent } = state;
      const { width, height, top, left, rotate } = action.data;
      if (top) curComponent!.style!.top = top;
      if (left) curComponent!.style!.left = left;
      if (width) curComponent!.style!.width = width;
      if (height) curComponent!.style!.height = height;
      if (rotate) curComponent!.style!.rotate = rotate;
      return { ...state, curComponent };
    default:
      return state;
  }
};
