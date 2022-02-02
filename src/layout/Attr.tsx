import React, { memo, useEffect, useState } from 'react';
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  RightOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { Tabs, Divider } from 'antd';
import styles from './layout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import FormRender from '@/core/attr/FormRender';
import { setShapeStyleAction, updatePropsAction } from '@/store/controller/editor/component';
import { Store } from 'antd/lib/form/interface';
import WhXy from '@/core/attr/WhXy';
import { getRandomStr } from '@/utils';
import { setCanvasInformationAction } from '@/store/controller/config';
const { TabPane } = Tabs;
const Attr = memo(function Attr(props) {
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState<boolean>(true);

  const [isClickComponent, curComponent, canvasInformation, canvasEditableEl, zenMode] =
    useSelector(
      createSelector(
        [(state: storeType) => state.component, (state: storeType) => state.config],
        (component, config) => {
          return [
            component.isClickComponent,
            component.curComponent,
            config.canvasInformation,
            config.canvasEditableEl,
            config.zenMode,
          ] as const;
        },
      ),
    );
  useEffect(() => {
    if (zenMode) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  }, [zenMode]);

  const toggleCollapsed = () => {
    setCollapsed((pre) => !pre);
  };
  const handleFormSave = (flag: string, val: any) => {
    if (flag === 'canvasConfig') {
      dispatch(setCanvasInformationAction(val));
      console.log('val', val);
    } else {
      dispatch(updatePropsAction(val));
      console.log('val', val);
    }
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
          {!curComponent ? (
            <>
              <TabPane tab={'画布配置'} key="1">
                <div className={styles.attrsContainer}>
                  <FormRender
                    editType={canvasEditableEl}
                    onSave={(val: Store) => handleFormSave('canvasConfig', val)}
                    id={'canvasConfig'}
                    showEditPropsData={canvasInformation}
                  />
                </div>
              </TabPane>
            </>
          ) : (
            <>
              <TabPane tab={'属性'} key="1">
                <div className={styles.attrsContainer}>
                  <WhXy />
                  <Divider />
                  <FormRender
                    editType={curComponent.editableEl}
                    onSave={(val: Store) => handleFormSave('shapeConfig', val)}
                    id={curComponent.componentId!}
                    showEditPropsData={curComponent.propValue}
                  />
                </div>
              </TabPane>
              <TabPane tab={'交互'} key="2">
                <div className={styles.attrsContainer}>Content of Tab Pane 2</div>
              </TabPane>
            </>
          )}
        </Tabs>
      </div>
    </>
  );
});

export default Attr;
