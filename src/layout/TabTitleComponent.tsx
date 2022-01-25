import React, { memo, FC, ReactNode, useMemo } from 'react';

export interface TableTitle {
  title: string;
  icon: ReactNode;
  position?: 'left' | 'top';
}

const TabTitle: FC<TableTitle> = memo(function TabTitle({ title, icon, position = 'top' }) {
  const layoutStyle = useMemo(() => {
    if (position === 'left') {
      return { display: 'flex', alignItems: 'center' };
    }
    return null;
  }, [position]);

  return (
    <div style={{ textAlign: 'center', width: '100%', ...layoutStyle }}>
      {icon && icon}
      <p style={{ margin: 0, padding: position === 'left' ? '0 6px' : 0 }}>{title}</p>
    </div>
  );
});

export default TabTitle;
