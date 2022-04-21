import useStyle from '@/core/attr/useStyle';
import React, { memo, useMemo, FC } from 'react';
const Index: FC<templateDataType> = memo(function Index(props) {
  const { propValue, svg } = props;
  const { resultStyle } = useStyle(props.propValue);
  const symbolId = useMemo(() => '#icon-graphics-' + `${svg?.category}-${svg?.name}`, [svg]);

  const textPosition = useMemo<MergeCSSProperties | undefined>(() => {
    if (propValue.position === 'top') {
      return { bottom: `${propValue.h}px` };
    } else if (propValue.position === 'center') {
      return { top: '50%', transform: 'translateY(-50%)' };
    } else if (propValue.position === 'bottom') {
      return { top: `${propValue.h}px` };
    }
  }, [propValue]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', textAlign: 'center' }}>
      <svg aria-hidden="true" width={propValue.w} height={propValue.h} fill={propValue.fillColor}>
        <use xlinkHref={symbolId} />
      </svg>
      {propValue.text ? (
        <p
          style={{
            position: 'absolute',
            ...textPosition,
            width: '100%',
            zIndex: 10,
            margin: 0,
            ...resultStyle,
          }}
        >
          {propValue.text}
        </p>
      ) : null}
    </div>
  );
});

export default Index;
