import React, { FC, memo, useEffect } from 'react';
import { InputNumber, Space, Input } from 'antd';
import Select from '@/components/Select';
import { useSetState } from '@/hooks';
export const lineList = [
  { name: '实线', key: 'solid' },
  { name: '虚线', key: 'dashed' },
];
export interface valueType {
  w: number;
  s: string;
  c: string;
}
export const Border: FC<FormProps<valueType>> = memo(function Border({ value, onChange }) {
  const [border, setBorder] = useSetState<Partial<valueType>>({
    w: undefined,
    s: undefined,
    c: undefined,
  });

  const triggerChange = (changedValue: Partial<valueType>) => {
    onChange && onChange({ ...border, ...changedValue });
  };

  const handle = (flag: keyof valueType, val: any) => {
    if (flag === 'w' || flag === 's') {
      triggerChange({ [flag]: val });
    } else {
      triggerChange({ [flag]: val.target.value });
    }
  };
  useEffect(() => {
    if (value) {
      setBorder(value);
    }
  }, [value]);
  return (
    <Space style={{ display: 'flex' }}>
      <InputNumber
        min={0}
        style={{ width: '100%' }}
        onChange={(val) => handle('w', val)}
        value={border.w}
        title="宽度"
      />
      <Select
        data={lineList}
        valKey="key"
        valName="name"
        onChange={(val) => handle('s', val)}
        value={border.s}
      />
      <Input type={'color'} onChange={(val) => handle('c', val)} value={border.c} title="颜色" />
    </Space>
  );
});

export default Border;
