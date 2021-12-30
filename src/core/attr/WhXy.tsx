import React, { memo } from 'react';
import { InputNumber, Space } from 'antd';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import AttrContainer from './AttrContainer';
const WhXy = memo(function WhXy() {
  const [curComponent] = useSelector(
    createSelector([(state: storeType) => state.component], (component) => {
      return [component.curComponent] as const;
    }),
  );

  return (
    <AttrContainer title="样式">
      <Space direction="vertical">
        <InputNumber addonBefore="w" addonAfter="px" value={curComponent?.style.width} />
        <InputNumber addonBefore="h" addonAfter="px" value={curComponent?.style.height} />
        <InputNumber addonBefore="x" addonAfter="px" value={curComponent?.style.left} />
        <InputNumber addonBefore="y" addonAfter="px" value={curComponent?.style.top} />
      </Space>
    </AttrContainer>
  );
});

export default WhXy;
