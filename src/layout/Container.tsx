import React, { memo } from 'react';
import style from './layout.module.scss';
const Container = memo(function Container({ children }) {
  return <div className={style.containerLayout}>{children}</div>;
});

export default Container;
