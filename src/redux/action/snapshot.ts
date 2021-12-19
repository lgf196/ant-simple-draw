import * as types from '@/redux/constants/actionType';

export type snapshotActionMerage =
  | Required<dispatchType<types.snapshotData, any[]>>
  | Required<dispatchType<types.snapshotIndex, number>>
  | dispatchType<types.undo>
  | dispatchType<types.redo>
  | dispatchType<types.recordSnapshot>;

export const snapshotDataAction = (data: any[]): snapshotActionMerage => ({
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
export const redoAction = (): snapshotActionMerage => ({
  type: types.redo,
});
export const recordSnapshotAction = (): snapshotActionMerage => ({
  type: types.recordSnapshot,
});
