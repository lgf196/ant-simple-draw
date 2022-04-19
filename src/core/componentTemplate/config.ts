import { useEffect, useState, useMemo } from 'react';
import { componentConfigList } from '../config/common';
import pictureGather, { workplace, medical } from '@/assets/data/picture';
import graphicsData, { universal } from '@/assets/data/graphics';
/**
 * @description 自动获取componentTemplate文件下的config文件，且取出值
 */
export const useGetCompentConfigList = () => {
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
      const list = await componentConfigList(
        import.meta.glob('../componentTemplate/text/*/config.ts'),
      );
      setTextConfigList(list);
    };
    // --------------调用--------
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
    () => [...textConfigList, ...baseConfigList, ...workplace, ...medical, ...universal],
    [textConfigList, baseConfigList, workplace, medical, universal],
  );
  return {
    baseConfigList,
    getAllBaseModuleConfigList,
    textConfigList,
    allModuleConfigList,
    pictureGather,
    graphicsData,
  };
};
