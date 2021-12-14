import * as types from '@/redux/constants/actionType';
import { composeMenuActionMerage } from '../action/compose';

export interface areaDataType {
  style: MergeCSSProperties;
  components: templateDataType[];
}
export interface composeInitialStateType {
  areaData: areaDataType;
}
const initialState: composeInitialStateType = {
  areaData: {
    // 选中区域包含的组件以及区域位移信息
    style: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
    components: [],
  },
};

export default (state = initialState, action: composeMenuActionMerage): composeInitialStateType => {
  switch (action.type) {
    case types.setAreaData:
      return { ...state, areaData: action.data! };
    case types.areacompose:
      return { ...state };
    default:
      return state;
  }
};
