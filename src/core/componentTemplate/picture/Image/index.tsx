import React, { memo, FC } from 'react';
import useStyle from '@/core/attr/useStyle';
const Index: FC<templateDataType> = memo(function Index(props) {
  const { propValue } = props;
  const { resultStyle } = useStyle(props.propValue);
  return <div style={{ width: '100%', height: '100%', ...resultStyle }}>图片</div>;
});

export default Index;
