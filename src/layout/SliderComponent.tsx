import React, { memo, useState, useMemo, useEffect } from 'react';
import { Tabs, Input } from 'antd';
import TabTitle from './TabTitleComponent';
const { TabPane } = Tabs;
import {
  HighlightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import styles from './layout.module.scss';
import Drag from '@/core/DragTargetComponent';
import { useSetState } from '@/hooks';
import { useGetCompentConfigList } from '@/core/componentTemplate/config';
import { createSelector } from 'reselect';
import SecondaryList from './SecondaryList';

export interface oneModuleAllType {
  isShow: boolean;
  componentInfo: Partial<getAllConfigListType>;
}
const Slider = memo(function Slider() {
  const dispatch = useDispatch();

  const [tabKey, setTabKey] = useState<string>('1');

  const [zenMode] = useSelector(
    createSelector([(state: storeType) => state.config], ({ zenMode }) => [zenMode] as const),
  );

  const { getAllBaseModuleConfigList, textConfigList, pictureGather } = useGetCompentConfigList();

  const [isShowLeftComponents, setIsShowLeftComponents] = useState<boolean>(true);

  const toggleShowLeftComponents = () => {
    setIsShowLeftComponents((pre) => !pre);
  };

  useEffect(() => {
    if (zenMode) {
      setIsShowLeftComponents(false);
    } else {
      setIsShowLeftComponents(true);
    }
  }, [zenMode]);
  const tabBarExtraContent = useMemo(() => {
    return (
      <div onClick={toggleShowLeftComponents} className={styles.tabBarExtraContent}>
        {isShowLeftComponents ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
      </div>
    );
  }, [isShowLeftComponents]);

  const Render = useMemo(() => {
    const mergeList = [
      {
        category: 'text',
        title: '文本',
        componentList: textConfigList,
      },
      {
        category: 'picture',
        title: '图片',
        componentList: pictureGather,
      },
      {
        category: 'base',
        title: '基础',
        componentList: getAllBaseModuleConfigList,
      },
    ];
    return mergeList.map((item, index) => (
      <React.Fragment key={index}>
        <TabPane
          key={index + 1}
          tab={<TabTitle title={item.title} icon={<HighlightOutlined style={{ margin: 0 }} />} />}
        >
          <div
            className={styles.leftMoveAnimate}
            style={{
              width: isShowLeftComponents ? '300px' : '0px',
              opacity: isShowLeftComponents ? '1' : '0',
            }}
          >
            <div className={styles.leftContainer}>
              <div className={styles.search}>
                <Input placeholder="请选择" prefix={<SearchOutlined />} allowClear />
              </div>
              {['picture', 'base'].includes(item.category) ? (
                <>
                  <SecondaryList
                    data={item.componentList as getAllConfigListType[]}
                    fatherData={item as getAllConfigListType}
                  />
                </>
              ) : null}
              {item.category === 'text' ? (
                <div
                  className={styles.contentContainer}
                  style={{
                    visibility: isShowLeftComponents ? 'visible' : 'hidden',
                  }}
                >
                  <Drag list={item.componentList as templateDataType[]} category={item.category} />
                </div>
              ) : null}
            </div>
          </div>
        </TabPane>
      </React.Fragment>
    ));
  }, [getAllBaseModuleConfigList, textConfigList, pictureGather, isShowLeftComponents]);

  return (
    <>
      <Tabs
        tabPosition="left"
        tabBarExtraContent={tabBarExtraContent}
        onChange={(val) => setTabKey(val)}
      >
        {Render}
      </Tabs>
    </>
  );
});

export default Slider;
