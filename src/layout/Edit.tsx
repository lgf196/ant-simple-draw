import React, { memo, useState, useMemo } from 'react';
import Make from '@/core/edit';
import Drag from '@/core/DragTargetComponent';
import { getAllConfigListType, useGetCopentConfigList } from '@/core/config/common';
import { deepCopy, getSingleArrayVal } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomStr, $ } from '@/utils';
import { createSelector } from 'reselect';
import decomposeComponent from '@/utils/decomposeComponent';
import {
  addComponent,
  curComponentAction,
  isClickComponentAction,
  deleteComponentAction,
  setShapeStyleAction,
} from '@/store/controller/editor/component';
import { hideContextMenuAction } from '@/store/controller/editor/contextMenu';
import { recordSnapshot } from '@/store/controller/editor/snapshot';
import styles from './layout.module.scss';
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  RightOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { useSetState } from '@/hooks';
import { Tabs } from 'antd';
import WhXy from '@/core/attr/WhXy';
import FormRender from '@/core/attr/FormRender';
import { Store } from 'antd/lib/form/interface';
const { TabPane } = Tabs;
export interface oneModuleAllType {
  isShow: boolean;
  componentInfo: Partial<getAllConfigListType>;
}

const Edit = memo(function Edit(props) {
  const [oneModuleAll, setOneModuleAll] = useSetState<oneModuleAllType>({
    isShow: false,
    componentInfo: {},
  });

  const [collapsed, setCollapsed] = useState<boolean>(true);

  const { baseConfigList, getAllConfigList } = useGetCopentConfigList();

  const dispatch = useDispatch();

  const [isClickComponent, curComponent] = useSelector(
    createSelector([(state: storeType) => state.component], (component) => {
      return [component.isClickComponent, component.curComponent] as const;
    }),
  );

  const handleDrop: React.DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.dataTransfer.getData('id');
    const rectInfo = $('#editor').getBoundingClientRect();
    if (id) {
      const component = deepCopy(
        getSingleArrayVal<templateDateInterface>(baseConfigList, 'id', id),
      ) as templateDataType;
      component.style!.top = e.clientY - rectInfo.y;
      component.style!.left = e.clientX - rectInfo.x;
      component.componentId = getRandomStr();
      dispatch(addComponent(component));
      dispatch(recordSnapshot());
    }
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    // console.log(`onDragOver------`, e);
  };

  const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // 这里点击空白区域的时候，不选中组件,且按键不显示
    if (!isClickComponent) {
      decompose();
      dispatch(curComponentAction(null));
    }
    if (e.button !== 2) {
      dispatch(hideContextMenuAction());
    }
  };
  /**
   * @description 取消组合合并的组件
   */
  const decompose = () => {
    if (curComponent && curComponent.component === 'Group') {
      const parentStyle = { ...curComponent.style };
      const components: templateDataType[] = curComponent.groupComponents!;
      const editorRect = $('#editor').getBoundingClientRect();
      components.forEach((component) => {
        // 将组合中的各个子组件拆分出来，并计算它们新的 style
        const decomposeComponentStyle = decomposeComponent(component, editorRect, parentStyle);

        dispatch(addComponent(decomposeComponentStyle));
      });
      // 组合的子组件已近添加了，这个时候组合组件得删除，没用了
      dispatch(deleteComponentAction([curComponent.componentId!]));
      dispatch(recordSnapshot());
    }
  };
  const toggleCollapsed = () => {
    setCollapsed((pre) => !pre);
  };

  const handleFormSave = (val: Store) => {
    dispatch(setShapeStyleAction({ width: val.w, height: val.h, top: val.y, left: val.x }));
  };
  return (
    <main className={styles.main}>
      <section className={styles.left} style={{ display: !oneModuleAll.isShow ? 'block' : 'none' }}>
        <div>
          {getAllConfigList.map((item, index) => (
            <div key={index}>
              <div className={styles.head}>
                <h2 className={styles.title}>{item.title}</h2>
                <button
                  className={styles.more}
                  onClick={() => setOneModuleAll({ isShow: true, componentInfo: item })}
                >
                  <span>全部</span>
                  <RightOutlined />
                </button>
              </div>
              <Drag list={item.componentList} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.left} style={{ display: oneModuleAll.isShow ? 'block' : 'none' }}>
        <div className={styles.moreList}>
          <button className={styles.more} onClick={() => setOneModuleAll({ isShow: false })}>
            <LeftOutlined />
            <span>{oneModuleAll.componentInfo.title}</span>
          </button>
          <Drag list={oneModuleAll.componentInfo.componentList!} />
        </div>
      </section>

      <section className={styles.center}>
        <div
          className={styles.content}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onMouseDown={(e) => {
            dispatch(isClickComponentAction(false));
          }}
          onMouseUp={handleMouseUp}
        >
          <Make />
        </div>
      </section>
      <section className={styles.right}>
        <div
          className={styles.option}
          onClick={toggleCollapsed}
          style={{ left: collapsed ? '-17.5px' : '-40px' }}
        >
          {!collapsed ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
        </div>
        <div
          className={styles.editContainer}
          style={{ width: collapsed ? '270px' : '0px', opacity: collapsed ? 1 : 0 }}
        >
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="属性" key="1">
              <div className={styles.attrsContainer}>
                {/* <WhXy /> */}
                {curComponent && (
                  <FormRender
                    editType={curComponent.editableEl}
                    onSave={handleFormSave}
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
      </section>
    </main>
  );
});

export default Edit;
