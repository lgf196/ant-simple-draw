import { useEffect, useState, useMemo } from 'react';
import { componentConfigList } from '../config/common';
import { ImageConfig } from './picture/Image/config';
/**
 * @description 自动获取componentTemplate文件下的config文件，且取出值
 */
export interface getAllConfigListType {
  category: string;
  title: string;
  componentList: templateDataType[];
}
export const useGetCompentConfigList = () => {
  const [baseConfigList, setBaseConfigList] = useState<templateDataType[]>([]);
  const [textConfigList, setTextConfigList] = useState<templateDataType[]>([]);
  const [pictureConfigList, setPictureConfigList] = useState<templateDataType[]>([
    ImageConfig(
      '1',
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      {
        w: 100,
        h: 100,
      },
    ),
    ImageConfig('2', 'https://i.ibb.co/377K3nW/20200108-213753-A9-TH8.jpg', { w: 100, h: 100 }),
    ImageConfig(
      '3',
      'https://gd-filems.dancf.com/gaoding/gaoding/cf961bbe-869b-4f51-8f22-f736971393727423404.jpg',
      { w: 100, h: 150 },
    ),
    ImageConfig(
      '4',
      'https://st0.dancf.com/gaoding-material/0/images/232980/20191108-002232-g7mnl.jpg',
      { w: 150, h: 150 },
    ),
    ImageConfig(
      '5',
      'https://st0.dancf.com/gaoding-material/0/images/286108/20191231-001737-DlYeF.jpg',
      { w: 150, h: 150 },
    ),
    ImageConfig(
      '6',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F210611094Q512b-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649841337&t=1b83a5923a8898034b3600690c34ac1a',
      { w: 150, h: 150 },
    ),
    ImageConfig(
      '7',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F032120114622%2F200321114622-4-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649841337&t=5dca3cfcfad8e855aaf7571bd3c999db',
      { w: 150, h: 150 },
    ),
  ]);

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
    /**
     * @description picture模块
     */
    const getPictureModuleConfigData = async () => {
      const lists = await componentConfigList(
        import.meta.glob('../componentTemplate/picture/*/config.ts'),
      );
      setPictureConfigList(lists);
    };
    // --------------调用--------
    getBaseModuleConfigData();
    getTextModuleConfigData();
    // getPictureModuleConfigData();
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
    () => [...textConfigList, ...baseConfigList, ...pictureConfigList],
    [textConfigList, baseConfigList, pictureConfigList],
  );
  return {
    baseConfigList,
    getAllBaseModuleConfigList,
    textConfigList,
    allModuleConfigList,
    pictureConfigList,
  };
};
