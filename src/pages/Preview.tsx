import React, { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import RenderTemplate from '@/core/RenderTemplateComponent';
import { getStyle } from '@/utils/style';
import Head from '@/layout/HeadComponent';
import { sessionStorage } from '@/utils/storage';
import { Empty, Spin } from 'antd';
const Preview = memo(function Preview(props) {
  const [componentListData, setComponentListData] = useState<templateDataType[]>([]);
  const [canvasInformation, setCanvasInformation] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (sessionStorage.getItem('componentDataList')) {
      setComponentListData(sessionStorage.getItem('componentDataList'));
      setCanvasInformation(sessionStorage.getItem('canvasInformation'));
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);
  return (
    <>
      <Head type="preview" />
      {loading ? (
        <Spin size="large" style={{ position: 'relative', left: '50%', top: '30%' }} />
      ) : componentListData.length ? (
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
      ) : (
        <Empty
          style={{ marginTop: '100px' }}
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 200,
          }}
          description={<span>没有可预览的数据</span>}
        ></Empty>
      )}
    </>
  );
});

export default Preview;
