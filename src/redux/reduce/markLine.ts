import * as types from '@/redux/constants/actionType';
import { markLineActionMerage } from '../action/markLine';

export interface markLineDataType<T = boolean> {
  isDownward: T;
  isRightward: T;
}
export interface markLineInitialStateType<K = number> extends markLineDataType {
  timestamp: K;
}
const initialState: markLineInitialStateType = {
  timestamp: 0, // 时间戳，用来监听shape组件拖拽用的回调
  isDownward: false, // true 表示向下移动 false 表示向上移动
  isRightward: false, // true 表示向右移动 false 表示向左移动
};

export default (state = initialState, action: markLineActionMerage): markLineInitialStateType => {
  switch (action.type) {
    case types.showMarkLine:
      const showData = Object.assign({}, action.data, { timestamp: Date.now() });
      return { ...state, ...showData };
    case types.hidewMarkLine:
      return { ...state, timestamp: -1 };
    default:
      return state;
  }
};
