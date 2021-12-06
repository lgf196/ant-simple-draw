import React, { memo, useRef, useEffect } from 'react';
import { lines } from '../config/shape';
import styles from '../index.module.scss';
const MarkLine = memo(function MarkLine(props) {
  const eleRefList = useRef<HTMLDivElement[]>([]);

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
