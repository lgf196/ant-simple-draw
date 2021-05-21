import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import "moment/locale/zh-cn";
import locale from "antd/es/locale/zh_CN";
import App from "./app";

ReactDOM.render(
  <ConfigProvider locale={locale}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
);
