import * as types from '@/redux/constants/actionType';

export type snapshotActionMerage =
  | Required<dispatchType<types.snapshotData, templateDataType[]>>
  | Required<dispatchType<types.snapshotIndex, number>>
  | dispatchType<types.undo>;

export const snapshotDataAction = (data: templateDataType[]): snapshotActionMerage => ({
  type: types.snapshotData,
  data,
});

export const snapshotIndexAction = (data: number): snapshotActionMerage => ({
  type: types.snapshotIndex,
  data,
});

export const undoAction = (): snapshotActionMerage => ({
  type: types.undo,
});
