import { combineReducers } from 'redux';
import component from './component';
import contextMenu from './contextMenu';
import markLine from './markLine';
import compose from './compose';
import snapshot from './snapshot';
const Reducer = combineReducers({
  component,
  contextMenu,
  markLine,
  compose,
  snapshot,
});
export default Reducer;
