import React, { memo } from 'react';
import { Tabs } from 'antd';
import style from './index.module.scss';
import DragTarget from '@/core/dragTarget';
import basicTemplateList from '@/graphTemplateType/baseTempalte';
import combinationTemplateList from '@/graphTemplateType/combination';
import componentizationTemplateList from '@/graphTemplateType/componentization';
import { AndroidOutlined, HighlightOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

const Slider = memo(function Slider(props) {
  return (
    <div className={style.slider}>
      <Tabs tabPosition="left" className={style.tabs}>
        <TabPane
          key="1"
          tab={
            <div style={{ textAlign: 'center', width: '100%' }}>
              <HighlightOutlined />
              <p>基础</p>
            </div>
          }
        >
          <div className={style.tabsContent}>
            {basicTemplateList.map((item, index) => (
              <DragTarget itemValue={{ ...item }} key={index} />
            ))}
          </div>
        </TabPane>
        <TabPane
          tab={
            <div style={{ textAlign: 'center', width: '100%' }}>
              <AndroidOutlined />
              <p>组合</p>
            </div>
          }
          key="2"
        >
          <div className={style.tabsContent}>
            {combinationTemplateList.map((item, index) => (
              <DragTarget itemValue={{ ...item }} key={index} />
            ))}
          </div>
        </TabPane>
        <TabPane
          tab={
            <div style={{ textAlign: 'center', width: '100%' }}>
              <AndroidOutlined />
              <p>组件化</p>
            </div>
          }
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
