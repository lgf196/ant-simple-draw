import React, { FC, memo } from 'react';
import style from '../index.module.scss';
export interface AttrContainerType {
  title: React.ReactNode;
  rightContent?: React.ReactNode;
}
const AttrContainer: FC<AttrContainerType> = memo(function AttrContainer({
  children,
  title,
  rightContent,
}) {
  return (
    <div className={style.AttrContainer}>
      <header className={style.head}>
        <h2>{title}</h2>
        {rightContent && rightContent}
      </header>
      {children}
    </div>
  );
});

export default AttrContainer;
