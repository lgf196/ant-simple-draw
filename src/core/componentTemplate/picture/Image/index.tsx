import React, { memo, FC } from 'react';
import useStyle from '@/core/attr/useStyle';
const Index: FC<templateDataType> = memo(function Index(props) {
  const { propValue } = props;
  const { resultStyle } = useStyle(props.propValue);
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        ...resultStyle,
        overflow: 'hidden',
        transform: `matrix(${propValue.horizontalFlip ? -1 : 1}, 0, 0, ${
          propValue.flipVertically ? -1 : 1
        }, 0, 0)`,
      }}
    >
      <img
        src={props.icon}
        alt=""
        // pointerEvents: 'none' 阻止默认行为
        style={{
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          // ...resultStyle,
        }}
        onClick={(e) => e.preventDefault()}
      />
    </div>
  );
});

export default Index;
