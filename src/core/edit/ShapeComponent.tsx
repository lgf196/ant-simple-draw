import React, { FC, memo, useState, useRef } from 'react';
import styles from '../index.module.scss';
import { useDispatch } from 'react-redux';
import {
  curComponentAction,
  setShapeStyleAction,
  isClickComponentAction,
} from '@/redux/action/component';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { angleToCursor, initialAngle, pointList, pointType } from '@/core/config/shape';
import { mod360 } from '@/utils/translate';
import { $ } from '@/utils';
import calculateComponentPositonAndSize from '@/utils/calculateComponentPositonAndSize';
import { ReloadOutlined } from '@ant-design/icons';
import { hideContextMenuAction } from '@/redux/action/contextMenu';
import { showMarkLineAction, hideMarkLineAction } from '@/redux/action/markLine';
export interface ShapeType {
  style?: MergeCSSProperties;
  defaultStyle: MergeCSSProperties;
  element: templateDataType;
}
const Shape: FC<ShapeType> = memo(function Shape({ children, style, element, defaultStyle }) {
  const currentElement = useRef<HTMLDivElement | null>(null);
  const [cursors, setCursors] = useState<Record<pointType, string>>();
  const [curComponent, active] = useSelector(
    createSelector([(state: storeType) => state.component], (component) => {
      const active = element?.componentId === component.curComponent?.componentId ? true : false;
      return [component.curComponent, active] as const;
    }),
  );
  const dispatch = useDispatch<storeDisPatch>();
  /**
  @description 拖拽图形
   */
  const handleMouseDownOnShape: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    e.stopPropagation();
    dispatch(isClickComponentAction(true));
    dispatch(curComponentAction(element));
    setCursors(getCursor(element));
    const pos = { ...defaultStyle };
    const startY = e.clientY;
    const startX = e.clientX;
    // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
    const startTop = Number(pos.top);
    const startLeft = Number(pos.left);

    // 如果元素没有移动，则不保存快照
    let hasMove = false;
    const move = async (moveEvent: MouseEvent) => {
      hasMove = true;
      const curX = moveEvent.clientX;
      const curY = moveEvent.clientY;
      pos.top = curY - startY + startTop;
      pos.left = curX - startX + startLeft;
      await dispatch(setShapeStyleAction(pos));
      // 触发元素移动事件，用于显示标线、吸附功能
      // curY - startY > 0 true 表示向下移动 false 表示向上移动
      // curX - startX > 0 true 表示向右移动 false 表示向左移动
      await dispatch(
        showMarkLineAction({
          isDownward: curY - startY > 0,
          isRightward: curX - startX > 0,
        }),
      );
    };

    const up = () => {
      // 触发元素停止移动事件，用于隐藏标线
      dispatch(hideMarkLineAction());
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
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
    return result;
  };
  /**
   * @description 八个点,每个点按下的事件
   */
  const handleMouseDownOnPoint = (point: pointType, e: MergeEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(isClickComponentAction(true));
    const style = { ...defaultStyle } as Required<MergeCSSProperties>;

    // 组件宽高比
    const proportion = Number(style.width) / Number(style.height);

    // 组件中心点
    const center = {
      x: Number(style.left) + Number(style.width) / 2,
      y: Number(style.top) + Number(style.height) / 2,
    };

    // 获取画布位移信息
    const editorRectInfo = $('#editor').getBoundingClientRect();

    // 获取 point 与实际拖动基准点的差值
    const pointRect = e.target.getBoundingClientRect();
    // 当前点击圆点相对于画布的中心坐标
    const curPoint = {
      x: Math.round(pointRect.left - editorRectInfo.left + e.target.offsetWidth / 2),
      y: Math.round(pointRect.top - editorRectInfo.top + e.target.offsetHeight / 2),
    };

    // 获取对称点的坐标
    const symmetricPoint = {
      x: center.x - (curPoint.x - center.x),
      y: center.y - (curPoint.y - center.y),
    };

    // 是否需要保存快照
    let needSave = false;
    let isFirst = true;

    const move = (moveEvent: MouseEvent) => {
      // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
      // 因此第一次点击时不触发 move 事件
      if (isFirst) {
        isFirst = false;
        return;
      }

      needSave = true;
      const curPositon = {
        x: moveEvent.clientX - editorRectInfo.left,
        y: moveEvent.clientY - editorRectInfo.top,
      };

      calculateComponentPositonAndSize(point, style, curPositon, proportion, false, {
        center,
        curPoint,
        symmetricPoint,
      });
      dispatch(setShapeStyleAction(style));
    };

    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };
  /**
   * @description 图形旋转
   */
  const handleRotate: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(isClickComponentAction(true));
    const pos = { ...defaultStyle };
    const startY = e.clientY;
    const startX = e.clientX;
    const startRotate = Number(pos.rotate);
    // 获取元素中心点位置
    const rect = currentElement.current!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 旋转前的角度
    const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180);

    // 如果元素没有移动，则不保存快照
    let hasMove = false;
    const move = (moveEvent: MouseEvent) => {
      hasMove = true;
      const curX = moveEvent.clientX;
      const curY = moveEvent.clientY;
      // 旋转后的角度
      const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180);
      // 获取旋转的角度值
      pos.rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore;
      // 修改当前组件样式
      dispatch(setShapeStyleAction(pos));
    };

    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      // 根据旋转角度重新获取光标位置，cursor
      setCursors(getCursor(element));
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // 阻止向父组件冒泡
    e.stopPropagation();
    e.preventDefault();
    dispatch(hideContextMenuAction());
  };
  return (
    <div
      className={`${styles.shape} ${active ? styles.shapeActive : null}`}
      style={style}
      onMouseDown={handleMouseDownOnShape}
      onClick={handleClick}
      ref={currentElement}
    >
      {active && (
        <>
          <ReloadOutlined className={styles.shapeRotate} onMouseDown={handleRotate} />
          {pointList.map((item, index) => (
            <div
              key={index}
              className={styles.shapePoint}
              style={getPointStyle(item)}
              onMouseDown={(e: any) => handleMouseDownOnPoint(item, e)}
            ></div>
          ))}
        </>
      )}
      {children}
    </div>
  );
});

export default Shape;
