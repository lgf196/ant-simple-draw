import React, { lazy } from 'react';

/**
 * @description 异步引入组件
 * @param path 路径
 */
export const lazyComponent = (category: string, type: string) => {
  return lazy(() => import(`@/core/componentTemplate/${category}/${type}`));
};
