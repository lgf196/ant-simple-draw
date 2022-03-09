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
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { getAllConfigListType, useGetCopentConfigList } from '@/core/componentTemplate/config';
import { createSelector } from 'reselect';
export interface oneModuleAllType {
  isShow: boolean;
  componentInfo: Partial<getAllConfigListType>;
}
const Slider = memo(function Slider() {
  const dispatch = useDispatch();

  const [oneModuleAll, setOneModuleAll] = useSetState<oneModuleAllType>({
    isShow: false,
    componentInfo: {},
  });

  const [zenMode] = useSelector(
    createSelector([(state: storeType) => state.config], ({ zenMode }) => [zenMode] as const),
  );

  const { baseConfigList, getAllBaseModuleConfigList, textConfigList } = useGetCopentConfigList();

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
              width: isShowLeftComponents ? '220px' : '0px',
              opacity: isShowLeftComponents ? '1' : '0',
            }}
          >
            <div className={styles.leftContainer}>
              <div className={styles.search}>
                <Input placeholder="请选择" prefix={<SearchOutlined />} allowClear />
              </div>
              {item.category === 'base' ? (
                <>
                  <div
                    className={styles.contentContainer}
                    style={{
                      display: !oneModuleAll.isShow ? 'block' : 'none',
                      visibility: isShowLeftComponents ? 'visible' : 'hidden',
                    }}
                  >
                    {item.componentList.map((child, k) => (
                      <React.Fragment key={k}>
                        <>
                          <div className={styles.head}>
                            <h2 className={styles.title}>{child.title}</h2>
                            <button
                              className={styles.more}
                              onClick={() =>
                                setOneModuleAll({ isShow: true, componentInfo: child })
                              }
                            >
                              <span>全部</span>
                              <RightOutlined />
                            </button>
                          </div>
                          <Drag list={child.componentList} />
                        </>
                      </React.Fragment>
                    ))}
                  </div>
                  <div
                    className={styles.contentContainer}
                    style={{
                      display: oneModuleAll.isShow ? 'block' : 'none',
                      visibility: isShowLeftComponents ? 'visible' : 'hidden',
                    }}
                  >
                    <div className={styles.moreList}>
                      <button
                        className={styles.more}
                        onClick={() => setOneModuleAll({ isShow: false })}
                      >
                        <LeftOutlined />
                        <span>{oneModuleAll.componentInfo.title}</span>
                      </button>
                      <Drag list={oneModuleAll.componentInfo.componentList!} />
                    </div>
                  </div>
                </>
              ) : null}
              {item.category === 'text' ? (
                <div
                  className={styles.contentContainer}
                  style={{
                    visibility: isShowLeftComponents ? 'visible' : 'hidden',
                  }}
                >
                  <Drag list={item.componentList as templateDataType[]} />
                </div>
              ) : null}
            </div>
          </div>
        </TabPane>
      </React.Fragment>
    ));
  }, [getAllBaseModuleConfigList, textConfigList, isShowLeftComponents, oneModuleAll]);

  return (
    <>
      <Tabs tabPosition="left" tabBarExtraContent={tabBarExtraContent}>
        {Render}
      </Tabs>
    </>
  );
});

export default Slider;
