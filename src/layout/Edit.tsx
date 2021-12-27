import React, { memo } from 'react';
import Make from '@/core/edit';
import Drag from '@/core/DragTargetComponent';
import { useGetCopentConfigList } from '@/core/config/common';
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
} from '@/store/controller/editor/component';
import { hideContextMenuAction } from '@/store/controller/editor/contextMenu';
import { recordSnapshot } from '@/store/controller/editor/snapshot';
import styles from './layout.module.scss';
import { Drawer } from 'antd';
const Edit = memo(function Edit(props) {
  const { baseConfigList } = useGetCopentConfigList();

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
      const components: templateDataType[] = curComponent.propValue;
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
  return (
    <main className={styles.main}>
      <section>
        <Drag list={baseConfigList} />
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
        <div className={styles.option}>qsq</div>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
        <p>32e2e2e2e</p>
      </section>
    </main>
  );
});

export default Edit;
