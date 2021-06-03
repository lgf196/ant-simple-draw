import React, { memo } from 'react';
import { Tabs } from 'antd';
import style from './index.module.scss';
import DragTarget from '@/core/dragTarget';
import basicTemplateList from '@/graphTemplateType/baseTempalte';
import combinationTemplateList from '@/graphTemplateType/combination';
import componentizationTemplateList from '@/graphTemplateType/componentization';
import {
  AppstoreOutlined,
  HighlightOutlined,
  BlockOutlined,
} from '@ant-design/icons';
import TabTitle from './tabTitle';
const { TabPane } = Tabs;

const Slider = memo(function Slider(props) {
  return (
    <div className={style.slider}>
      <Tabs tabPosition="left" className={style.tabs}>
        <TabPane
          key="1"
          tab={<TabTitle title="基础" icon={<HighlightOutlined />} />}
        >
          <div className={style.tabsContent}>
            {basicTemplateList.map((item, index) => (
              <DragTarget itemValue={{ ...item }} key={index} />
            ))}
          </div>
        </TabPane>
        <TabPane
          tab={<TabTitle title="组合" icon={<BlockOutlined />} />}
          key="2"
        >
          <div className={style.tabsContent}>
            {combinationTemplateList.map((item, index) => (
              <DragTarget itemValue={{ ...item }} key={index} />
            ))}
          </div>
        </TabPane>
        <TabPane
          tab={<TabTitle title="组件化" icon={<AppstoreOutlined />} />}
          key="3"
        >
          <div className={style.tabsContent}>
            {componentizationTemplateList.map((item, index) => (
              <DragTarget itemValue={{ ...item }} key={index} />
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
});

export default Slider;
