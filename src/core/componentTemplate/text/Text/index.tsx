import React, { FC, memo } from 'react';
import useStyle from '@/core/attr/useStyle';
const Index: FC<templateDataType> = memo(function Index(props) {
  const { propValue } = props;
  const { resultStyle } = useStyle(props.propValue);
  return (
    <div style={{ width: '100%', height: '100%', ...resultStyle }}>
      <div>{propValue.textVal}</div>
    </div>
  );
});

export default Index;
