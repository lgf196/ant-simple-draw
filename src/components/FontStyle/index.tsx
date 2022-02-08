import React, { FC, memo, useEffect } from 'react';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  AlignLeftOutlined,
  MenuOutlined,
  AlignRightOutlined,
  AlignCenterOutlined,
} from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { useSetState } from '@/hooks';

export type valueType = Pick<
  MergeCSSProperties,
  'fontWeight' | 'fontStyle' | 'textDecoration' | 'textAlign'
>;

export interface FontStyleType {
  value?: valueType;
  onChange?: (val: valueType) => void;
}

const FontStyle: FC<FontStyleType> = memo(function FontStyle({ value, onChange }) {
  const [val, setVal] = useSetState<valueType>({
    fontWeight: undefined,
    fontStyle: undefined,
    textDecoration: undefined,
    textAlign: undefined,
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
    if (flag === 'underline' || flag === 'line-through') {
      const textDecoration = {
        textDecoration: val.textDecoration === flag ? undefined : flag,
      };
      setVal(textDecoration);
      triggerChange(textDecoration);
    }
    if (['left', 'center', 'right', 'justify'].includes(flag)) {
      const textAlign = {
        textAlign: val.textAlign === flag ? undefined : flag,
      } as valueType;
      setVal(textAlign);
      triggerChange(textAlign);
    }
  };

  useEffect(() => {
    if (value) {
      setVal(value);
    }
  }, [value]);
  return (
    <Space
      style={{
        display: 'flex',
        flex: '1',
        justifyContent: 'space-around',
        flexFlow: 'wrap',
        padding: '3px 0',
      }}
    >
      <Tooltip title="加粗">
        <button style={{ width: '40px' }}>
          <BoldOutlined
            style={{
              fontSize: '18px',
              cursor: 'pointer',
              color: val.fontWeight === 'bold' ? '#1890ff' : '#33383e',
            }}
            onClick={() => handle('fontWeight')}
          />
        </button>
      </Tooltip>
      <Tooltip title="斜体">
        <button style={{ width: '40px' }}>
          <ItalicOutlined
            style={{
              fontSize: '18px',
              cursor: 'pointer',
              color: val.fontStyle === 'italic' ? '#1890ff' : '#33383e',
            }}
            onClick={() => handle('fontStyle')}
          />
        </button>
      </Tooltip>
      <Tooltip title="下划线">
        <button style={{ width: '40px' }}>
          <UnderlineOutlined
            style={{
              fontSize: '18px',
              cursor: 'pointer',
              color: val.textDecoration === 'underline' ? '#1890ff' : '#33383e',
            }}
            onClick={() => handle('underline')}
          />
        </button>
      </Tooltip>
      <Tooltip title="删除线">
        <button style={{ width: '40px' }}>
          <StrikethroughOutlined
            style={{
              fontSize: '18px',
              cursor: 'pointer',
              color: val.textDecoration === 'line-through' ? '#1890ff' : '#33383e',
            }}
            onClick={() => handle('line-through')}
          />
        </button>
      </Tooltip>
      <Tooltip title="左对齐">
        <button style={{ width: '40px' }}>
          <AlignLeftOutlined
            style={{
              fontSize: '18px',
              cursor: 'pointer',
              color: val.textAlign === 'left' ? '#1890ff' : '#33383e',
            }}
            onClick={() => handle('left')}
          />
        </button>
      </Tooltip>
      <Tooltip title="居中对齐">
        <button style={{ width: '40px' }}>
          <AlignCenterOutlined
            style={{
              fontSize: '18px',
              cursor: 'pointer',
              color: val.textAlign === 'center' ? '#1890ff' : '#33383e',
            }}
            onClick={() => handle('center')}
          />
        </button>
      </Tooltip>
      <Tooltip title="右对齐">
        <button style={{ width: '40px' }}>
          <AlignRightOutlined
            style={{
              fontSize: '18px',
              cursor: 'pointer',
              color: val.textAlign === 'right' ? '#1890ff' : '#33383e',
            }}
            onClick={() => handle('right')}
          />
        </button>
      </Tooltip>
      <Tooltip title="两边对齐">
        <button style={{ width: '40px' }}>
          <MenuOutlined
            style={{
              fontSize: '18px',
              cursor: 'pointer',
              color: val.textAlign === 'justify' ? '#1890ff' : '#33383e',
            }}
            onClick={() => handle('justify')}
          />
        </button>
      </Tooltip>
    </Space>
  );
});

export default FontStyle;
