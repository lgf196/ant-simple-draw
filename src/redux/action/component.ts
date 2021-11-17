import * as types from '@/redux/constants/actionType';

/**
 * @description 合并component模块的action
 */
export type componentActionMerage =
  | dispatchType<types.addComponent, templateDataType>
  | dispatchType<types.curComponent, templateDataType>
  | dispatchType<types.setShapeStyle, React.CSSProperties>;

export const addComponentAction = (data: templateDataType): componentActionMerage => ({
  type: types.addComponent,
  data,
});

export const curComponentAction = (data: templateDataType): componentActionMerage => ({
  type: types.curComponent,
  data,
});

export const setShapeStyleAction = (data: React.CSSProperties): componentActionMerage => ({
  type: types.setShapeStyle,
  data,
});
