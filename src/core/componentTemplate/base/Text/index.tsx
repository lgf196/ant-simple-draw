import React, { memo } from 'react';

const Index = memo(function Index(props: any) {
  return (
    <div style={{ background: 'blue' }}>
      <p>文本{props.componentId}</p>
    </div>
  );
});

export default Index;
