import * as types from '@/redux/constants/actionType';

export type snapshotActionMerage =
  | Required<dispatchType<types.snapshotData, templateDataType[]>>
  | Required<dispatchType<types.snapshotIndex, number>>;

export const snapshotDataAction = (data: templateDataType[]): snapshotActionMerage => ({
  type: types.snapshotData,
  data,
});

export const hideMarkLineAction = (data: number): snapshotActionMerage => ({
  type: types.snapshotIndex,
  data,
});
