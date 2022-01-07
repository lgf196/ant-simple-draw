import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import RenderTemplate from '@/core/RenderTemplateComponent';
import { getStyle } from '@/utils/style';
const Preview = memo(function Preview(props) {
  const [componentListData, canvasInformation] = useSelector(
    createSelector(
      [(state: storeType) => state.component, (state: storeType) => state.config],
      (component, config) => [component.componentDataList, config.canvasInformation] as const,
    ),
  );
  return (
    <div>
      <p>111</p>
      <div
        style={{
          width: canvasInformation.width + 'px',
          height: canvasInformation.height + 'px',
          position: 'relative',
          margin: '0 auto',
        }}
      >
        {componentListData.length &&
          componentListData.map((item, index) => (
            <RenderTemplate
              {...item}
              key={index}
              style={{ position: 'absolute', ...getStyle(item.style) }}
              propValue={item.propValue!}
            />
          ))}
      </div>
    </div>
  );
});

export default Preview;
