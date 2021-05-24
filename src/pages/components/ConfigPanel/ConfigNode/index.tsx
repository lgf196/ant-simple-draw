import React, { useEffect, useState, useRef } from 'react';
import { Tabs, Row, Col, Input, Slider, Button } from 'antd';
import FlowGraph from '@/pages/Graph';
import { Cell } from '@antv/x6';
const { TabPane } = Tabs;
export interface IProps {
  id: string;
}
export interface NodeAttrs {
  stroke: string;
  strokeWidth: number;
  fill: string;
  fontSize: number;
  color: string;
  text: string;
}

export enum attrsType {
  stroke = 'body/stroke',
  strokeWidth = 'body/strokeWidth',
  fill = 'body/fill',
  fontSize = 'text/fontSize',
  color = 'text/fill',
  text = 'text/textWrap/text',
}

export default function (props: IProps) {
  const { id } = props;
  const [attrs, setAttrs] = useState<NodeAttrs>({
    stroke: '#5F95FF',
    strokeWidth: 1,
    fill: 'rgba(95,149,255,0.05)',
    fontSize: 12,
    color: 'rgba(0,0,0,0.85)',
    text: '',
  });
  const cellRef = useRef<Cell>();

  useEffect(() => {
    if (id) {
      const { graph } = FlowGraph;
      const cell = graph.getCellById(id);
      if (!cell || !cell.isNode()) {
        return;
      }
      cellRef.current = cell;
      setAttrs({
        stroke: cell.attr(attrsType.stroke),
        strokeWidth: cell.attr(attrsType.strokeWidth),
        fill: cell.attr(attrsType.fill),
        fontSize: cell.attr(attrsType.fontSize),
        color: cell.attr(attrsType.color),
        text: cell.attr(attrsType.text),
      });
    }
  }, [id]);

  const setAttr = (key: string, val: any) => {
    setAttrs((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const sliderChange = (val: number, attrType: attrsType, attrKey: string) => {
    setAttr(attrKey, val);
    cellRef.current!.attr(attrType, val);
  };

  const inputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    attrType: attrsType,
    attrKey: string,
  ) => {
    const val = e.target.value;
    setAttr(attrKey, val);
    cellRef.current!.attr(attrType, val);
  };

  const deleteNode = () => {
    cellRef.current!.remove();
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="属性" key="1">
        <Row align="middle">
          <Col span={8}>边框颜色</Col>
          <Col span={14}>
            <Input
              type="color"
              value={attrs.stroke}
              style={{ width: '100%' }}
              onChange={(val) => inputChange(val, attrsType.stroke, 'stroke')}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>边框宽度</Col>
          <Col span={12}>
            <Slider
              min={1}
              max={5}
              step={1}
              value={attrs.strokeWidth}
              onChange={(val: number) =>
                sliderChange(val, attrsType.strokeWidth, 'strokeWidth')
              }
            />
          </Col>
          <Col span={2}>
            <div className="result">{attrs.strokeWidth}</div>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>填充色</Col>
          <Col span={14}>
            <Input
              type="color"
              value={attrs.fill}
              style={{ width: '100%' }}
              onChange={(val) => inputChange(val, attrsType.fill, 'fill')}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={10}>删除该节点</Col>
          <Col span={14}>
            <Button type="primary" size="small" danger onClick={deleteNode}>
              删除
            </Button>
          </Col>
        </Row>
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
      </TabPane>
    </Tabs>
  );
}
