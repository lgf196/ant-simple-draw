import { combineReducers } from 'redux';
import component from './component';
import contextMenu from './contextMenu';
import markLine from './markLine';
import compose from './compose';
const Reducer = combineReducers({
  component,
  contextMenu,
  markLine,
  compose,
});
export default Reducer;
