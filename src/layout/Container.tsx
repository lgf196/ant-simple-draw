import React, { FC, memo } from 'react';
import styles from './layout.module.scss';
const Container: FC<{ style?: React.CSSProperties; className?: string }> = memo(function Container({
  children,
  className,
  style,
}) {
  return (
    <div className={`${styles.containerLayout} ${className}`} style={style}>
      {children}
    </div>
  );
});

export default Container;
