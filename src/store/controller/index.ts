import { combineReducers } from '@reduxjs/toolkit';
import editorModuleReducer from './editor';
const Reducer = combineReducers({
  ...editorModuleReducer,
});
export default Reducer;
