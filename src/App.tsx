import React, { memo, useState, useMemo, FC, useEffect } from 'react';
import Toolbar from '@/layout/HeadComponent';
import SliderNav from '@/layout/SliderComponent';
import { deepCopy, getSingleArrayVal } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomStr, $ } from '@/utils';
import { createSelector } from 'reselect';
import {
  addComponent,
  curComponentAction,
  isClickComponentAction,
} from '@/store/controller/editor/component';
import { hideContextMenuAction } from '@/store/controller/editor/contextMenu';
import { recordSnapshot } from '@/store/controller/editor/snapshot';
import styles from './layout/layout.module.scss';
import Edit from '@/core/edit';
import Attr from './layout/Attr';
import useEdit from '@/core/edit/useEdit';
import { useGetCompentConfigList } from './core/componentTemplate/config';
export interface oneModuleAllType {
  isShow: boolean;
  componentInfo: Partial<getAllConfigListType>;
}
export interface EditType {
  isShowLeftComponents: boolean;
}

const App: FC = () => {
  const { allModuleConfigList } = useGetCompentConfigList();

  const { decompose } = useEdit();

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
        getSingleArrayVal<templateDateInterface>(allModuleConfigList, 'id', id),
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
      if (curComponent && curComponent.component === 'Group') {
        decompose(curComponent, [curComponent.componentId!]);
      }
      dispatch(curComponentAction(null));
    }
    if (e.button !== 2) {
      dispatch(hideContextMenuAction());
    }
  };
  return (
    <>
      <Toolbar />
      <div className={styles.main}>
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
      </div>
    </>
  );
};

export default App;
