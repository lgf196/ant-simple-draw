import { put, takeEvery, call, takeLatest, race, delay, all } from 'redux-saga/effects';

export const effects = {
  *undo() {
    console.log(`3333`, 3333);
  },
};

export default function* snapshot() {
  yield takeEvery('ee', effects.undo);
}
