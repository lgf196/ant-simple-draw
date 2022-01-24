import React, { memo, useEffect, useState, FC, useMemo, useCallback } from 'react';
import { gradientList } from './defaultGradient';
import style from './index.module.scss';
import { Tabs } from 'antd';
import { RgbaColorPicker, RgbaColor } from 'react-colorful';
import { InputNumber } from 'antd';
import { useSetState } from '@/hooks';
import { CloseOutlined } from '@ant-design/icons';
import { stringRgba } from '@/utils';
const { TabPane } = Tabs;

export type module = 'gradient' | 'solidColor';
export interface BackfgroundValType<T = any> {
  type: module;
  value: T;
}

export interface parType {
  value?: BackfgroundValType;
  onChange?: (val: BackfgroundValType) => void;
}
export const defaultColor = { r: 255, g: 255, b: 255, a: 1 };

const BackGround: FC<parType> = memo(function BackGround(props) {
  const { value, onChange } = props;

  const [val, setVal] = useSetState<BackfgroundValType>({
    type: 'gradient',
    value: undefined,
  });

  const [color, setColor] = useSetState<RgbaColor>(defaultColor);

  const [visible, setVisible] = useState<boolean>(false);

  const triggerChange = useCallback(
    (changedValue: BackfgroundValType) => {
      setVal(changedValue);
      onChange &&
        onChange({
          ...val,
          ...value,
          ...changedValue,
        });
    },
    [color],
  );

  const toggleBg = useMemo(() => {
    if (!val.value) {
      return undefined;
    } else {
      return { background: val.type === 'gradient' ? val.value : stringRgba(val.value) };
    }
  }, [val]);

  useEffect(() => {
    // 用于回显值的
    if (value) {
      setVal(value);
      // 这样做的目的是付默认值和防止死循环loop
      if (value.type === 'solidColor' && color === defaultColor) {
        setColor(value.value);
      }
    }
  }, [value]);

  return (
    <>
      <div
        className={style.bgContainer}
        id="bgContainer"
        onClick={(e) => {
          setVisible((pre) => !pre);
        }}
        style={toggleBg}
      ></div>
      {visible ? (
        <div className={style.modal} id="bgContainerModal">
          <Tabs
            defaultActiveKey={val.type}
            centered
            tabBarExtraContent={{
              left: (
                <CloseOutlined style={{ cursor: 'pointer' }} onClick={() => setVisible(false)} />
              ),
            }}
            onChange={(v) => {
              setVal({ type: v as module });
            }}
          >
            <TabPane tab="渐变色" key="gradient">
              <ul className={style.gradient}>
                {gradientList.map((item, index) => (
                  <li
                    style={{ backgroundImage: item }}
                    key={index}
                    onClick={() => [triggerChange(Object.assign({}, val, { value: item }))]}
                  ></li>
                ))}
              </ul>
            </TabPane>
            <TabPane tab="纯色" key="solidColor">
              <div className={`custom-pointers ${style.pickColor}`}>
                <RgbaColorPicker
                  color={color}
                  onChange={(v) => [
                    setColor(v),
                    triggerChange(Object.assign({}, val, { value: v })),
                  ]}
                />
                <div className={style.pickColorController}>
                  {Object.keys(color).map((item) => (
                    <div style={{ textAlign: 'center' }} key={item}>
                      <InputNumber
                        style={{ width: '60px' }}
                        min={0}
                        max={item === 'a' ? 1 : 255}
                        value={(color as any)[item]}
                        onChange={(v) => [
                          setColor({ [item]: v }),
                          triggerChange(
                            Object.assign({}, val, {
                              value: Object.assign({}, color, { [item]: v }),
                            }),
                          ),
                        ]}
                      />
                      <p>{item.toLocaleUpperCase()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      ) : null}
    </>
  );
});

export default BackGround;
