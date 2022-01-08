import React, { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import RenderTemplate from '@/core/RenderTemplateComponent';
import { getStyle } from '@/utils/style';
import Head from '@/layout/HeadComponent';
import { sessionStorage } from '@/utils/storage';
const Preview = memo(function Preview(props) {
  const [componentListData, setComponentListData] = useState<templateDataType[]>([]);
  const [canvasInformation, setCanvasInformation] = useState<any>({});
  useEffect(() => {
    if (sessionStorage.getItem('componentDataList')) {
      setComponentListData(sessionStorage.getItem('componentDataList'));
      setCanvasInformation(sessionStorage.getItem('canvasInformation'));
    }
  }, []);
  return (
    <div>
      <Head type="preview" />
      <div
        style={{
          width: canvasInformation.width + 'px',
          height: canvasInformation.height + 'px',
          position: 'relative',
          margin: '0 auto',
        }}
      >
        {componentListData.length
          ? componentListData.map((item, index) => (
              <RenderTemplate
                {...item}
                key={index}
                style={{ position: 'absolute', ...getStyle(item.style) }}
                propValue={item.propValue!}
              />
            ))
          : null}
      </div>
    </div>
  );
});

export default Preview;
