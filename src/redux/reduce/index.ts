import { combineReducers } from 'redux';
import component from './component';
import contextMenu from './contextMenu';
const Reducer = combineReducers({
  component,
  contextMenu,
});
export default Reducer;
