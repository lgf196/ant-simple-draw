import * as types from '@/redux/constants/actionType';

/**
 * @description 合并component模块的action
 */
export type componentActionMerage =
  | dispatchType<types.addComponent, templateDataType>
  | dispatchType<types.curComponent, templateDataType>;

export const addComponentAction = (data: templateDataType): componentActionMerage => ({
  type: types.addComponent,
  data,
});

export const curComponentAction = (data: templateDataType): componentActionMerage => ({
  type: types.curComponent,
  data,
});
