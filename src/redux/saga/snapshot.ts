import { put, takeEvery, call, takeLatest, race, delay, all, select } from 'redux-saga/effects';
import * as types from '@/redux/constants/actionType';
import { snapshotActionMerage, snapshotDataAction, snapshotIndexAction } from '../action/snapshot';
import { snapshotInitialStateType } from '../reduce/snapshot';
import { deepCopy } from '@/utils';
import { componentInitialStateType } from '../reduce/component';
export const effects = {
  *undo(actions: snapshotActionMerage) {
    console.log(`3333`, 3333);
  },
  *redo() {
    console.log(`2`, 3333);
  },
  *recordSnapshot() {
    // 添加新的快照
    const res: snapshotInitialStateType = yield select((state: storeType) => state.snapshot);
    const component: componentInitialStateType = yield select(
      (state: storeType) => state.component,
    );
    // yield put(snapshotIndexAction(++res.snapshotIndex));
    // res.snapshotData[res.snapshotIndex] = deepCopy(component.componentDataList);
    // yield put(snapshotDataAction(res.snapshotData));
    // console.log(`5`, res.snapshotIndex, res.snapshotData);
  },
};

export default function* snapshot() {
  yield takeEvery(types.undo, effects.undo);
  yield takeEvery(types.redo, effects.redo);
  yield takeEvery(types.recordSnapshot, effects.recordSnapshot);
}
