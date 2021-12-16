import * as types from '@/redux/constants/actionType';
import { snapshotActionMerage } from '../action/snapshot';

export interface snapshotInitialStateType {
  snapshotData: templateDataType[];
  snapshotIndex: number;
}
const initialState: snapshotInitialStateType = {
  snapshotData: [],
  snapshotIndex: -1,
};

export default (state = initialState, action: snapshotActionMerage): snapshotInitialStateType => {
  switch (action.type) {
    case types.snapshotData:
      return { ...state, snapshotData: action.data };
    case types.snapshotIndex:
      return { ...state, snapshotIndex: action.data };
    default:
      return state;
  }
};
