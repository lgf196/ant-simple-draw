import React, { memo, FC } from 'react';
import useStyle from '@/core/attr/useStyle';
import { useParams, useLocation } from 'react-router-dom';
const Index: FC<templateDataType> = memo(function Index(props) {
  const pas = useLocation();
  console.log('pas', pas);
  const { propValue } = props;
  const { resultStyle } = useStyle(props.propValue);
  return (
    <div style={{ width: '100%', height: '100%', ...resultStyle, position: 'relative' }}>
      <a href="http://baidu.com" style={{ color: resultStyle.color }} target="_blank">
        {propValue.textVal}
      </a>
    </div>
  );
});

export default Index;
