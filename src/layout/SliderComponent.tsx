import React, { memo, useState, useMemo } from 'react';
import { Tabs } from 'antd';
import TabTitle from './TabTitleComponent';
const { TabPane } = Tabs;
import { HighlightOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import style from './layout.module.scss';
import Tempalte from './Tempalte';
import Material from './Material';
import Edit from './Edit';
import Container from './Container';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { setTabKeyAction } from '@/store/controller/config';
const Slider = memo(function Slider() {
  const dispatch = useDispatch();

  const [isShowLeftComponents, setIsShowLeftComponents] = useState<boolean>(true);

  const [tabKey] = useSelector(
    createSelector([(state: storeType) => state.config], (config) => {
      return [config.tabKey] as const;
    }),
  );

  const toggleShowLeftComponents = () => {
    setIsShowLeftComponents((pre) => !pre);
  };

  const tabBarExtraContent = useMemo(() => {
    if (tabKey === '2') {
      return (
        <div onClick={toggleShowLeftComponents} style={{ padding: '10px', cursor: 'pointer' }}>
          {isShowLeftComponents ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
        </div>
      );
    }
    return null;
  }, [tabKey, isShowLeftComponents]);

  return (
    <div className={style.sliderNav}>
      <Tabs
        tabPosition="left"
        tabBarExtraContent={tabBarExtraContent}
        onChange={(val) => dispatch(setTabKeyAction(val))}
        defaultActiveKey={tabKey}
      >
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
            <Edit isShowLeftComponents={isShowLeftComponents} />
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
