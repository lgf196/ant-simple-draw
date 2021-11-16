import React, { FC, memo } from 'react';
import styles from '../index.module.scss';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { componentActionMerage, curComponentAction } from '@/redux/action/component';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { pointList } from '@/core/config/shape';
export interface ShapeType {
  style?: React.CSSProperties;
  element: templateDataType;
}
const Shape: FC<ShapeType> = memo(function Shape({ children, style, element }) {
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

  /**
   * @description 动态的布局连接桩
   */
  const getPointStyle = (point: string) => {
    const { width, height } = style as { width: number; height: number };
    const hasT = /t/.test(point);
    const hasB = /b/.test(point);
    const hasL = /l/.test(point);
    const hasR = /r/.test(point);
    let newLeft = 0;
    let newTop = 0;
    // 四个角的点
    if (point.length === 2) {
      newLeft = hasL ? 0 : width;
      newTop = hasT ? 0 : height;
    } else {
      // 上下两点的点，宽度居中
      if (hasT || hasB) {
        newLeft = width / 2;
        newTop = hasT ? 0 : height;
      }
      // 左右两边的点，高度居中
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width;
        newTop = Math.floor(height / 2);
      }
    }
    const eleStyle = {
      marginLeft: hasR ? '-4px' : '-4px',
      marginTop: '-4px',
      left: `${newLeft}px`,
      top: `${newTop}px`,
    };
    return eleStyle;
  };

  return (
    <div
      className={`${styles.shape} ${active ? styles.shapeActive : null}`}
      style={style}
      onMouseDown={handleMouseDownOnShape}
    >
      {active &&
        pointList.map((item, index) => (
          <div key={index} className={styles.shapePoint} style={getPointStyle(item)}></div>
        ))}

      {children}
    </div>
  );
});

export default Shape;
