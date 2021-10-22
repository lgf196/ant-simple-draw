import React from 'react';
declare global {
  /* eslint-disable */
  interface templateDataType<T = string, K = unknown> {
    /**
     * @description 类别
     */
    category: T;
    /**
     * @description 类别模块中的类型
     */
    type: T;
    id: T;
    component: T;
    label: T;
    propValue?: K;
    icon?: T;
    style?: React.CSSProperties;
    [par: string]: any;
  }
}
