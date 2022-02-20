import React, { FC, memo } from 'react';
import useStyle from '@/core/attr/useStyle';
import Component from './Component';
const Index: FC<templateDataType> = memo(function Index(props) {
  const { propValue } = props;
  const { resultStyle } = useStyle(props.propValue);
  return (
    <div style={{ width: '100%', height: '100%', ...resultStyle }}>
      <Component model={'editor'} name={propValue.textVal} />
    </div>
  );
});

export default Index;
