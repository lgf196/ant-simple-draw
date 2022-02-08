import React, { FC, memo, useEffect } from 'react';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
} from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { useSetState } from '@/hooks';

export type valueType = Pick<MergeCSSProperties, 'fontWeight' | 'fontStyle' | 'textDecoration'>;

export interface FontStyleType {
  value?: valueType;
  onChange?: (val: valueType) => void;
}

const FontStyle: FC<FontStyleType> = memo(function FontStyle({ value, onChange }) {
  const [val, setVal] = useSetState<valueType>({
    fontWeight: undefined,
    fontStyle: undefined,
    textDecoration: undefined,
  });

  const triggerChange = (changedValue: valueType) => {
    onChange && onChange({ ...val, ...changedValue });
  };

  const handle = (flag: string) => {
    if (flag === 'fontWeight') {
      const fontWeight = {
        fontWeight: val.fontWeight === 'bold' ? undefined : 'bold',
      } as valueType;
      setVal(fontWeight);
      triggerChange(fontWeight);
    }
    if (flag === 'fontStyle') {
      const fontStyle = { fontStyle: val.fontStyle === 'italic' ? undefined : 'italic' };
      setVal(fontStyle);
      triggerChange(fontStyle);
    }
    if (flag === 'underline') {
      const underline = {
        textDecoration: val.textDecoration === 'underline' ? undefined : 'underline',
      };
      setVal(underline);
      triggerChange(underline);
    }
    if (flag === 'line-through') {
      const lineThrough = {
        textDecoration: val.textDecoration === 'line-through' ? undefined : 'line-through',
      };
      setVal(lineThrough);
      triggerChange(lineThrough);
    }
  };

  useEffect(() => {
    if (value) {
      setVal(value);
    }
  }, [value]);
  return (
    <Space style={{ display: 'flex', flex: '1', justifyContent: 'space-around' }}>
      <Tooltip title="加粗">
        <BoldOutlined
          style={{
            fontSize: '18px',
            cursor: 'pointer',
            color: val.fontWeight === 'bold' ? '#1890ff' : '#33383e',
          }}
          onClick={() => handle('fontWeight')}
        />
      </Tooltip>
      <Tooltip title="斜体">
        <ItalicOutlined
          style={{
            fontSize: '18px',
            cursor: 'pointer',
            color: val.fontStyle === 'italic' ? '#1890ff' : '#33383e',
          }}
          onClick={() => handle('fontStyle')}
        />
      </Tooltip>
      <Tooltip title="下划线">
        <UnderlineOutlined
          style={{
            fontSize: '18px',
            cursor: 'pointer',
            color: val.textDecoration === 'underline' ? '#1890ff' : '#33383e',
          }}
          onClick={() => handle('underline')}
        />
      </Tooltip>
      <Tooltip title="删除线">
        <StrikethroughOutlined
          style={{
            fontSize: '18px',
            cursor: 'pointer',
            color: val.textDecoration === 'line-through' ? '#1890ff' : '#33383e',
          }}
          onClick={() => handle('line-through')}
        />
      </Tooltip>
    </Space>
  );
});

export default FontStyle;
