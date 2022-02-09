import React, { FC, memo, useEffect } from 'react';
import { Slider } from 'antd';
import { useSetState } from '@/hooks';

export type coordinate = 'lt' | 'lb' | 'rt' | 'rb';

export type valueType = Record<coordinate, number | undefined>;

export interface BorderRadiusType {
  value?: valueType;
  onChange?: (val: Partial<valueType>) => void;
}

const BorderRadius: FC<BorderRadiusType> = memo(function BorderRadius({ value, onChange }) {
  const [positipon, setPosition] = useSetState({
    lt: 0,
    lb: 0,
    rt: 0,
    rb: 0,
  });
  const triggerChange = (changedValue: Partial<valueType>) => {
    onChange && onChange({ ...value, ...positipon, ...changedValue });
  };
  useEffect(() => {
    if (value) {
      setPosition(value);
    }
  }, [value]);
  return (
    <>
      <Slider
        tipFormatter={(val) => <span>左上角&nbsp;&nbsp;{val}%</span>}
        value={positipon.lt}
        onChange={(val) => triggerChange({ lt: val })}
      />
      <Slider
        tipFormatter={(val) => <span>左下角&nbsp;&nbsp;{val}%</span>}
        value={positipon.lb}
        onChange={(val) => triggerChange({ lb: val })}
      />
      <Slider
        tipFormatter={(val) => <span>右上角&nbsp;&nbsp;{val}%</span>}
        value={positipon.rt}
        onChange={(val) => triggerChange({ rt: val })}
      />
      <Slider
        tipFormatter={(val) => <span>右下角&nbsp;&nbsp;{val}%</span>}
        value={positipon.rb}
        onChange={(val) => triggerChange({ rb: val })}
      />
    </>
  );
});
export default BorderRadius;
