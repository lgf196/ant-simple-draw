import React, { useState, useEffect, useRef, useCallback } from 'react';

import styles from '../index.module.scss';

export interface ScaleplateSize {
  width: number;
  height: number;
}
export type ScaleplateTypes = {
  direction: 'up' | 'left' | 'right' | 'bottom';
  ratio: number;
  id: string;
};

const Scaleplate: React.FC<ScaleplateTypes> = props => {
  const { direction, ratio } = props;
  const [scaleplateLength, setscaleplate] = useState<ScaleplateSize>({ width: 0, height: 0 });
  const scaleplateRef = useRef<HTMLDivElement>(null);

  const generateElement = useCallback(
    (item?: boolean, num?: number) => {
      if (scaleplateRef.current) {
        let createSpan = document.createElement('div');
        createSpan.className = 'scaleplateLine';
        createSpan.style.backgroundColor = '#ccc';
        scaleplateRef.current.style.display = 'flex';
        scaleplateRef.current.style.justifyContent = 'space-between';
        if (direction === 'up') {
          scaleplateRef.current.style.marginLeft = '50px';
          createSpan.style.width = '1px';
          createSpan.style.height = '6px';
          createSpan.style.display = 'inline-block';
        } else {
          scaleplateRef.current.style.flexDirection = 'column';
          createSpan.style.height = '1px';
          createSpan.style.width = '6px';
        }
        if (item) {
          let createSpanContent = document.createElement('span');
          if (direction === 'up') {
            createSpan.style.height = '12px';
            createSpanContent.style.transform = 'translate3d(-4px, 20px, 0px)';
            createSpan.style.transform = 'translateY(0px)';
          } else {
            createSpan.style.width = '12px';
            createSpanContent.style.paddingLeft = '20px';
          }
          createSpanContent.style.display = 'block';
          createSpanContent.className = 'scaleplateNumber';
          createSpanContent.innerHTML = num! * 5 + '';
          createSpan.appendChild(createSpanContent);
        }
        scaleplateRef.current.appendChild(createSpan);
      }
    },
    [direction],
  );

  useEffect(() => {
    if (scaleplateRef.current) {
      let scaleplate = scaleplateRef.current.getBoundingClientRect();
      setscaleplate({ width: scaleplate.width, height: scaleplate.height });
      let length = direction === 'up' ? scaleplate.width : scaleplate.height;
      for (let i = 0; i < length / 5; i++) {
        if (i % 10 === 0) {
          generateElement(true, i);
        } else {
          generateElement();
        }
      }
    }
  }, [direction, generateElement]);

  useEffect(() => {
    if (scaleplateRef.current) {
      let width = scaleplateLength.width
        ? scaleplateLength.width
        : scaleplateRef.current.getBoundingClientRect().width;
      let height = scaleplateLength.height
        ? scaleplateLength.height
        : scaleplateRef.current.getBoundingClientRect().height;
      let arr = [...Array.from(scaleplateRef.current.querySelectorAll('.scaleplateLine'))];
      if (arr.length) {
        if (direction === 'up') {
          scaleplateRef.current.style.width = parseFloat(ratio.toFixed(1)) * width + 'px';
          arr.forEach(el => {
            let dom = [...Array.from(el.querySelectorAll('.scaleplateNumber'))][0] as HTMLElement;
            if (dom) {
              dom.style.transform = `translate3d(-4px, 16px, 0px) scale(${(ratio + 0.1).toFixed(
                1,
              )})`;
            }
          });
        } else {
          scaleplateRef.current.style.height = parseFloat(ratio.toFixed(1)) * height + 'px';
          arr.forEach(el => {
            let dom = [...Array.from(el.querySelectorAll('.scaleplateNumber'))][0] as HTMLElement;
            if (dom) {
              dom.style.transform = `translate3d(-4px, -8px, 0px) scale(${(ratio + 0.1).toFixed(
                1,
              )})`;
            }
          });
        }
      }
    }
  }, [scaleplateLength.height, scaleplateLength.width, direction, ratio]);

  return <div className={styles.scaleplate} ref={scaleplateRef}></div>;
}

export default React.memo(Scaleplate)