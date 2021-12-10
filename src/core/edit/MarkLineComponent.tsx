import React, { memo, useRef, useEffect } from 'react';
import { lines, markLineType } from '../config/shape';
import styles from '../index.module.scss';
import { useSetState } from '@/hooks';
const MarkLine = memo(function MarkLine(props) {
  const eleRefList = useRef<HTMLDivElement[]>([]);
  const [lineStatus, setLineStatus] = useSetState<Record<markLineType, boolean>>({
    xt: false,
    xc: false,
    xb: false,
    yl: false,
    yc: false,
    yr: false,
  });
  useEffect(() => {
    console.log(`eleRefList.cu`, eleRefList.current);
  }, []);
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
