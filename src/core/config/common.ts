import { useEffect, useState, useMemo } from 'react';
// 公共样式
export const commonStyle: MergeCSSProperties = {
  rotate: 0,
  opacity: 1,
};
// 默认的编辑类型-form表单类型
export const defaultEditableEl = (
  keySet: string[] = ['w', 'h', 'x', 'y'],
  nameSet: string[] = ['w', 'h', 'x', 'y'],
) => {
  const formDate: FormType[] = [];
  nameSet.forEach((item, index) =>
    formDate.push({ key: keySet[index], name: item, type: 'Number', addonAfter: 'px' }),
  );
  return formDate;
};
// 公共属性默认值==>不是主要的属性，但有时候要用的到
export const commonAttr = {
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
  editableEl: [], // 默认的右侧编辑属性
  groupComponents: [],
  propValue: {
    w: 0,
    h: 0,
    x: 0,
    y: 0,
  },
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
// 添加一些其它的属性和字段
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
export interface getAllConfigListType {
  category: string;
  title: string;
  componentList: templateDataType[];
}
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
  const getAllConfigList = useMemo<getAllConfigListType[]>(() => {
    return [
      {
        category: 'base',
        title: '基础物料',
        componentList: baseConfigList,
      },
      {
        category: 'base',
        title: '基础物料',
        componentList: baseConfigList,
      },
      {
        category: 'base',
        title: '基础物料',
        componentList: baseConfigList,
      },
      {
        category: 'base',
        title: '基础物料',
        componentList: baseConfigList,
      },
      {
        category: 'base',
        title: '基础物料',
        componentList: baseConfigList,
      },
      {
        category: 'base',
        title: '基础物料',
        componentList: baseConfigList,
      },
      {
        category: 'base',
        title: '基础物料',
        componentList: baseConfigList,
      },
      {
        category: 'base',
        title: '基础物料',
        componentList: baseConfigList,
      },
    ];
  }, [baseConfigList]);
  return { baseConfigList, getAllConfigList };
};
