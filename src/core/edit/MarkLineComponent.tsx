import React, { memo, useRef, useEffect } from 'react';
import { lines, markLineType } from '../config/shape';
import styles from '../index.module.scss';
import { useSetState } from '@/hooks';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { getComponentRotatedStyle } from '@/utils/style';
import { $ } from '@/utils';
export interface conditionsType {
  isNearly: boolean;
  lineNode: Element;
  line: string;
  dragShift: number;
  lineShift: number;
}
export type linePosition = 'top' | 'left';
const MarkLine = memo(function MarkLine(props) {
  const diff = 3; // 相距 dff 像素将自动吸附
  const eleRefList = useRef<HTMLDivElement[]>([]);
  const [isDownward, isRightward, timestamp, componentDataList, curComponent] = useSelector(
    createSelector(
      [(state: storeType) => state.markLine, (state: storeType) => state.component],
      ({ isDownward, isRightward, timestamp }, { componentDataList, curComponent }) =>
        [isDownward, isRightward, timestamp, componentDataList, curComponent] as const,
    ),
  );
  const [lineStatus, setLineStatus] = useSetState<Record<markLineType, boolean>>({
    xt: false,
    xc: false,
    xb: false,
    yl: false,
    yc: false,
    yr: false,
  });
  useEffect(() => {
    console.log(`object`, eleRefList.current);
    if (timestamp > 0) {
      // 正在拖动图形
    } else if (timestamp === -1) {
      // 停止拖动图形
    }
  }, [timestamp]);

  const isNearly = (dragValue: number, targetValue: number) => {
    return Math.abs(dragValue - targetValue) <= diff;
  };

  const translatecurComponentShift = (
    key: linePosition,
    condition: conditionsType,
    curComponentStyle: MergeCSSProperties,
  ) => {
    const { width, height } = curComponent!.style;
    if (key == 'top') {
      return Math.round(condition.dragShift - (Number(height) - curComponentStyle.height) / 2);
    }

    return Math.round(condition.dragShift - (Number(width) - curComponentStyle.width) / 2);
  };

  const showLine = () => {
    const curComponentStyle = getComponentRotatedStyle(curComponent!.style);
    const curComponentHalfwidth = curComponentStyle.width / 2;
    const curComponentHalfHeight = curComponentStyle.height / 2;
    hideLine();
    componentDataList.forEach((component) => {
      if (component == curComponent) return;
      const componentStyle = getComponentRotatedStyle(component.style);
      const { top, left, bottom, right } = componentStyle;
      const componentHalfwidth = componentStyle.width / 2;
      const componentHalfHeight = componentStyle.height / 2;

      const conditions: Record<linePosition, conditionsType[]> = {
        top: [
          {
            isNearly: isNearly(curComponentStyle.top, top),
            lineNode: $('#xt'), // xt
            line: 'xt',
            dragShift: top,
            lineShift: top,
          },
          {
            isNearly: isNearly(curComponentStyle.bottom, top),
            lineNode: $('#xt'), // xt
            line: 'xt',
            dragShift: top - curComponentStyle.height,
            lineShift: top,
          },
          {
            // 组件与拖拽节点的中间是否对齐
            isNearly: isNearly(
              curComponentStyle.top + curComponentHalfHeight,
              top + componentHalfHeight,
            ),
            lineNode: $('#xc'), // xc
            line: 'xc',
            dragShift: top + componentHalfHeight - curComponentHalfHeight,
            lineShift: top + componentHalfHeight,
          },
          {
            isNearly: isNearly(curComponentStyle.top, bottom),
            lineNode: $('#xb'), // xb
            line: 'xb',
            dragShift: bottom,
            lineShift: bottom,
          },
          {
            isNearly: isNearly(curComponentStyle.bottom, bottom),
            lineNode: $('#xb'), // xb
            line: 'xb',
            dragShift: bottom - curComponentStyle.height,
            lineShift: bottom,
          },
        ],
        left: [
          {
            isNearly: isNearly(curComponentStyle.left, left),
            lineNode: $('#yl'), // yl
            line: 'yl',
            dragShift: left,
            lineShift: left,
          },
          {
            isNearly: isNearly(curComponentStyle.right, left),
            lineNode: $('#yl'), // yl
            line: 'yl',
            dragShift: left - curComponentStyle.width,
            lineShift: left,
          },
          {
            // 组件与拖拽节点的中间是否对齐
            isNearly: isNearly(
              curComponentStyle.left + curComponentHalfwidth,
              left + componentHalfwidth,
            ),
            lineNode: $('#yc'), // yc
            line: 'yc',
            dragShift: left + componentHalfwidth - curComponentHalfwidth,
            lineShift: left + componentHalfwidth,
          },
          {
            isNearly: isNearly(curComponentStyle.left, right),
            lineNode: $('#yr'), // yr
            line: 'yr',
            dragShift: right,
            lineShift: right,
          },
          {
            isNearly: isNearly(curComponentStyle.right, right),
            lineNode: $('#yr'), // yr
            line: 'yr',
            dragShift: right - curComponentStyle.width,
            lineShift: right,
          },
        ],
      };

      const needToShow = [];
      const { rotate } = curComponent!.style;

      Object.keys(conditions).forEach((key) => {});
    });
  };
  const hideLine = () => {
    Object.keys(lineStatus).forEach((line) => {
      setLineStatus({ [line]: false });
    });
  };
  return (
    <div className={styles.markLine}>
      {lines.map((item, index) => (
        <div
          className={`${styles.line} ${item.includes('x') ? styles.xline : styles.yline}`}
          ref={(ref: HTMLDivElement) => eleRefList.current!.push(ref)}
          key={index}
          data-line={item}
          id={item}
        >
          {/* {item} */}
        </div>
      ))}
    </div>
  );
});

export default MarkLine;
