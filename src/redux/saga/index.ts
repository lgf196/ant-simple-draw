import { spawn } from 'redux-saga/effects';
import snapshot from './snapshot';
export default function* rootSaga() {
  yield spawn(snapshot);
}
