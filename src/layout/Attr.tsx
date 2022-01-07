import React, { memo, useState } from 'react';
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  RightOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { Tabs } from 'antd';
import styles from './layout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import FormRender from '@/core/attr/FormRender';
import { setShapeStyleAction } from '@/store/controller/editor/component';
import { Store } from 'antd/lib/form/interface';
const { TabPane } = Tabs;
const Attr = memo(function Attr(props) {
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState<boolean>(true);

  const [isClickComponent, curComponent] = useSelector(
    createSelector([(state: storeType) => state.component], (component) => {
      return [component.isClickComponent, component.curComponent] as const;
    }),
  );

  const toggleCollapsed = () => {
    setCollapsed((pre) => !pre);
  };
  const handleFormSave = (val: Store) => {
    dispatch(setShapeStyleAction({ width: val.w, height: val.h, top: val.y, left: val.x }));
  };
  return (
    <>
      <div
        className={styles.option}
        onClick={toggleCollapsed}
        style={{ left: collapsed ? '-17.5px' : '-40px' }}
      >
        {!collapsed ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
      </div>
      <div
        className={styles.editContainer}
        style={{
          width: collapsed ? '270px' : '0px',
          opacity: collapsed ? 1 : 0,
        }}
      >
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="属性" key="1">
            <div className={styles.attrsContainer}>
              {curComponent && (
                <FormRender
                  editType={curComponent.editableEl}
                  onSave={handleFormSave}
                  id={curComponent.componentId!}
                  showEditPropsData={curComponent.propValue}
                />
              )}
            </div>
          </TabPane>
          <TabPane tab="交互" key="2">
            <div className={styles.attrsContainer}>Content of Tab Pane 2</div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
});

export default Attr;
