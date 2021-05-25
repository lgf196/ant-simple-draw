import React, { useEffect } from 'react';
import { Tabs, Row, Col, Select, Slider, Input, Checkbox } from 'antd';
import FlowGraph from '@/pages/Graph';

const { TabPane } = Tabs;

enum GRID_TYPE {
  DOT = 'dot',
  FIXED_DOT = 'fixedDot',
  MESH = 'mesh',
  DOUBLE_MESH = 'doubleMesh',
}

interface IProps {
  attrs: {
    [key: string]: any;
  };
  setAttr: (key: string, value: any) => void;
}

const tryToJSON = (val: string) => {
  try {
    return JSON.parse(val);
  } catch (error) {
    return val;
  }
};

export default function (props: IProps) {
  const { attrs, setAttr } = props;

  useEffect(() => {
    let options;
    if (attrs.type === 'doubleMesh') {
      options = {
        type: attrs.type,
        args: [
          {
            color: attrs.color,
            thickness: attrs.thickness,
          },
          {
            color: attrs.colorSecond,
            thickness: attrs.thicknessSecond,
            factor: attrs.factor,
          },
        ],
      };
    } else {
      options = {
        type: attrs.type,
        args: [
          {
            color: attrs.color,
            thickness: attrs.thickness,
          },
        ],
      };
    }
    const { graph } = FlowGraph;
    graph.drawGrid(options);
  }, [
    attrs.type,
    attrs.color,
    attrs.thickness,
    attrs.thicknessSecond,
    attrs.colorSecond,
    attrs.factor,
  ]);

  useEffect(() => {
    const { graph } = FlowGraph;
    graph.setGridSize(attrs.size);
  }, [attrs.size]);

  useEffect(() => {
    const options = {
      color: attrs.bgColor,
      size: tryToJSON(attrs.bgSize),
      position: tryToJSON(attrs.position),
      opacity: attrs.opacity,
    };
    const { graph } = FlowGraph;
    graph.drawBackground(options);
  }, [
    attrs.bgColor,
    attrs.showImage,
    attrs.repeat,
    attrs.angle,
    attrs.bgSize,
    attrs.position,
    attrs.opacity,
  ]);

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="网格" key="1">
        <Row align="middle">
          <Col span={10}>网格类型</Col>
          <Col span={12}>
            <Select
              style={{ width: '100%' }}
              value={attrs.type}
              onChange={(val) => setAttr('type', val)}
            >
              <Select.Option value={GRID_TYPE.DOT}>Dot</Select.Option>
              <Select.Option value={GRID_TYPE.FIXED_DOT}>
                Fixed Dot
              </Select.Option>
              <Select.Option value={GRID_TYPE.MESH}>Mesh</Select.Option>
              <Select.Option value={GRID_TYPE.DOUBLE_MESH}>
                Double Mesh
              </Select.Option>
            </Select>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={10}>网格大小</Col>
          <Col span={10}>
            <Slider
              min={1}
              max={20}
              step={1}
              value={attrs.size}
              onChange={(val: number) => setAttr('size', val)}
            />
          </Col>
          <Col span={2}>
            <div className="result">{attrs.size}</div>
          </Col>
        </Row>
        <React.Fragment>
          <Row align="middle">
            <Col span={10}>网格颜色</Col>
            <Col span={12}>
              <Input
                type="color"
                value={attrs.color}
                style={{ width: '100%' }}
                onChange={(e) => setAttr('color', e.target.value)}
              />
            </Col>
          </Row>
          <Row align="middle">
            <Col span={10}>密度</Col>
            <Col span={10}>
              <Slider
                min={0.5}
                max={10}
                step={0.5}
                value={attrs.thickness}
                onChange={(val: number) => setAttr('thickness', val)}
              />
            </Col>
            <Col span={1}>
              <div className="result">{attrs.thickness.toFixed(1)}</div>
            </Col>
          </Row>
          <Row align="middle">
            <Col span={6}>背景色</Col>
            <Col span={14}>
              <Input
                type="color"
                value={attrs.bgColor}
                style={{ width: '100%' }}
                onChange={(e) => setAttr('bgColor', e.target.value)}
              />
            </Col>
          </Row>
        </React.Fragment>
      </TabPane>
    </Tabs>
  );
}
