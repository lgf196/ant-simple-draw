import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '@/redux/reduce';
import { environmentVariable } from '@/utils';
import rootSaga from '@/redux/saga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const tools =
  environmentVariable() === 'dev'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const enhancer = tools(applyMiddleware(...middlewares));

let store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);
export default store;
