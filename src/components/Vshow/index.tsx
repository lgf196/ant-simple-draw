import React, { memo, FC } from 'react';

const Vshow: FC<{ isShow: boolean }> = memo(function Vshow({ children, isShow, ...props }) {
  return (
    <div {...props} style={{ display: isShow ? 'block' : 'none' }}>
      {children}
    </div>
  );
});

export default Vshow;
