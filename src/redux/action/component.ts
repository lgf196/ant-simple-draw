import * as types from '@/redux/constants/actionType';

/**
 * @description 合并component模块的action
 */
export type componentActionMerage =
  | dispatchType<types.addComponent, templateDataType>
  | dispatchType<types.isClickComponent, boolean>
  | dispatchType<types.curComponent, templateDataType | null>
  | dispatchType<types.setShapeStyle, React.CSSProperties>;

export const addComponentAction = (data: templateDataType): componentActionMerage => ({
  type: types.addComponent,
  data,
});

export const isClickComponentAction = (data: boolean): componentActionMerage => ({
  type: types.isClickComponent,
  data,
});

export const curComponentAction = (data: templateDataType | null): componentActionMerage => ({
  type: types.curComponent,
  data,
});

export const setShapeStyleAction = (data: React.CSSProperties): componentActionMerage => ({
  type: types.setShapeStyle,
  data,
});
