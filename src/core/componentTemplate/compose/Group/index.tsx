import React, { memo, FC } from 'react';
import RenderTemplate from '@/core/RenderTemplateComponent';

const Group: FC<templateDataType> = memo(function Group(props) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {props.propValue &&
        props.propValue.map((item: templateDataType, index: React.Key | null | undefined) => (
          <RenderTemplate
            {...item}
            propValue={item.propValue!}
            key={index}
            style={{ position: 'absolute', ...item.groupStyle }}
          />
        ))}
    </div>
  );
});

export default Group;
