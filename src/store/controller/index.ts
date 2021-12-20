import { combineReducers } from '@reduxjs/toolkit';
import component from './component';
import contextMenu from './contextMenu';
import markLine from './markLine';
const Reducer = combineReducers({
  component,
  contextMenu,
  markLine,
});
export default Reducer;
