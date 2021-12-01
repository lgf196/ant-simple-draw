import * as types from '@/redux/constants/actionType';
import { markLineDataType } from '../reduce/markLine';

/**
 * @description 合并showMarkLine模块的action
 */
export type markLineActionMerage =
  | dispatchType<types.showMarkLine, markLineDataType>
  | dispatchType<types.hidewMarkLine>;

export const showMarkLineAction = (data: markLineDataType): markLineActionMerage => ({
  type: types.showMarkLine,
  data,
});

export const hideMarkLineAction = (): markLineActionMerage => ({
  type: types.hidewMarkLine,
});
