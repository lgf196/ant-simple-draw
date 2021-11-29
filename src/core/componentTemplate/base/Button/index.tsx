import React, { memo } from 'react';

const Index = memo(function Index(props) {
  console.log(`props`, props);
  return (
    <div>
      <p>按钮组件</p>
    </div>
  );
});

export default Index;
