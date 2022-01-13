import { useEffect, useState, useMemo } from 'react';
import { componentConfigList, getAllConfigListType } from '../config/common';
export const useGetCopentConfigList = () => {
  const [baseConfigList, setBaseConfigList] = useState<templateDataType[]>([]);
  const [textConfigList, setTextConfigList] = useState<templateDataType[]>([]);
  useEffect(() => {
    /**
     * @description base模块
     */
    const getBaseModuleConfigData = async () => {
      const list = await componentConfigList(
        import.meta.glob('../componentTemplate/base/*/config.ts'),
      );
      setBaseConfigList(list);
    };
    /**
     * @description text模块
     */
    const getTextModuleConfigData = async () => {
      const lists = await componentConfigList(
        import.meta.glob('../componentTemplate/text/*/config.ts'),
      );
      console.log(`lists`, lists);
      setTextConfigList(lists);
    };
    getBaseModuleConfigData();
    getTextModuleConfigData();
  }, []);
  /**
   * @description 二级base模块，多个
   */
  const getAllBaseModuleConfigList = useMemo<getAllConfigListType[]>(() => {
    return [
      {
        category: 'base',
        title: '表格',
        componentList: baseConfigList,
      },
      {
        category: 'base',
        title: '天气',
        componentList: baseConfigList,
      },
      {
        category: 'base',
        title: '人物',
        componentList: baseConfigList,
      },
      {
        category: 'base',
        title: '没好',
        componentList: baseConfigList,
      },
      {
        category: 'base',
        title: '元素的',
        componentList: baseConfigList,
      },
      {
        category: 'base',
        title: '我好的',
        componentList: baseConfigList,
      },
      {
        category: 'base',
        title: '是的呀',
        componentList: baseConfigList,
      },
      {
        category: 'base',
        title: '不是的',
        componentList: baseConfigList,
      },
    ];
  }, [baseConfigList]);
  /**
   * @description 得到所有的组件的配置文件值
   */
  const allModuleConfigList = useMemo(
    () => [...textConfigList, ...baseConfigList],
    [textConfigList, baseConfigList],
  );
  return { baseConfigList, getAllBaseModuleConfigList, textConfigList, allModuleConfigList };
};
