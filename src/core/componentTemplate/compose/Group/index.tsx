import React, { memo, FC } from 'react';
import RenderTemplate from '@/core/RenderTemplateComponent';
const Group: FC<templateDataType> = memo(function Group(props) {
  return (
    <div>
      <div>
        {props.propValue &&
          props.propValue.map((item: templateDataType, index: React.Key | null | undefined) => (
            <RenderTemplate {...item} propValue={item.propValue!} key={index} />
          ))}
      </div>
    </div>
  );
});

export default Group;
