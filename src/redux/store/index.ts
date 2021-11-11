import { createStore, compose } from 'redux';
import reducer from '@/redux/reduce';
import { environmentVariable } from '@/utils';

const tools =
  environmentVariable() === 'dev'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

let store = createStore(reducer, tools());

export default store;
