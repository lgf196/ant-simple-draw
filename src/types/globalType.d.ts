import React from 'react';
declare global {
  interface templateDataType<T = string, K = unknown> {
    /**
     * @description 类别
     */
    category: T;
    type: T;
    component: T;
    label: T;
    propValue?: K;
    icon?: T;
    style?: React.CSSProperties;
    [par: string]: any;
  }
}
