import React, { memo, FC } from 'react';
import { Row, Col, Input, Slider } from 'antd';
import { attrsType, NodeAttrs } from './index';
import { EventChange } from '@/interface';

export interface BasisNodeType {
  attrs: NodeAttrs;
  sliderChange: EventChange<number, attrsType, NodeAttrs>;
  inputChange: EventChange<
    React.ChangeEvent<HTMLInputElement>,
    attrsType,
    NodeAttrs
  >;
}

const BasisNode: FC<BasisNodeType> = memo(function BasisNode({
  attrs,
  sliderChange,
  inputChange,
}) {
  return (
    <>
      <Row align="middle">
        <Col span={8}>文本大小</Col>
        <Col span={12}>
          <Slider
            min={8}
            max={16}
            step={1}
            value={attrs.fontSize}
            onChange={(val: number) =>
              sliderChange(val, attrsType.fontSize, 'fontSize')
            }
          />
        </Col>
        <Col span={2}>
          <div className="result">{attrs.fontSize}</div>
        </Col>
      </Row>
      <Row align="middle">
        <Col span={8}>文本值</Col>
        <Col span={14}>
          <Input
            value={attrs.text}
            style={{ width: '100%' }}
            onChange={(val) => inputChange(val, attrsType.text, 'text')}
          />
        </Col>
      </Row>
      <Row align="middle">
        <Col span={8}>文本颜色</Col>
        <Col span={14}>
          <Input
            type="color"
            value={attrs.color}
            style={{ width: '100%' }}
            onChange={(val) => inputChange(val, attrsType.color, 'color')}
          />
        </Col>
      </Row>
    </>
  );
});

export default BasisNode;
