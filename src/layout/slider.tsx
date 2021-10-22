import React, { memo, useState } from 'react';
import { Tabs } from 'antd';
import TabTitle from './tabTitle';
const { TabPane } = Tabs;
import { HighlightOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import Drag from '@/core/dragTarget';
import baseTypeData from '@/core/templateDataType/base';
const Slider = memo(function Slider() {
  const [collapse, setCollapse] = useState<boolean>(false);
  return (
    <div>
      <Tabs
        tabPosition="left"
        tabBarExtraContent={
          <div onClick={() => setCollapse(!collapse)} role="button" style={{ cursor: 'pointer' }}>
            {!collapse ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
          </div>
        }
      >
        <TabPane
          key="1"
          tab={<TabTitle title="基础" icon={<HighlightOutlined style={{ margin: 0 }} />} />}
        >
          {!collapse ? <Drag list={baseTypeData} /> : null}
        </TabPane>
      </Tabs>
    </div>
  );
});

export default Slider;
