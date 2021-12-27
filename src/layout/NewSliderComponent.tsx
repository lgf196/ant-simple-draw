import React, { memo, useState } from 'react';
import { Tabs } from 'antd';
import TabTitle from './TabTitleComponent';
const { TabPane } = Tabs;
import { HighlightOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import Drag from '@/core/DragTargetComponent';
import { useGetCopentConfigList } from '@/core/config/common';
import style from './layout.module.scss';
import Tempalte from './Tempalte';
import Material from './Material';
import Edit from './Edit';
import Container from './Container';
const Slider = memo(function Slider() {
  const { baseConfigList } = useGetCopentConfigList();
  return (
    <div className={style.sliderNav}>
      <Tabs tabPosition="left">
        <TabPane
          key="1"
          tab={<TabTitle title="模板" icon={<HighlightOutlined style={{ margin: 0 }} />} />}
        >
          <Container>
            <Tempalte />
          </Container>
        </TabPane>
        <TabPane
          key="2"
          tab={<TabTitle title="制作" icon={<HighlightOutlined style={{ margin: 0 }} />} />}
        >
          {/* <Drag list={baseConfigList} /> */}
          <Container>
            <Edit />
          </Container>
        </TabPane>
        <TabPane
          key="3"
          tab={<TabTitle title="素材" icon={<HighlightOutlined style={{ margin: 0 }} />} />}
        >
          <Container>
            <Material />
          </Container>
        </TabPane>
      </Tabs>
    </div>
  );
});

export default Slider;
