import * as types from '@/redux/constants/actionType';

/**
 * @description 合并component模块的action
 */
export type componentActionMerage =
  | dispatchType<types.addComponent, templateDataType>
  | dispatchType<types.deleteComponent, any[]>;

export const addComponentAction = (data: templateDataType): componentActionMerage => ({
  type: types.addComponent,
  data,
});
