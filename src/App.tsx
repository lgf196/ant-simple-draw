import React, { FC } from 'react';
import Toolbar from '@/layout/head';
import SliderNav from '@/layout/slider';
import style from './app.module.scss';
import Edit from '@/core/edit';
import { deepCopy, getSingleArrayVal } from '@/utils';
import { useGetCopentConfigList } from './core/config/common';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  addComponentAction,
  componentActionMerage,
  curComponentAction,
  isClickComponentAction,
} from '@/redux/action/component';
import { contextMenuActionMerage, hideContextMenuAction } from '@/redux/action/contextMenu';
import { getRandomStr, $ } from '@/utils';
import { createSelector } from 'reselect';
const App: FC = () => {
  const { baseConfigList } = useGetCopentConfigList();

  const dispatch = useDispatch<Dispatch<componentActionMerage | contextMenuActionMerage>>();

  const [isClickComponent] = useSelector(
    createSelector([(state: storeType) => state.component], (component) => {
      return [component.isClickComponent] as const;
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
      dispatch(addComponentAction(component));
    }
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    // console.log(`onDragOver------`, e);
  };

  const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // 这里点击空白区域的时候，不选中组件,且按键不显示
    if (!isClickComponent) {
      dispatch(curComponentAction(null));
    }
    if (e.button !== 2) {
      dispatch(hideContextMenuAction());
    }
  };
  return (
    <>
      <Toolbar />
      <main className={style.main}>
        <section>
          <SliderNav />
        </section>
        <section className={style.center}>
          <div
            className={style.content}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onMouseDown={(e) => {
              dispatch(isClickComponentAction(false));
            }}
            onMouseUp={handleMouseUp}
          >
            <Edit />
          </div>
        </section>
        <section className={style.right}>22</section>
      </main>
    </>
  );
};

export default App;
