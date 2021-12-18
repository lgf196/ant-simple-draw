import { put, takeEvery, call, takeLatest, race, delay, all, select } from 'redux-saga/effects';
import * as types from '@/redux/constants/actionType';
import { snapshotActionMerage, snapshotIndexAction } from '../action/snapshot';
import { snapshotInitialStateType } from '../reduce/snapshot';
export const effects = {
  *undo(actions: snapshotActionMerage) {
    const res: snapshotInitialStateType = yield select((state: storeType) => state.snapshot);
    yield put(snapshotIndexAction(++res.snapshotIndex));
    console.log(`5`, res.snapshotIndex);
  },
  *redo() {
    console.log(`2`, 3333);
  },
  *recordSnapshot() {
    // 添加新的快照
    const getStore = (state: storeType) => state.snapshot;
    const cart: snapshotInitialStateType = yield select(getStore);
    //  yield put(snapshotIndexAction());
    console.log(`5`, 3333);
  },
};

export default function* snapshot() {
  yield takeEvery(types.undo, effects.undo);
  yield takeEvery(types.redo, effects.redo);
  yield takeEvery(types.recordSnapshot, effects.recordSnapshot);
}
