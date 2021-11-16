import React, { FC, memo } from 'react';
import styles from '../index.module.scss';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { componentActionMerage, curComponentAction } from '@/redux/action/component';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
export interface ShapeType {
  style?: React.CSSProperties;
  element: templateDataType;
}
const Shape: FC<ShapeType> = memo(function Shape({ children, style, element }) {
  const pointList = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']; // 八个方向
  const [curComponent, active] = useSelector(
    createSelector([(state: storeType) => state.component], (component) => {
      const active = element?.componentId === component.curComponent?.componentId ? true : false;
      return [component.curComponent, active] as const;
    }),
  );
  const dispatch = useDispatch<Dispatch<componentActionMerage>>();
  const handleMouseDownOnShape: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    dispatch(curComponentAction(element));
    console.log(`object`, element);
    console.log(`111`, 111);
  };
  return (
    <div
      className={`${styles.shape} ${active ? styles.shapeActive : null}`}
      style={style}
      onMouseDown={handleMouseDownOnShape}
    >
      {children}
    </div>
  );
});

export default Shape;
