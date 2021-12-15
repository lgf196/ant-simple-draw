import * as types from '@/redux/constants/actionType';
import { componentActionMerage } from '../action/component';
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

const setShapeStyleHandle = (state: componentInitialStateType, data: MergeCSSProperties) => {
  const { curComponent } = state;
  const { width, height, top, left, rotate } = data;
  if (top) curComponent!.style!.top = top;
  if (left) curComponent!.style!.left = left;
  if (width) curComponent!.style!.width = width;
  if (height) curComponent!.style!.height = height;
  if (rotate) curComponent!.style!.rotate = rotate;
  return { ...state, curComponent };
};

const deleteComponent = (state: componentInitialStateType, data: string[]) => {
  const { componentDataList } = state;
  const newComponentDataList = componentDataList.filter(
    (item) => !data.includes(item.componentId!),
  );
  return { ...state, componentDataList: newComponentDataList };
};

export default (
  state = initialState,
  action: Required<componentActionMerage>,
): componentInitialStateType => {
  switch (action.type) {
    case types.addComponent:
      const componentDataList = [...state.componentDataList, action.data];
      return { ...state, componentDataList };
    case types.deleteComponent:
      return deleteComponent(state, action.data);
    case types.curComponent:
      return { ...state, curComponent: action.data };
    case types.isClickComponent:
      return { ...state, isClickComponent: action.data };
    case types.setShapeStyle:
      return setShapeStyleHandle(state, action.data);
    case types.setShapeSingleStyle:
      const { key, value } = action.data;
      const setShapeSingleStyle = state.curComponent as any;
      setShapeSingleStyle.style[key] = value;
      return { ...state, curComponent: setShapeSingleStyle };
    default:
      return state;
  }
};
