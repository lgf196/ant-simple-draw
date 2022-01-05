import 'virtual:svg-icons-register';
import './assets/scss/reset.css';
import './assets/scss/update.antd.css';
import './assets/scss/animate.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '@/router';
import store from './store';
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
