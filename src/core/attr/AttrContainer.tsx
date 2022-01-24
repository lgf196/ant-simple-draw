import React, { FC, memo } from 'react';
import style from '../index.module.scss';
export interface AttrContainerType {
  title?: React.ReactNode;
  rightContent?: React.ReactNode;
  border?: boolean;
}
const AttrContainer: FC<AttrContainerType> = memo(function AttrContainer({
  children,
  title,
  border = true,
  rightContent,
}) {
  return (
    <div className={style.AttrContainer}>
      {title ? (
        <header className={style.head}>
          <h2>{title}</h2>
          {rightContent && rightContent}
        </header>
      ) : null}
      {children ? (
        <div className={style.container} style={{ border: border ? '1px solid #d9d9d9' : 'none' }}>
          {children}
        </div>
      ) : null}
    </div>
  );
});

export default AttrContainer;
