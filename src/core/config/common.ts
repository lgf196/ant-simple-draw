import React from 'react';
// 公共样式
export const commonStyle: React.CSSProperties = {
  rotate: '0deg',
  opacity: 1,
};
// 属性
export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
};
