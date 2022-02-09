import React, { FC, memo, useEffect } from 'react';
import { InputNumber } from 'antd';
import { useSetState } from '@/hooks';

export type coordinate = 't' | 'r' | 'b' | 'l';

export type valueType = Record<coordinate, number | undefined>;

export interface PaddingType {
  value?: valueType;
  onChange?: (val: Partial<valueType>) => void;
}

const Padding: FC<PaddingType> = memo(function Padding({ value, onChange }) {
  const [position, setPosition] = useSetState<valueType>({
    t: undefined,
    r: undefined,
    b: undefined,
    l: undefined,
  });
  const InputNumberStyle: MergeCSSProperties = {
    width: '60px',
  };
  const tbStyle: MergeCSSProperties = {
    display: 'flex',
    justifyContent: 'center',
  };
  const CenterStyle: MergeCSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '3px 0',
  };
  const triggerChange = (changedValue: Partial<valueType>) => {
    onChange && onChange({ ...value, ...position, ...changedValue });
  };
  useEffect(() => {
    if (value) {
      setPosition(value);
    }
  }, [value]);
  return (
    <>
      <div style={tbStyle}>
        <InputNumber
          min={0}
          style={InputNumberStyle}
          value={position.t}
          onChange={(val) => triggerChange({ t: val })}
        />
      </div>
      <div style={CenterStyle}>
        <InputNumber
          min={0}
          style={InputNumberStyle}
          value={position.l}
          onChange={(val) => triggerChange({ l: val })}
        />
        <InputNumber
          min={0}
          style={InputNumberStyle}
          value={position.r}
          onChange={(val) => triggerChange({ r: val })}
        />
      </div>
      <div style={tbStyle}>
        <InputNumber
          min={0}
          style={InputNumberStyle}
          value={position.b}
          onChange={(val) => triggerChange({ b: val })}
        />
      </div>
    </>
  );
});

export default Padding;
