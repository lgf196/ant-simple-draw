import 'virtual:svg-icons-register';
import './assets/scss/reset.css';
import './assets/scss/update.antd.css';
import './assets/scss/animate.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import locale from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import App from '@/router';
import store from './store';
ReactDOM.render(
  <ConfigProvider locale={locale}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root'),
);
