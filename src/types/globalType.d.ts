import React from 'react';
import { componentInitialStateType } from '@/redux/reduce/component';
declare global {
  /* eslint-disable */
  interface templateDateInterface<T = string, K = unknown> {
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
  }
  interface templateDataType extends templateDateInterface {
    [par: string]: any;
  }
  interface storeType {
    component: componentInitialStateType;
  }
}
