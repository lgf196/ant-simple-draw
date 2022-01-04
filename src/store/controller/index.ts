import { combineReducers } from '@reduxjs/toolkit';
import editorModuleReducer from './editor';
import configModuleRenducer from './config';
const Reducer = combineReducers({
  ...editorModuleReducer,
  config: configModuleRenducer,
});
export default Reducer;
