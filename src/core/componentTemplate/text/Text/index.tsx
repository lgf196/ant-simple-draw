import React, { FC, memo } from 'react';

const Index: FC<templateDataType> = memo(function Index(props) {
  const { propValue } = props;
  return (
    <div style={{ background: 'blue', width: propValue.w + 'px', height: propValue.h + 'px' }}>
      <p>文本qwdq</p>
    </div>
  );
});

export default Index;
