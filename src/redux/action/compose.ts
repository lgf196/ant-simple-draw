import * as types from '@/redux/constants/actionType';
import { areaDataType } from '../reduce/compose';

export type composeMenuActionMerage =
  | dispatchType<types.setAreaData, areaDataType>
  | dispatchType<types.areacompose>;

export const setAreaDataAction = (data: areaDataType): composeMenuActionMerage => ({
  type: types.setAreaData,
  data,
});

export const composeAction = (): composeMenuActionMerage => ({
  type: types.areacompose,
});
