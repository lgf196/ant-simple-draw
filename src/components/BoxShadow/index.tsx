import React, { FC, memo, useEffect } from 'react';
import { Slider, Input } from 'antd';
import { useSetState } from '@/hooks';

export interface valueType {
  h: number;
  v: number;
  bs: number;
  ss: number;
  c: undefined | string;
}

const BoxShadow: FC<FormProps<valueType>> = memo(({ value, onChange }) => {
  const [val, setVal] = useSetState<valueType>({
    h: 0,
    v: 0,
    bs: 0,
    ss: 0,
    c: undefined,
  });
  const marks = {
    '-100': '-100',
    0: '0',
    100: '100',
  };

  const triggerChange = (changedValue: Partial<valueType>) => {
    onChange && onChange({ ...value, ...val, ...changedValue });
  };
  useEffect(() => {
    if (value) {
      setVal(value);
    }
  }, [value]);

  return (
    <>
      <Input
        type={'color'}
        title="阴影的颜色"
        value={val.c}
        onChange={(val) => triggerChange({ c: val.target.value })}
      ></Input>
      <Slider
        marks={marks}
        range={false}
        defaultValue={0}
        min={-100}
        max={100}
        value={val.h}
        onChange={(val) => triggerChange({ h: val })}
        tipFormatter={(val) => <span>水平阴影的位置&nbsp;&nbsp;{val}%</span>}
      />
      <Slider
        marks={marks}
        range={false}
        defaultValue={0}
        min={-100}
        max={100}
        value={val.v}
        onChange={(val) => triggerChange({ v: val })}
        tipFormatter={(val) => <span>垂直阴影的位置&nbsp;&nbsp;{val}%</span>}
      />
      <Slider
        tipFormatter={(val) => <span>模糊的距离&nbsp;&nbsp;{val}%</span>}
        value={val.bs}
        onChange={(val) => triggerChange({ bs: val })}
        marks={{
          0: '0',
          100: '100',
        }}
      />
      <Slider
        tipFormatter={(val) => <span>阴影的大小&nbsp;&nbsp;{val}%</span>}
        value={val.ss}
        onChange={(val) => triggerChange({ ss: val })}
        marks={{
          0: '0',
          100: '100',
        }}
      />
    </>
  );
});

export default BoxShadow;
