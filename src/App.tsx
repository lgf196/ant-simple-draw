import React, { memo, useState, useMemo, FC, useEffect } from 'react';
import Toolbar from '@/layout/HeadComponent';
import SliderNav from '@/layout/SliderComponent';
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
import styles from './layout/layout.module.scss';
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  RightOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { useSetState } from '@/hooks';
import { Tabs } from 'antd';
import FormRender from '@/core/attr/FormRender';
import { Store } from 'antd/lib/form/interface';
import Edit from '@/core/edit';
import Container from './layout/Container';
import Attr from './layout/Attr';
const { TabPane } = Tabs;
export interface oneModuleAllType {
  isShow: boolean;
  componentInfo: Partial<getAllConfigListType>;
}
export interface EditType {
  isShowLeftComponents: boolean;
}

const App: FC = () => {
  const { baseConfigList } = useGetCopentConfigList();

  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState<boolean>(true);

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
      component.propValue.x = component.style!.left;
      component.propValue.y = component.style!.top;
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
    <>
      <Toolbar />
      <main className={styles.main}>
        <div className={styles.left}>
          <SliderNav />
        </div>
        <div className={styles.center}>
          <div
            className={styles.content}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onMouseDown={(e) => {
              dispatch(isClickComponentAction(false));
            }}
            onMouseUp={handleMouseUp}
          >
            <Edit />
          </div>
        </div>
        <div className={styles.right}>
          <Attr />
        </div>
      </main>
    </>
  );
};

export default App;
