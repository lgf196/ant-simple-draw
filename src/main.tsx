import 'virtual:svg-icons-register';
import './assets/scss/reset.css';
import './assets/scss/update.antd.css';
import './assets/scss/animate.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
// import store from '@/redux/store';
import store from './store';
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
