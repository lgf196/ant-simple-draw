import React, { memo, FC, ReactNode } from 'react';

export interface TableTitle {
  title: string;
  icon: ReactNode;
}

const TabTitle: FC<TableTitle> = memo(function TabTitle({ title, icon }) {
  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      {icon && icon}
      <p>{title}</p>
    </div>
  );
});

export default TabTitle;
