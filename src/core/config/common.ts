import React, { useEffect, useState } from 'react';
// 公共样式
export const commonStyle: React.CSSProperties = {
  rotate: '0',
  opacity: 1,
};
// 属性
export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
};
/**
 * @description 更具传入的匹配文件目录，可以动态的获取所有的匹配文件
 * @param modules 文件目录
 * @note 此功能是vite自带的，可以通过import.meta.glob来实现，非vite项目想实现此功能，请参考：https://github.com/mrmlnc/fast-glob
 */
export const getModuleData = async <T = any>(
  modules: Record<string, () => Promise<{ [key: string]: any }>>,
) => {
  const arr: T[] = [];
  for (const path in modules) {
    const module = await modules[path]();
    arr.push(module.default);
  }
  return arr;
};
export const componentConfigList = async (
  modules: Record<string, () => Promise<{ [key: string]: any }>>,
) => {
  const baseConfig = (await getModuleData<templateDateInterface>(modules)) || [];
  for (let i = 0, len = baseConfig.length; i < len; i++) {
    const item = baseConfig[i];
    item.style = { ...commonStyle, ...item.style };
    baseConfig[i] = { ...commonAttr, ...item };
  }
  return baseConfig;
};
/**
 * @description 自动获取componentTemplate文件下的config文件，且取出值
 */
export const useGetCopentConfigList = () => {
  const [baseConfigList, setBaseConfigList] = useState<templateDataType[]>([]);
  useEffect(() => {
    const getModuleConfigData = async () => {
      const list = await componentConfigList(
        import.meta.glob('../componentTemplate/base/*/config.ts'),
      );
      setBaseConfigList(list);
    };
    getModuleConfigData();
  }, []);
  return { baseConfigList };
};
