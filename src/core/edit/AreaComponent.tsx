import React, { memo, FC, useMemo } from 'react';
import style from '../index.module.scss';
export interface AreaComponentType extends whType, xyTYpe {}
const AreaComponent: FC<AreaComponentType> = memo(function AreaComponent({ width, height, x, y }) {
  const getStyleVal = useMemo<React.CSSProperties>(
    () => ({
      width: width + 'px',
      height: height + 'px',
      left: x + 'px',
      top: y + 'px',
    }),
    [width, height, x, y],
  );

  return <div className={style.area} style={getStyleVal}></div>;
});
export default AreaComponent;
