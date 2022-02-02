import React, { FC, memo } from 'react';

const Index: FC<templateDataType> = memo(function Index(props) {
  const { propValue } = props;
  return (
    <div style={{ background: 'blue', width: '100%', height: '100%' }}>
      <div>{propValue.textVal}</div>
    </div>
  );
});

export default Index;
