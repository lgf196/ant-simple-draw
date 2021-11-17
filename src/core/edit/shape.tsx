import React, { FC, memo, useState } from 'react';
import styles from '../index.module.scss';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { componentActionMerage, curComponentAction } from '@/redux/action/component';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { angleToCursor, initialAngle, pointList, pointType } from '@/core/config/shape';
import { mod360 } from '@/utils/translate';
import { useMandatoryUpdate } from '@/hooks';
export interface ShapeType {
  style?: React.CSSProperties;
  defaultStyle?: React.CSSProperties;
  element: templateDataType;
}
const Shape: FC<ShapeType> = memo(function Shape({ children, style, element, defaultStyle }) {
  const [cursors, setCursors] = useState<Record<pointType, string>>();
  const [curComponent, active] = useSelector(
    createSelector([(state: storeType) => state.component], (component) => {
      const active = element?.componentId === component.curComponent?.componentId ? true : false;
      return [component.curComponent, active] as const;
    }),
  );
  const dispatch = useDispatch<Dispatch<componentActionMerage>>();

  const handleMouseDownOnShape: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    e.stopPropagation();
    dispatch(curComponentAction(element));
    setCursors(getCursor(element));
    console.log(`object`, element);
  };

  /**
   * @description 动态的布局连接桩
   */
  const getPointStyle = (point: string) => {
    const { width, height } = defaultStyle as { width: number; height: number };
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
      cursor: cursors && (cursors as any)[point],
    };
    return eleStyle;
  };
  /**
   * @description 更具不同的八个点，显示不同的cursor属性值
   */
  const getCursor = (curComponent: templateDataType) => {
    const rotate = mod360(Number(curComponent?.style?.rotate)); // 取余 360
    const result = Object.create({});
    let lastMatchIndex = -1; // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度
    pointList.forEach((point) => {
      const angle = mod360(initialAngle[point] + rotate);
      const len = angleToCursor.length;
      while (true) {
        lastMatchIndex = (lastMatchIndex + 1) % len;
        const angleLimit = angleToCursor[lastMatchIndex];
        if (angle < 23 || angle >= 338) {
          result[point] = 'nw-resize';
          return;
        }
        if (angleLimit.start <= angle && angle < angleLimit.end) {
          result[point] = angleLimit.cursor + '-resize';
          return;
        }
      }
    });
    console.log(`result`, result);
    return result;
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
