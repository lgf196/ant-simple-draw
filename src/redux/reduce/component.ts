import * as types from '@/redux/constants/actionType';
import { componentActionMerage } from '../action/component';
const initialState = {
  componentDataList: [],
};

export default (state = initialState, action: componentActionMerage) => {
  switch (action.type) {
    case types.addComponent:
      return { ...state, componentDataList: action.data };
    default:
      return state;
  }
};
